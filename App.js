import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import getPositiveCasesCountAPI from './getDistrictData';
import getWarningLevelDataAPI from './getCoronaWarningLevel';
import overview from'./dataOverview';
// function HomeScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Home!</Text>
//     </View>
//   );
// }
//
// function DistrictChartScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>District</Text>
//     </View>
//   );
// }
//
// function VaccinationChartScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Vaccination</Text>
//     </View>
//   );
// }
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Districts" component={getPositiveCasesCountAPI} />


        <Tab.Screen name="RiskLevel" component={getWarningLevelDataAPI} />

          <Tab.Screen name="Overview" component={overview} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
