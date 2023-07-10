import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [feeders, setFeeders] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, [loadStoredData]);

  const loadStoredData = useCallback(async () => {
    // Loads only essencial data stored
    const storedToken = await AsyncStorage.getItem('token');
    const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
    const storedFeeders = JSON.parse(await AsyncStorage.getItem('feeders'));

    if (storedToken) {
      setToken(storedToken);
    } else {
      await signOut();
    }
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedFeeders) {
      setFeeders(storedFeeders);
    }

    setIsLoading(false);
    SplashScreen.hide();

    loadSecondaryData();
  }, [loadSecondaryData]);

  const loadSecondaryData = useCallback(async () => {
    // Loads only secondary data stored
    const storedSchedules = JSON.parse(await AsyncStorage.getItem('schedules'));

    if (storedSchedules) {
      setSchedules(storedSchedules);
    }
  }, []);

  const storeUser = async (userObj, tokenStr = null) => {
    if (userObj) {
      setUser(userObj);
      await AsyncStorage.setItem('user', JSON.stringify(userObj));
    }
    if (tokenStr) {
      setToken(tokenStr);
      await AsyncStorage.setItem('token', tokenStr);
    }
    setIsLoggedIn(true);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('feeders');
    } catch (e) {
      console.log(e);
    }
    setIsLoggedIn(false);
  };

  const storeFeeders = async feedersArr => {
    if (feedersArr) {
      setFeeders(feedersArr);
      await AsyncStorage.setItem('feeders', JSON.stringify(feedersArr));
    }
  };

  const storeSchedules = async schedulesArr => {
    if (schedulesArr) {
      setSchedules(schedulesArr);
      await AsyncStorage.setItem('schedules', JSON.stringify(schedulesArr));
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        token,
        user,
        storeUser,
        signOut,
        feeders,
        storeFeeders,
        schedules,
        storeSchedules,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}
