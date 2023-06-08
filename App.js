import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './src/hooks';
import Routes from './src/navigation/routes';
import SplashScreen from 'react-native-splash-screen'

function App() {
  useEffect(() => {
    SplashScreen.hide()
  });

  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
