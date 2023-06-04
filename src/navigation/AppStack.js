import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabBar from './TabBar';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabBar">
      <Stack.Screen
        name="HomeTabBar"
        component={TabBar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
