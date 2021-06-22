import React, {Fragment, useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Modal,
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
  VictoryBar,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryAxis,
  createContainer,
} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Card} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Feather';
import {Button, Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function getReffectiveValue() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showLineChart, setShowLineChart] = useState(true);
  const [loading, setLoading] = useState(null);
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();
  const handleZoom = domain => {
    setSelectedDomain(domain);
  };
  const handleBrush = domain => {
    setZoomDomain(domain);
  };
  const [rEffAustria, setREffAustria] = useState([]);
  const [districtName, setDistrictName] = useState(['Linz-Land']);
  const [year, setYear] = useState('2021');
  const [interval, setInterval] = useState('Monthly');

  const encodedYear = encodeURIComponent(2020);
  const encodedInterval = encodeURIComponent('monthly');
  const [url, setUrl] = useState({
    districtName: 'Austria',
    year: 2021,
    interval: 'Monthly',
  });
  useEffect(() => {
    async function getDistrictData() {
      await fetch(
        `https://527e7d26efd6.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setREffAustria(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), []);
    }
    async function getDistrictNames() {
      await fetch('https://ecfd241ea67c.ngrok.io/api/dropdownvalues')
        .then(response => response.json())
        .then(json => setDistrictName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getDistrictData();
  }, [url]);
 // const sampleurl = `https://ecfd241ea67c.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`;

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
      if (interval == 'Yearly') {
        setShowLineChart(false);
      } else {
        setShowLineChart(true);
      }
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
  if (loading) return 'Loading...';

  //console.log('selectedYear',selectedYear,rEffAustria)
  return (
    <SafeAreaProvider>
        {showLineChart ? (
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
               
                <View style={styles.parametersRow}>
                  <Text style={{paddingTop:5, padding:5}}>Choose Year:</Text>
                  <RadioForm
                    radio_props={chooseYear}
                    initial={2021}
                    formHorizontal={true}
                    onPress={value => setYear(value)}
                  />
                </View>
                <View style={styles.parametersRow}>
                  <Text style={{paddingTop:6,padding: 3}}>Data Interval:</Text>
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
              <View
                style={
                  {
                    // alignContent: 'flex-start',
                    //paddingTop: 5,
                    //paddingRight: 8,
                  }
                }>
                <Text style={styles.heading}>
                  R_Effective_Value {'\n'}
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
            <Text style={styles.subHeading}>Austria</Text>
            </View>
          <View>
            <VictoryChart
              theme={VictoryTheme.material}
              width={390}
              height={400}
              domainPadding={{y: [0, 10]}}
              padding={{top: 60, left: 70, right: 30, bottom: 60}}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  zoomDimension="x"
                  zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
                  labels={({datum}) =>
                    `r_eff: ${datum.R_eff}`
                  }
                  labelComponent={<VictoryTooltip />}
                />
              }>
              <VictoryAxis
                dependentAxis
                fixLabelOverlap={true}
                label={'R_Effective'}
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'black'},
                  
                  axisLabel: {
                    fontSize: 15,
                    padding: 50,
                    fontWeight: 'bold',
                    fill: 'black',},
                    
                    tickLabels: {
                      fill: 'black',
                      fontSize: 13,
                    },
                }}
              />
              <VictoryAxis
              fixLabelOverlap={true}
                independentAxis
                label={url.interval + '-' + url.year}
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'black'},
                  
                  axisLabel: {
                    padding: 30,
                    fontSize: 15,
                    fontWeight: 'bold',
                    fill: 'black',},

                    tickLabels: {
                      fill: 'black',
                      fontSize: 13,
                    },
                    label: {fontsize: 15},
                }}
              />
              <VictoryLine
               
                style={{
                  data: {stroke: '#32a846', strokeWidth: 4},
                  parent: {border: '1px solid #ccc'},
                }}
                data={rEffAustria}
                x={'Interval'}
                y={'R_eff'}
                interpolation="catmullRom"
              />
            </VictoryChart>
            
            <VictoryChart
            domainPadding={{y: [0, 10]}}
            width={380}
            height={160}
            scale={{x: 'linear'}}
            padding={{top: 30, left: 60, right: 10, bottom: 50}}
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
               <VictoryLine
              style={{
                data: {stroke: 'green'},
              }}
              data={rEffAustria}
              x={'Interval'}
              y={'R_eff'}
              interpolation="catmullRom"
            />
             </VictoryChart>
          </View>
        </View>
        ):(
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
                 
                  <View style={styles.parametersRow}>
                    <Text style={{paddingTop:5, padding:5}}>Choose Year:</Text>
                    <RadioForm
                      radio_props={chooseYear}
                      initial={2021}
                      formHorizontal={true}
                      onPress={value => setYear(value)}
                    />
                  </View>
                  <View style={styles.parametersRow}>
                    <Text style={{paddingTop:6, padding:5}}>Data Interval:</Text>
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
              <View
                style={
                  {
                    // alignContent: 'flex-start',
                    //paddingTop: 5,
                    //paddingRight: 8,
                  }
                }>
                <Text style={styles.heading}>
                  R_Effective_Value {'\n'}
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
            <Text style={styles.subHeading}>Austria</Text>
          </View>
          <VictoryChart
            padding={{top: 50, left: 80, right: 30, bottom: 70}}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({datum}) => `r_eff: ${datum.R_eff}`}
                labelComponent={<VictoryTooltip />}
              />
            }>
            <VictoryBar
              theme={VictoryTheme.material}
              width={350}
              height={450}
              style={{data: {fill: 'teal'}}}
              data={rEffAustria}
              x={'YearlyInterval'}
              y={'R_eff'}
            />
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              label={'Positive Cases'}
              style={{
                axis: {stroke: 'black'},
                ticks: {stroke: 'black'},

                axisLabel: {
                  fontSize: 15,
                  padding: 50,
                  fontWeight: 'bold',
                  fill: 'black',
                },
                tickLabels: {
                  fill: 'black',
                  fontSize: 13,
                },
                grid: {
                  stroke: 'transparent',
                  //strokeDasharray: '7',
                },
              }}
            />
            <VictoryAxis
              fixLabelOverlap={true}
              independentAxis
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
          </VictoryChart>
        </View>
     
        )}
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 3,
    backgroundColor: '#eeeeee',
  },
  row: {
    flexDirection: 'row',
    // padding: 10,
    //textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parametersRow:{
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    //padding: '10',
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
