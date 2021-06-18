import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  FlatList,
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
import {Button, Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function getPositiveCasesCountAPI() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showLineChart, setShowLineChart] = useState(true);
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
        `https://f502bb63a406.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setDistrictWisePositiveCases(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), [selectedDistrictName]);
    }
    async function getDistrictNames() {
      await fetch('https://f502bb63a406.ngrok.io/api/dropdownvalues')
        .then(response => response.json())
        .then(json => setDistrictName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getDistrictData();
  }, [url]);

  // const sampleurl = `https://ecfd241ea67c.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`;
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
    if (interval == 'yearly') {
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
  var data = districtWisePositiveCases.map(function (item) {
    return {
      anzahlfaelle: item.AnzahlFaelle,
    };
  });
  console.log(data);
  function renderElement() {
    if (url.interval == 'yearly') return;
    <View>
      <VictoryChart>
        <VictoryBar
          data={districtWisePositiveCases}
          x={'YearlyInterval'}
          y={'AnzahlFaelle'}
        />
      </VictoryChart>
    </View>;
    return null;
  }
  if (loading) return 'Loading...';

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
                  COVID-19 Positive Cases Count {'\n'}
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
            <Text style={styles.subHeading}>{url.districtName}</Text>
          </View>
          {/*  <Text>{sampleurl}</Text> */}

          <VictoryChart
            theme={VictoryTheme.material}
            width={390}
            height={400}
            domainPadding={{y: [0, 10]}}
            padding={{top: 30, left: 70, right: 30, bottom: 70}}
            containerComponent={
              <VictoryZoomVoronoiContainer
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
                labels={({datum}) => `cases:${datum.AnzahlFaelle}`}
                labelComponent={<VictoryTooltip />}
              />
            }>
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
            <VictoryLine
              data={districtWisePositiveCases}
              x={'Interval'}
              y={'AnzahlFaelle'}
              style={{
                data: {stroke: 'teal', strokeWidth: 3},
                parent: {border: '1px solid #ccc'},
              }}
              interpolation="catmullRom"
            />
          </VictoryChart>
          <VictoryChart
            domainPadding={{y: [0, 10]}}
            width={380}
            height={200}
            scale={{x: 'linear'}}
            padding={{top: 10, left: 60, right: 10, bottom: 119}}
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
                data: {stroke: 'teal'},
              }}
              data={districtWisePositiveCases}
              x={'Interval'}
              y={'AnzahlFaelle'}
              interpolation="catmullRom"
            />
          </VictoryChart>
        </View>
      ) : (
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
                  COVID-19 Positive Cases Count {'\n'}
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
            <Text style={styles.subHeading}>{url.districtName}</Text>
          </View>
          <VictoryChart
            padding={{top: 50, left: 80, right: 30, bottom: 70}}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({datum}) => `cases:${datum.AnzahlFaelle}`}
                labelComponent={<VictoryTooltip />}
              />
            }>
            <VictoryBar
              theme={VictoryTheme.material}
              width={350}
              height={450}
              data={districtWisePositiveCases}
              x={'YearlyInterval'}
              y={'AnzahlFaelle'}
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
    //flex: 1,
    flex: 0.5,
    paddingTop: 13,
  },
  row: {
    flexDirection: 'row',
    // padding: 10,
    //textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  iconSetting: {
    width: 50,
    height: 50,
    //backgroundColor: 'blue',
    //backgroundColor: '#146ae3',
  },
  heading: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});
