import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './src/hooks';
import Routes from './src/navigation/routes';

function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
