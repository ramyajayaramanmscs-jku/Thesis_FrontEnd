import React, {Fragment, useState, useEffect} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

export default function getReffectiveValue() {
  const [loading, setLoading] = useState(null);
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [rEffAustria, setREffAustria] = useState([]);

  const [selectedYear, setSelectedYear] = useState(['2020']);

  const encodedYear = encodeURIComponent(2020);
  const encodedInterval = encodeURIComponent('monthly');
  useEffect(() => {
    getDistrictData();
  }, []);
  async function getDistrictData() {
    await fetch(
      `https://7e2d1f873e89.ngrok.io/api/R_eff_Austria/?year=2020&interval=monthly`,
    )
      .then(response => response.json())
      .then(json => setREffAustria(json.data.filter(d => d.Year === '2020')))
      .catch(error => console.error(error))
      .finally(() => setLoading(false), []);
  }
  //console.log('selectedYear',selectedYear,rEffAustria)
return (
    <>
      <View style={{ padding: 15}}>
        <Text style={{color: 'blue', fontSize: 16, textAlign: 'center'}}>
          R_Efective Value- Austria
        </Text>
      </View>
      <View>
        <DropDownPicker
          items={[
            {label: 'Year', value: 'na', untouchable: true},
            {label: '2020', value: '2020'},
            {label: '2021', value: '2021'},
            {label: 'Interval', value: 'na', untouchable: true},
            {label: 'Yearly', value: 'yearly'},
            {label: 'Monthly', value: 'monthly'},
            {label: 'Weekly', value: 'weekly'},
          ]}
          multiple={true}
          multipleText="%d items have been selected."
          min={0}
          max={2}
          defaultValue={('2020', 'monthly')}
          placeholder="choose year and interval"
          containerStyle={{height: 50}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownMaxHeight={150}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => setSelectedYear(item)}
          onChangeItemMultiple={item => setSelectedYear(item)} // an array of the selected items
        />
      </View>
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          width={600}
          height={470}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={{x: [1, 12]}}
              labels={({datum}) => `r_eff: ${datum.R_eff},month:${datum.Month}`}
            />
          }>
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            style={{
              data: {stroke: '#32a846', strokeWidth: 4},
              parent: {border: '1px solid #ccc'},
            }}
            data={rEffAustria}
            x={'Month'}
            y={'R_eff'}
          />
        </VictoryChart>
      </View>
    </>
  );
}
