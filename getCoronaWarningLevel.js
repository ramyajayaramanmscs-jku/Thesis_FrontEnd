import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {SearchBar, Card} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function getWarningLevelDataAPI() {
  const [districtName, setDistrictName] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selecteddate, setSelectedDate] = useState(['2021-06-17']);

  useEffect(() => {
    if (loading) {
      async function getDistrictNames() {
        await fetch(
          `https://1102c8a2eae3.ngrok.io/api/warnLevelRegion/?date=${selecteddate}`,
        )
          .then(response => response.json())
          .then(json => setDistrictName(json))
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
      }

      async function getWarnLevelDates() {
        await fetch('https://1102c8a2eae3.ngrok.io/api/dropdownvalues')
          .then(dropdownresponse => dropdownresponse.json())
          .then(dropdownresponseJson => {
            setFilteredDataSource(dropdownresponseJson.WarnLevelDates);
            setMasterDataSource(dropdownresponseJson.WarnLevelDates);
          })
          .catch(error => {
            console.error(error);
          });
      }
      getDistrictNames();
      getWarnLevelDates();
    }
  }, [loading]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.Dates ? item.Dates : '';

        return itemData.indexOf(itemData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.Dates}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = item => {
    setSelectedDate(item.Dates);
    setLoading(true);
  };
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  console.log(selecteddate);
  return (
    <View style={styles.container}>
      {/* <SearchBar
          style={styles.searchbarstyle}
          round
          searchIcon={{size: 24}}
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction('')}
          placeholder="choose a date..."
          value={search}
          icon="search"
        /> */}
      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.cardTitle}>
          Corona Warning Level : {selecteddate}
        </Card.Title>
        <Text>Choose a date</Text>
        <FlatList
          style={styles.flatListStyle}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          renderItem={ItemView}
        />
      </Card>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 47.82326,
          longitude: 13.84644,
          latitudeDelta: 6.5,
          longitudeDelta: 1.5,
        }}>
        {districtName.map((report, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: report.Latitude,
              longitude: report.Longitude,
            }}
            pinColor={report.MarkerColor}
            title={report.cityName}></Marker>
        ))}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    height: '100%',
  },
  map: {
    flex: 1,
  },
  itemStyle: {
    paddingLeft: 50,
    alignItems: 'center',
  },
  searchbarstyle: {
    height: 30,
  },
  inputParametersContainer: {
    paddingTop: 20,
  },
  cardStyle: {
    paddingTop: 10,
    borderRadius: 20,
    height: 140,
    width: 380,
    marginRight: 0,
    marginLeft: 5,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 15,
  },
  flatListStyle: {
    padding: 45,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: '60%',
    borderRadius: 20,
    // border: 1,
    backgroundColor: '#d4d4d4',
    flexGrow: 0,
  },
});
