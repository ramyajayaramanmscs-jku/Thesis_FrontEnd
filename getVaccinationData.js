import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
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
import {Button, Header, Icon} from 'react-native-elements';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ChonseSelect} from 'react-native-chonse-select';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function getFullyVaccinatedCountAPI() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(null);
  const [countryWiseVaccCount, setcountryWiseVaccCount] = useState([]);
  const [selectedStateName, setSelectedStateName] = useState([]);
  const [stateNameList, setStateName] = useState(['Wien']);
  const [year, setYear] = useState('2021');
  const [interval, setInterval] = useState('Monthly');
  const [url, setUrl] = useState({
    stateName: 'Wien',
    year: 2021,
    interval: 'Monthly',
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
        `https://527e7d26efd6.ngrok.io/api/Vaccination/?statename=${url.stateName}&year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setcountryWiseVaccCount(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), []);
    }
    async function getStateNames() {
      await fetch('https://527e7d26efd6.ngrok.io/api/dropdownvalues')
        .then(response => response.json())
        .then(json => setStateName(json.States))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getVaccinationData();
    getStateNames();
  }, [url]);

  //const url1 = `https://ecfd241ea67c.ngrok.io/api/Vaccination/?statename=${url.stateName}&year=${url.year}&interval=${url.interval}`;

  const updateUrl = () => {
    if ((year != null) & (interval != null))
      setUrl(url => {
        return {
          ...url,
          stateName: selectedStateName,
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
      value: 'Weekly',
      label: 'week',
    },
    {
      value: 'Monthly',
      label: 'month',
    },
    {
      value: 'Yearly',
      label: 'year',
    },
  ];
  // console.log(encodedDistrict, encodedYear, encodedInterval);
  if (loading) return 'Loading...';
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
       <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{padding: 3}}>
                <Text style={{padding: 3}}>Choose State:</Text>

                <DropDownPicker
                  items={stateNameList.map(item => ({label: item.stateNames, value: item.stateNames}))}
                  defaultValue={'Oberösterreich'}
                  placeholder="choose a state"
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  searchable={true}
                  searchablePlaceholder="Search for a state"
                  onChangeItem={item => setSelectedStateName(item.value)}
                />
              </View>
              <View style={styles.parametersRow}>
                <Text style={{paddingTop:6, padding:3}}>Data Interval:</Text>
                <ChonseSelect
                  height={35}
                  data={dataInterval}
                  initValue={interval}
                  onPress={item => setInterval(item.value)}
                />
              </View>
              <View style={styles.fixToText}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  color="#005fff"
                  onPress={updateUrl}>
                  <Text style={styles.textStyle}>chart data</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
              <View>
                <Text style={styles.heading}>
                  Vaccination Count {'\n'}
                </Text>
              </View>
              <View style={{alignContent: 'flex-end'}}>
                <Button
                  buttonStyle={styles.normalButton}
                  type="solid"
                  icon={{
                    name: 'settings',
                    size: 18,
                    color: 'white',
                  }}
                  iconRight="true"
                  title="chart"
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
            <Text style={styles.subHeading}>{url.stateName}</Text>
        </View>
       
        <VictoryChart
          theme={VictoryTheme.material}
          width={390}
          height={400}
          domainPadding={{x:[10,0]}}
          padding={{top: 60, left: 60, right: 30, bottom: 60}}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
              labels={({datum}) =>
                `vaccinated: ${datum.GemeldeteImpfungenLaender}`}
                labelComponent={<VictoryTooltip />}
              
            />
          }>
        
          <VictoryAxis
            dependentAxis
            fixLabelOverlap={true}
            label={'Vaccination Count'}
           // tickValues={countryWiseVaccCount}
           tickFormat={(t)=>`${Math.round(t)/1000000}M`}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'purple'},
              
              axisLabel: {
                fontSize: 15,
                fontWeight: 'bold',
                fill: 'black',
                padding: 40,
            },
            tickLabels: {
              fill: 'black',
              fontSize: 13,
            }
            }}
          />
          <VictoryAxis
            independentAxis
            fixLabelOverlap={true}
            label={url.interval + '-' + url.year}
            style={{
              axis: {stroke: 'black'},
              ticks: {stroke: 'black'},
              axisLabel: {padding: 30,
                fontSize: 15,
                fontWeight: 'bold',
                fill: 'black',
              },
              tickLabels: {
                fill: 'black',
                fontSize: 13,
              },
              label: {fontsize: 15},
            }}
          />
         
            <VictoryBar
             style={{ data: { fill: "purple" } }}
              data={countryWiseVaccCount}
              x={'Interval'}
              y={'GemeldeteImpfungenLaender'}
            />
         
        </VictoryChart>
        <VictoryChart
          width={380}
          height={160}
          scale={{x: 'linear'}}
          padding={{top: 30, left: 80, right: 30, bottom: 50}}
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
              independentAxis
              fixLabelOverlap={true}
              label={url.interval + '-' + url.year}
              style={{
                axis: {stroke: 'black'},
                ticks: {stroke: 'black'},

                axisLabel: {
                  padding: 30,
                  fontSize: 15,
                  fontWeight: 'bold',
                  fill: 'black',
                },
                tickLabels: {
                  fill: 'black',
                  fontSize: 13,
                },
                label: {fontsize: 15},
              }}
            />
          <VictoryBar
            style={{ data: { fill: "purple" } }}
  
            data={countryWiseVaccCount}
            x={'Interval'}
            y={'GemeldeteImpfungenLaender'}
            interpolation="catmullRom"
          />
        </VictoryChart>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 3,
    backgroundColor: '#eeeeee',
  },
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    //padding: '10',
  },
  row: {
    flexDirection: 'row',
   
    justifyContent: 'center',
    alignItems: 'center',
  },
  parametersRow:{
    flexDirection: 'row',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    
  },
  normalButton: {
    width: 70,
    height: 30,
    borderRadius: 50,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    paddingLeft: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  heading: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});
