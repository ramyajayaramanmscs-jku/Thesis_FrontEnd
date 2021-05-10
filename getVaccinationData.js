import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
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
export default function getFullyVaccinatedCountAPI() {
  const [loading, setLoading] = useState(null);
  const [countryWiseVaccCount, setcountryWiseVaccCount] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [selectedDistrictName, setSelectedDistrictName] = useState([]);
  const [districtName, setDistrictName] = useState(['Linz-Land']);
  const [year, setYear] = useState('2021');
  const [interval, setInterval] = useState('monthly');
  const encodedDistrict=encodeURIComponent(selectedDistrictName);
  const encodedYear=encodeURIComponent(year);
  const encodedInterval=encodeURIComponent(interval);
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
    const timer = setInterval(() => {
          getVaccinationData();
        }, 3000);

        return () => clearInterval(timer);

getDistrictNames();
  }, []);

  const url =`https://7e2d1f873e89.ngrok.io/api/Vaccination/?countryname=Austria&year=${encodedYear}&interval=${encodedInterval}`;

  async function getVaccinationData() {
    await fetch
    (
    `https://7e2d1f873e89.ngrok.io/api/Vaccination/?countryname=Austria&year=${encodedYear}&interval=${encodedInterval}`,
    )
      .then(response => response.json())
      .then(json =>setcountryWiseVaccCount(json.data.filter(d => d.Year === encodedYear)))
      .catch(error => console.error(error))
      .finally(() => setLoading(false),[selectedDistrictName]);
  }
  // async function getDistrictNames() {
  //   await fetch('https://79ac898ed115.ngrok.io/api/alldistrictnames/')
  //     .then(response => response.json())
  //     .then(json => setDistrictName(json))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }
//console.log(encodedDistrict,encodedYear,encodedInterval)
  if (loading) return 'Loading...';
  return (
    <>
      <View style={{flex: 1, padding: 5}}>
        <Text style={{color: 'blue', fontSize: 16, textAlign: 'center'}}>
          Vaccination Data - Country Wise
        </Text>
      </View>
      <View>

        <DropDownPicker
          items={[
            {label: 'Monthly', value: 'monthly'},
            {label: 'Weekly', value: 'weekly'},
            {label: 'yearly', value: 'yearly'},
          ]}
          defaultValue={'Monthly'}
          placeholder="choose data interval"
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}

          onChangeItem={item => setInterval(item.value)}
        />
        <DropDownPicker
          items={[
        {label: '2020', value: '2020'},
        {label: '2021', value: '2021'},
    ]}
          defaultValue={'2020'}
          placeholder="choose a year"
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}

          onChangeItem={item => setYear(item.value)}
        />

        <Text>{url}</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={400}
          height={500}
          padding={{top: 100, left: 100, right: 30, bottom: 50}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
              labels={({datum}) =>
                `vaccinated: ${datum.People_fully_vaccinated},month:${datum.Month},district:${datum.Country_Region}`}
            />

          }>
          <VictoryAxis dependentAxis label={'People_fully_vaccinated'} />
        <VictoryAxis independentAxis label={'Month'} />
          <VictoryLine
            labelComponent={<VictoryTooltip
              renderInPortal={false}
              style={{ fontSize: 14}}
              />}
            style={{
              data: {stroke: 'teal', strokeWidth:3  },
              parent: {border: '1px solid #ccc'},
            }}
            data={countryWiseVaccCount}
            x={'Month'}
            y={'People_fully_vaccinated'}
            labels={({datum}) => datum.People_fully_vaccinated}
            interpolation="catmullRom"
          />
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
          <VictoryAxis
            tickValues={[1,2,3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            tickFormat={[1,2,3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            label="Month"
          />
          <VictoryLine
            style={{
              data: {stroke: 'teal'},
            }}
            data={countryWiseVaccCount}
            x={'Month'}
            y={'People_fully_vaccinated'}
            interpolation="catmullRom"
          />
        </VictoryChart>
      </View>
    </>
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
