import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    } catch (e) {
      console.log(e);
    }
    setIsLoggedIn(false);
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
