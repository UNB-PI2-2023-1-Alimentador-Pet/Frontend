import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, [loadStoredData]);

  const loadStoredData = useCallback(async () => {
    // Loads only essencial data stored
    const storedToken = await AsyncStorage.getItem('token');
    const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
    const storedDevices = JSON.parse(await AsyncStorage.getItem('devices'));

    if (storedToken) {
      setToken(storedToken);
    } else {
      await signOut();
    }
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedDevices) {
      setDevices(storedDevices);
    }

    setIsLoading(false);
  }, []);

  const storeUser = async (user, token = null) => {
    if (user) {
      setUser(user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
    if (token) {
      setToken(token);
      await AsyncStorage.setItem('token', token);
    }
    setIsLoggedIn(true);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('devices');
    } catch (e) {
      console.log(e);
    }
    setIsLoggedIn(false);
  };

  const storeDevices = async devices => {
    if (devices) {
      setDevices(devices);
      await AsyncStorage.setItem('devices', JSON.stringify(devices));
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
        devices,
        storeDevices,
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
