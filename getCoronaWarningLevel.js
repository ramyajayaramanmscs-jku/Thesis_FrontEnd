import  React , {useState,useEffect} from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

export default function getWarningLevelDataAPI(){
  const data = [
 // {
 //   name: region,
 //   population: warningLevel,
 //   color: "rgba(131, 167, 234, 1)",
 //   legendFontColor: "#7F7F7F",
 //   legendFontSize: 15
 // },
 {
 name: "Linz",
 population: 4,
 color: "red",
 legendFontColor: "#7F7F7F",
 legendFontSize: 15
 },
 {
 name: "Altenberg bei Linz",
 population: 4,
 color: "red",
 legendFontColor: "#7F7F7F",
 legendFontSize: 15
 },
 {
 name: "Kirchschlag bei Linz",
 population: 4,
 color: "red",
 legendFontColor: "#7F7F7F",
 legendFontSize: 15
 }
 ];


  return (
    <View style={{ flex: 1, padding: 5 }}>
    <Text style={{color: 'blue', fontSize: 16, textAlign: 'center'}}>
     Warning level for regions
     </Text>
     <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
      15-04-2021
      </Text>
     <PieChart
       data={data}
       width={screenWidth}
       height={250}
       chartConfig={chartConfig}
       accessor={"population"}
       backgroundColor={"transparent"}
       paddingLeft={"5"}
      // center={[10, 50]}
       absolute
     />


    </View>

  );
  }

  const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  });
  const chartConfig = {
    backgroundColor: '#1cc910',
     backgroundGradientFrom: '#eff3ff',
     backgroundGradientTo: '#efefef',
     decimalPlaces: 2,
     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
     style: {
        marginVertical: 8,
       borderRadius: 16,
},
};
const screenWidth = Dimensions.get("window").width-16;
