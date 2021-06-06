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
  Button,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ChonseSelect} from 'react-native-chonse-select';
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
import {Header} from 'react-native-elements';
export default function getReffectiveValue() {
  const [loading, setLoading] = useState(null);
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [rEffAustria, setREffAustria] = useState([]);
  const [year, setYear] = useState('2020');
  const [interval, setInterval] = useState('monthly');

  const encodedYear = encodeURIComponent(2020);
  const encodedInterval = encodeURIComponent('monthly');
  const [url, setUrl] = useState({
    year: 2021,
    interval: 'monthly',
  });
  useEffect(() => {
    async function getDistrictData() {
      await fetch(
        `https://993781a45d0a.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setREffAustria(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), []);
    }
    getDistrictData();
  }, [url]);
  const sampleurl = `https://993781a45d0a.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`;

  const updateUrl = () => {
    if ((year != null) & (interval != null))
      setUrl(url => {
        return {
          ...url,

          year: year,
          interval: interval,
        };
      });
  };
  var chooseYear = [
    {label: 2021, value: 2021},
    {label: 2020, value: 2020},
  ];

  const dataInterval = [
    {
      value: 'weekly',
      label: 'weekly',
    },
    {
      value: 'monthly',
      label: 'monthly',
    },
    {
      value: 'yearly',
      label: 'yearly',
    },
  ];
  //console.log('selectedYear',selectedYear,rEffAustria)
  return (
    <>
      <View style={styles.container}>
        <Header
          backgroundColor="#005fff"
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{
            text: 'R-Effective Cases Data',
            style: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
          }}
          rightComponent={{
            icon: 'settings',
            color: '#fff',
          }}
        />
        {/* <Text>{JSON.stringify(rEffAustria)}</Text> */}
      </View>
      <View>
        <Text>Choose Year:</Text>
        <RadioForm
          radio_props={chooseYear}
          initial={2021}
          formHorizontal={true}
          onPress={value => setYear(value)}
        />
        <Text>Choose Data Interval:</Text>
        <ChonseSelect
          height={35}
          style={{marginLeft: 20, marginBottom: 10}}
          data={dataInterval}
          initValue={interval}
          onPress={item => setInterval(item.value)}
        />
        {<Button title="chart Data" color="#005fff" onPress={updateUrl} />}
        <Text>{sampleurl}</Text>
      </View>
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          width={400}
          height={500}
          padding={{top: 50, left: 70, right: 30, bottom: 100}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              //zoomDomain={{x: [1, 12]}}
              labels={({datum}) =>
                `r_eff: ${datum.R_eff},interval:${datum.Interval}`
              }
            />
          }>
          <VictoryAxis
            dependentAxis
            label={'R_Eff'}
            style={{
              axisLabel: {padding: 30},
            }}
          />
          <VictoryAxis
            independentAxis
            label={'Interval'}
            style={{
              axisLabel: {padding: 40},
            }}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            style={{
              data: {stroke: '#32a846', strokeWidth: 4},
              parent: {border: '1px solid #ccc'},
            }}
            data={rEffAustria}
            x={'Interval'}
            y={'R_eff'}
          />
        </VictoryChart>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 13,
    backgroundColor: '#eeeeee',
  },
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
