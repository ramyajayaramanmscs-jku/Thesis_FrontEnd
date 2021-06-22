import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import getPositiveCasesCountAPI from './getDistrictData';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import overview from './dataOverview';
import getReffectiveValue from './getREffectiveAustria';
import getFullyVaccinatedCountAPI from './getVaccinationData';
import {TabView, SceneMap} from 'react-native-tab-view';
import getAllCharts from './charts';

import modelSimulationWithParameters from './modelSimulation';
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
          name="Charts"
          component={getAllCharts}
          options={{
            tabBarLabel: 'Charts',
            tabBarColor: '#008787',
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
                name="map-marker-alert-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Model"
          component={modelSimulationWithParameters}
          options={{
            tabBarLabel: 'Model',
            tabBarColor: '#6932a8',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="thought-bubble"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
