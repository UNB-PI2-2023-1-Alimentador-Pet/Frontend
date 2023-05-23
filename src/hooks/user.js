import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
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
