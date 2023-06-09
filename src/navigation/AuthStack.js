import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import LostPassword from '../screens/auth/LostPassword';
import Register from '../screens/auth/Register';

import {colors} from '../utils/colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitle: '',
        headerBackTitleVisible: false,
        headerTintColor: colors.dark,
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
