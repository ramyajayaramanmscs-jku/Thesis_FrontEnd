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
  const [loading, setLoading] = useState(null);
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [rEffAustria, setREffAustria] = useState([]);
  const [districtName, setDistrictName] = useState(['Linz-Land']);
  const [year, setYear] = useState('2020');
  const [interval, setInterval] = useState('monthly');

  const encodedYear = encodeURIComponent(2020);
  const encodedInterval = encodeURIComponent('monthly');
  const [url, setUrl] = useState({
    districtName: 'Linz-Land',
    year: 2021,
    interval: 'monthly',
  });
  useEffect(() => {
    async function getDistrictData() {
      await fetch(
        `https://ecfd241ea67c.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`,
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
  const sampleurl = `https://ecfd241ea67c.ngrok.io/api/R_eff_Austria/?year=${url.year}&interval=${url.interval}`;

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
  if (loading) return 'Loading...';

  //console.log('selectedYear',selectedYear,rEffAustria)
  return (
    <SafeAreaProvider>
      <>
        <View style={styles.container}>
          {/* <Header
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
        /> */}
          {/* <Text>{JSON.stringify(rEffAustria)}</Text> */}

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
                  <Text style={{padding: 3}}>Choose District:</Text>

                  <DropDownPicker
                    items={districtName.map(item => ({
                      label: item,
                      value: item,
                    }))}
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
                </View>
                <View style={{padding: 3}}>
                  <Text style={{padding: 3}}>Choose Year:</Text>
                  <RadioForm
                    radio_props={chooseYear}
                    initial={2021}
                    formHorizontal={true}
                    onPress={value => setYear(value)}
                  />
                </View>
                <View style={{padding: 3}}>
                  <Text style={{padding: 3}}>Choose Data Interval:</Text>
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
          <Button
            buttonStyle={styles.normalButton}
            type="solid"
            icon={{
              name: 'settings',
              size: 15,
              color: 'white',
            }}
            iconRight="true"
            title="chart"
            onPress={() => setModalVisible(true)}
          />
          {/*   <Text>{sampleurl}</Text>
           */}
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
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'purple', size: 5},
                  axisLabel: {padding: 30},
                }}
              />
              <VictoryAxis
                independentAxis
                label={'Interval'}
                style={{
                  axis: {stroke: 'black'},
                  ticks: {stroke: 'purple', size: 5},
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
        </View>
      </>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 13,
    backgroundColor: '#eeeeee',
  },
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
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
    width: 100,
    borderRadius: 20,
    padding: 10,
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
});
