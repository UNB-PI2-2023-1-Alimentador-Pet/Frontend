/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {Pencil, PlusCircle} from 'phosphor-react-native';

import TabBar from './TabBar';
import AddFeeder from '../screens/app/AddFeeder';
import SendData from '../screens/app/SendData';

import {colors} from '../utils/colors';
import {scale} from '../utils/scalling';
import Feeder from '../screens/app/Feeder';
import Scheduler from '../screens/app/Scheduler';
import AddSchedule from '../screens/app/AddSchedule';
import History from '../screens/app/History';
import EditSchedule from '../screens/app/EditSchedule';
import Settings from '../screens/app/Settings';
import Report from '../screens/app/Report';

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
        headerStyle: {backgroundColor: colors.lightGray},
      }}>
      <Stack.Screen
        name="HomeTabBar"
        component={TabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFeeder"
        component={AddFeeder}
        options={{
          title: 'Adicionar dispositivo',
          headerStyle: {backgroundColor: colors.light},
        }}
      />
      <Stack.Screen
        name="SendData"
        component={SendData}
        options={{
          title: 'Informações da rede WiFi',
          headerStyle: {backgroundColor: colors.light},
        }}
      />
      <Stack.Screen
        name="Feeder"
        component={Feeder}
        options={({navigation}) => ({
          title: 'Alimentador',
          headerTintColor: colors.light,
          headerStyle: {backgroundColor: colors.primary},
        })}
      />
      <Stack.Screen
        name="Scheduler"
        component={Scheduler}
        options={({navigation}) => ({
          title: 'Agenda',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSchedule')}>
              <PlusCircle
                color={colors.primary}
                weight="fill"
                size={scale(28)}
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
        name="EditSchedule"
        component={EditSchedule}
        options={{
          title: 'Editar horário',
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Histórico',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          title: 'Relatório',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
