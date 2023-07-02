import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './src/hooks';
import Routes from './src/navigation/routes';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
