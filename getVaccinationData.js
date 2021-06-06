import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
} from 'react-native';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
} from 'victory-native';
import {Header} from 'react-native-elements';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ChonseSelect} from 'react-native-chonse-select';

export default function getFullyVaccinatedCountAPI() {
  const [loading, setLoading] = useState(null);
  const [countryWiseVaccCount, setcountryWiseVaccCount] = useState([]);

  const [selectedStateName, setSelectedStateName] = useState([]);
  const [stateName, setStateName] = useState(['Wien']);
  const [year, setYear] = useState('2021');
  const [interval, setInterval] = useState('monthly');
  const [url, setUrl] = useState({
    stateName: 'Wien',
    year: 2021,
    interval: 'monthly',
  });
  /* const encodedDistrict = encodeURIComponent(selectedStateName);
  const encodedYear = encodeURIComponent(year);
  const encodedInterval = encodeURIComponent(interval); */
  //brush and zoomDomain
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();
  const handleZoom = domain => {
    setSelectedDomain(domain);
  };
  const handleBrush = domain => {
    setZoomDomain(domain);
  };
  useEffect(() => {
    async function getVaccinationData() {
      await fetch(
        `https://5b955fcd9680.ngrok.io/api/Vaccination/?statename=${url.stateName}&year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setcountryWiseVaccCount(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), []);
    }
    async function getDistrictNames() {
      await fetch('https://5b955fcd9680.ngrok.io/api/alldistrictnames/')
        .then(response => response.json())
        .then(json => setStateName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getVaccinationData();
    // getDistrictNames();
  }, [url]);

  const url1 = `https://5b955fcd9680.ngrok.io/api/Vaccination/?statename=${url.stateName}&year=${url.year}&interval=${url.interval}`;

  const updateUrl = () => {
    if ((year != null) & (interval != null))
      setUrl(url => {
        return {
          ...url,
          stateName: 'Wien',
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

  // console.log(encodedDistrict, encodedYear, encodedInterval);
  if (loading) return 'Loading...';
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#005fff"
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{
          text: ' Vaccination Data',
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

      <DropDownPicker
        items={stateName.map(item => ({label: item, value: item}))}
        defaultValue={'Oberösterreich'}
        placeholder="choose a district"
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        searchable={true}
        searchablePlaceholder="Search for a district"
        onChangeItem={item => setSelectedStateName(item.value)}
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
      <Text>{url1}</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        width={400}
        height={350}
        padding={{top: 50, left: 90, right: 30, bottom: 50}}
        containerComponent={
          <VictoryZoomVoronoiContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
            labels={({datum}) =>
              `vaccinated: ${datum.GemeldeteImpfungenLaender},Interval:${datum.Interval}`
            }
          />
        }>
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        <VictoryAxis
          dependentAxis
          label={'Vaccination Count'}
          style={{
            axis: {stroke: 'black'},
            ticks: {stroke: 'purple', size: 5},
            axisLabel: {padding: 80},
          }}
        />
        <VictoryAxis
          independentAxis
          label={'Interval'}
          style={{
            axis: {stroke: 'black'},
            ticks: {stroke: 'purple', size: 5},
            axisLabel: {padding: 30},
          }}
        />
        <VictoryGroup colorScale={['purple']}>
          <VictoryBar
            data={countryWiseVaccCount}
            x={'Interval'}
            y={'GemeldeteImpfungenLaender'}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart
        width={350}
        height={100}
        scale={{x: 'linear'}}
        padding={{top: 0, left: 30, right: 30, bottom: 45}}
        containerComponent={
          <VictoryBrushContainer
            responsive={false}
            brushDimension="x"
            brushStyle={{fill: 'teal', opacity: 0.2}}
            brushDomain={selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }>
        {/*  <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          tickFormat={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          label="Interval"
        /> */}
        <VictoryBar
          style={{
            data: {stroke: 'teal'},
          }}
          data={countryWiseVaccCount}
          x={'Interval'}
          y={'GemeldeteImpfungenLaender'}
          interpolation="catmullRom"
        />
      </VictoryChart>
    </View>
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
