/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {Pencil, PlusCircle} from 'phosphor-react-native';

import TabBar from './TabBar';
import AddDevice from '../screens/app/AddDevice';
import SendData from '../screens/app/SendData';

import {colors} from '../utils/colors';
import {scale} from '../utils/scalling';
import Feeder from '../screens/app/Feeder';
import Scheduler from '../screens/app/Scheduler';
import AddSchedule from '../screens/app/AddSchedule';
import History from '../screens/app/History';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabBar"
      screenOptions={{
        headerBackTitle: '',
        headerBackTitleVisible: false,
        headerTintColor: colors.dark,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: scale(15),
        },
        headerTitleAlign: 'center',
      }}>
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
      <Stack.Screen
        name="Feeder"
        component={Feeder}
        options={({navigation}) => ({
          title: 'Alimentador',
          headerTintColor: colors.light,
          headerStyle: {backgroundColor: colors.primary},
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSchedule')}>
              <Pencil color={colors.light} weight="fill" size={scale(22)} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Scheduler"
        component={Scheduler}
        options={({navigation}) => ({
          title: 'Agenda',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddSchedule', {isEditing: false})
              }>
              <PlusCircle
                color={colors.primary}
                weight="fill"
                size={scale(30)}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddSchedule"
        component={AddSchedule}
        options={{
          title: 'Adicionar novo horário',
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Histórico',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
