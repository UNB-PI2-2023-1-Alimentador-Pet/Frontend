import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabBar from './TabBar';
import AddDevice from '../screens/app/AddDevice';
import SendData from '../screens/app/SendData';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabBar">
      <Stack.Screen
        name="HomeTabBar"
        component={TabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{title: 'Adicionar dispositivo'}}
      />
      <Stack.Screen
        name="SendData"
        component={SendData}
        options={{title: 'Informações da rede WiFi'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
