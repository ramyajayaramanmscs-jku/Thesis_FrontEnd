import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import getPositiveCasesCountAPI from './getDistrictData';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import overview from'./dataOverview';
import getReffectiveValue from'./getREffectiveAustria';
import getFullyVaccinatedCountAPI from './getVaccinationData';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator
      tabBarOptions={{
              activeTintColor: '#e91e63',
            }}
      >
      <Tab.Screen name="Overview" component={overview}
//       options={{
//           tabBarLabel: 'Overview',
// tabBarIcon: ({ color, size }) => (
//   <MaterialCommunityIcons name="home" color={color} size={size} />
//
// )
//         }}
        />
      <Tab.Screen name="Districts" component={getPositiveCasesCountAPI}
      // options={{
      //     tabBarLabel: 'Districts',
      //     tabBarIcon: ({ color, size }) => (
      //       <MaterialCommunityIcons name="plus" color={color} size={size} />
      //     ) }}
          />
      <Tab.Screen name="RiskLevel" component={getWarningLevelDataAPI}
      // options={{
      //     tabBarLabel: 'WarningLevel',
      //     tabBarIcon: ({ color, size }) => (
      //       <MaterialCommunityIcons name="bell" color={color} size={size} />
      //     ) }}
      />
      <Tab.Screen name="R_Eff" component={getReffectiveValue}
      // options={{
      //     tabBarLabel: 'R_Eff',
      //     tabBarIcon: ({ color, size }) => (
      //       <MaterialCommunityIcons name="bell" color={color} size={size} />
      //     ) }}
      />
      <Tab.Screen name="Vaccination" component={getFullyVaccinatedCountAPI}
      />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
