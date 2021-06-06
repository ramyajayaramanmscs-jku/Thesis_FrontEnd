import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  FlatList,
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
import {Header} from 'react-native-elements';
export default function getPositiveCasesCountAPI() {
  const [loading, setLoading] = useState(null);
  const [districtWisePositiveCases, setDistrictWisePositiveCases] = useState(
    [],
  );

  const [selectedDistrictName, setSelectedDistrictName] = useState([]);
  const [districtName, setDistrictName] = useState(['Linz-Land']);
  const [year, setYear] = useState('2020');
  const [interval, setInterval] = useState('monthly');
  const [url, setUrl] = useState({
    districtName: 'Linz-Land',
    year: 2021,
    interval: 'monthly',
  });
  /* const encodedDistrict = encodeURIComponent(selectedDistrictName);
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
    async function getDistrictData() {
      await fetch(
        `https://5b955fcd9680.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setDistrictWisePositiveCases(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), [selectedDistrictName]);
    }
    async function getDistrictNames() {
      await fetch('https://5b955fcd9680.ngrok.io/api/alldistrictnames/')
        .then(response => response.json())
        .then(json => setDistrictName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getDistrictData();
  }, [url]);

  const sampleurl = `https://5b955fcd9680.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`;
  const updateUrl = () => {
    if ((year != null) & (interval != null))
      setUrl(url => {
        return {
          ...url,
          districtName: 'Linz-Land',
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
          text: 'Covid-19 Positive Cases Data',
          style: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
          color: '#fff',
          fontSize: 14,
          textColor: '#fff',
          fontWeight: 'bold',
        }}
        rightComponent={{
          icon: 'settings',
          color: '#fff',
        }}
      />

      <DropDownPicker
        items={districtName.map(item => ({label: item, value: item}))}
        defaultValue={'Linz-Land'}
        placeholder="choose a district"
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        searchable={true}
        searchablePlaceholder="Search for a district"
        onChangeItem={item => setSelectedDistrictName(item.value)}
      />
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
      <VictoryChart
        theme={VictoryTheme.material}
        width={400}
        height={400}
        padding={{top: 40, left: 70, right: 30, bottom: 100}}
        containerComponent={
          <VictoryZoomVoronoiContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
            labels={({datum}) =>
              `cases: ${datum.AnzahlFaelle},interval:${datum.Interval},district:${datum.DistrictName}`
            }
          />
        }>
        <VictoryAxis
          dependentAxis
          label={'Positive Cases'}
          style={{
            axisLabel: {padding: 50},
          }}
        />
        <VictoryAxis
          independentAxis
          label={'Interval'}
          style={{
            axisLabel: {padding: 30},
          }}
        />
        <VictoryLine
          labelComponent={
            <VictoryTooltip renderInPortal={false} style={{fontSize: 14}} />
          }
          style={{
            data: {stroke: 'teal', strokeWidth: 3},
            parent: {border: '1px solid #ccc'},
          }}
          data={districtWisePositiveCases}
          x={'Interval'}
          y={'AnzahlFaelle'}
          labels={({datum}) => datum.AnzahlFaelle}
          interpolation="catmullRom"
        />
      </VictoryChart>
      <VictoryChart
        width={350}
        height={160}
        scale={{x: 'linear'}}
        padding={{top: 0, left: 30, right: 30, bottom: 120}}
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
            tickValues={[districtWisePositiveCases.Interval]}
            tickFormat={[districtWisePositiveCases.Interval]}
            label="Interval"
          /> */}
        <VictoryLine
          style={{
            data: {stroke: 'teal'},
          }}
          data={districtWisePositiveCases}
          x={'Interval'}
          y={'AnzahlFaelle'}
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
