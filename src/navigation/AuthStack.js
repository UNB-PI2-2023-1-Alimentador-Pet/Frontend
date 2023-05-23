import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../screens/auth/Welcome';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default AuthStack;
