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
export default function getPositiveCasesCountAPI() {
  const [loading, setLoading] = useState(null);
  const [districtWiseWarningLevel, setDistrictWiseWarningLevel] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [selectedDistrictName, setSelectedDistrictName] = useState([]);
  const [districtName, setDistrictName] = useState(['Linz-Land']);
  const [year, setYear] = useState('2020');
  const [interval, setInterval] = useState('monthly');
  const encodedDistrict = encodeURIComponent(selectedDistrictName);
  const encodedYear = encodeURIComponent(year);
  const encodedInterval = encodeURIComponent(interval);
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
      getDistrictData();
    }, 3000);

    return () => clearInterval(timer);

    getDistrictNames();
    parseData();
  }, []);

  async function getDistrictData() {
    await fetch(
      'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json',
    )
      .then(response => response.json())
      .then(json =>
        setDistrictWiseWarningLevel(
          json[0].Warnstufen.filter(
            d => d.Name == ['Linz(Stadt)' || 'Wels(Stadt)'],
          ),
        ),
      )
      .catch(error => console.error(error))
      .finally(() => setLoading(false), []);
  }
  // async function getDistrictNames() {
  //   await fetch('https://79ac898ed115.ngrok.io/api/alldistrictnames/')
  //     .then(response => response.json())
  //     .then(json => setDistrictName(json))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }
  function parseData() {
    var data = [
      {
        date: '',
        warnlevel: '',
      },
    ];
    //  var date=[]
    // var warnlevel=[]
    for (var i = 0; i < districtWiseWarningLevel.length; i++) {
      data.date = districtWiseWarningLevel[i].Stand;
      const today = Date.now();

      console.log(
        new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date),
      );
    }
    for (var j = 0; j < districtWiseWarningLevel[0].Warnstufen.length; j++) {
      if (array[0].Warnstufen[j].Name === 'Linz(Stadt)') {
        data.warnlevel = districtWiseWarningLevel[0].Warnstufen[j].Warnstufe;
      }
    }
    console.log('App started');
    console.log(date);
    console.log(warnlevel);
  }
  console.log(districtWiseWarningLevel);
  if (loading) return 'Loading...';
  return (
    <>
      <View style={styles.container}>
        <Text style={{color: 'blue', fontSize: 16, textAlign: 'center'}}>
          Corona Warning Level -District Wise
        </Text>
      </View>
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          width={400}
          height={400}
          padding={{top: 100, left: 50, right: 50, bottom: 50}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
              labels={({datum}) =>
                `name:${datum.Name},district:${datum.Warnstufe}`
              }
            />
          }>
          <VictoryAxis
            dependentAxis
            label="Warning Level"
            style={{
              axisLabel: {padding: 40},
            }}
          />
          <VictoryAxis
            independentAxis
            label="Month"
            style={{
              axisLabel: {padding: 40},
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
            data={districtWiseWarningLevel}
            x={'Name'}
            y={'Warnstufe'}
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
          <VictoryLine
            style={{
              data: {stroke: 'teal'},
            }}
            data={districtWiseWarningLevel}
            x={'Name'}
            y={'Warnstufe'}
            interpolation="catmullRom"
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
