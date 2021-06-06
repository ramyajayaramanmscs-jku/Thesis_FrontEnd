import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import getPositiveCasesCountAPI from './getDistrictData';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import overview from './dataOverview';
import getReffectiveValue from './getREffectiveAustria';
import getFullyVaccinatedCountAPI from './getVaccinationData';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Overview"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        shifting={true}
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Overview"
          component={overview}
          options={{
            tabBarLabel: 'Overview',
            tabBarColor: '#005fff',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="database-check"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cases"
          component={getPositiveCasesCountAPI}
          options={{
            tabBarLabel: 'Cases',
            tabBarColor: '#ff87ff',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="chart-line"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WarnLevel"
          component={getWarningLevelDataAPI}
          options={{
            tabBarLabel: 'WarnLevel',
            tabBarColor: '#d78700',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="alert-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="R_Eff"
          component={getReffectiveValue}
          options={{
            tabBarLabel: 'R_Eff',
            tabBarColor: '#d75fff',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-multiple-remove"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Vaccination"
          component={getFullyVaccinatedCountAPI}
          options={{
            tabBarLabel: 'Vaccination',
            tabBarColor: '#008787',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="needle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
