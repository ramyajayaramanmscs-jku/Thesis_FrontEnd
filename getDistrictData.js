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
        `https://b9078716b760.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`,
      )
        .then(response => response.json())
        .then(json => setDistrictWisePositiveCases(json.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), [selectedDistrictName]);
    }
    async function getDistrictNames() {
      await fetch('https://b9078716b760.ngrok.io/api/alldistrictnames/')
        .then(response => response.json())
        .then(json => setDistrictName(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    getDistrictData();
  }, [url]);

  const sampleurl = `https://b9078716b760.ngrok.io/api/positivecasesbydistrict/?districtname=${url.districtName}&year=${url.year}&interval=${url.interval}`;
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
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <Header
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
      /> */}
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

        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>chart</Text>
        </Pressable> */}
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
        <Text>{sampleurl}</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={400}
          height={400}
          padding={{top: 40, left: 70, right: 30, bottom: 70}}
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
              axis: {stroke: 'black'},
              ticks: {stroke: 'purple', size: 5},
              axisLabel: {padding: 50},
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
          height={200}
          scale={{x: 'linear'}}
          padding={{top: 10, left: 60, right: 20, bottom: 120}}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushStyle={{fill: 'teal', opacity: 0.2}}
              brushDomain={selectedDomain}
              onBrushDomainChange={handleBrush}
            />
          }>
          {/* <VictoryAxis
            tickValues={[districtWisePositiveCases.Interval]}
            label="Interval"
          /> */}

          <VictoryLine
            containerComponent={
              <VictoryBrushContainer
                responsive={false}
                brushDimension="x"
                brushStyle={{fill: 'teal', opacity: 0.2}}
                brushDomain={selectedDomain}
                onBrushDomainChange={handleBrush}
              />
            }
            style={{
              data: {stroke: 'blue'},
            }}
            data={districtWisePositiveCases}
            x={'Interval'}
            //y={'AnzahlFaelle'}
            interpolation="catmullRom"
          />
        </VictoryChart>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flex: 0.5,
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
