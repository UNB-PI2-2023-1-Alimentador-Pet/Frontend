/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {House, UserCircle} from 'phosphor-react-native';

import Home from '../screens/app/Home';
import Profile from '../screens/app/Profile';

import {colorsLight} from '../utils/colors';
import {scale} from '../utils/scalling';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'Home') {
            return <House color={color} weight="regular" size={scale(26)} />;
          } else if (route.name === 'Profile') {
            return (
              <UserCircle color={color} weight="regular" size={scale(26)} />
            );
          }
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Semibold',
          fontSize: scale(10),
        },
        tabBarActiveTintColor: colorsLight.primary,
        tabBarInactiveTintColor: colorsLight.darkGray,
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabBar;
