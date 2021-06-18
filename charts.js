import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import getPositiveCasesCountAPI from './getDistrictData';
import getReffectiveValue from './getREffectiveAustria';
import getFullyVaccinatedCountAPI from './getVaccinationData';
import {TabView, SceneMap} from 'react-native-tab-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabBar} from 'react-native-tab-view';
export default function getAllCharts() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'cases', title: 'Cases'},
    {key: 'vaccine', title: 'Vaccine'},
    {key: 'reff', title: 'R-Effective'},
  ]);

  const renderScene = SceneMap({
    cases: getPositiveCasesCountAPI,
    vaccine: getFullyVaccinatedCountAPI,
    reff: getReffectiveValue,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#008787'}}
    />
  );
  return (
    <SafeAreaProvider style={styles.container}>
      <TabView
        style={styles.container}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    height: 100,
  },
  indicator: {
    backgroundColor: '#ff4081',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    margin: 8,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    opacity: 1,
    width: 90,
  },
  page: {
    backgroundColor: '#f9f9f9',
  },
});
