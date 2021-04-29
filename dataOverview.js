import React, {useState, useEffect} from 'react';
import {  SafeAreaView,
  ScrollView,StyleSheet, Text, View} from 'react-native';
  import {Card} from 'react-native-elements';
  import DropDownPicker from 'react-native-dropdown-picker';
  import Icon from 'react-native-vector-icons/Feather';

  const overview = () => {
  // Data Source for the SearchableDropdown
  const [serverData, setServerData] = useState([]);
  const [districtName, setdistrictName] = useState(['Linz-Land']);

  useEffect(() => {
    fetch('https://5ccd042aff7d.ngrok.io/api/alldistrictnames/')
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        setServerData(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <DropDownPicker
            items={serverData.map(item => ({label: item, value: item}))}
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
            onChangeItem={item => setdistrictName(item.value)}
          />
        </View>
        <View>
          <Text>{districtName}</Text>
        </View>
        <Text style={styles.Heading}>Data Overview</Text>
        <View style={styles.cardTop}>
          <Card>
            {/*react-native-elements Card*/}
            <Card.Title style={{color: '#0087ff'}}>Positive Cases</Card.Title>
            <Text>Granularity: district-wise</Text>
            <Text>Update Interval:Daily update</Text>
            <Text>Availability:(lagging by two days)</Text>
            <Text>Graph Interval:Year-week-month</Text>
          </Card>
          <Card>
            <Card.Title style={{color: '#0087ff'}}>R-effective</Card.Title>
            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Data:state-wise Update Interval-Daily update Availability:
              up-to-date Graph Interval: Year-week-month
            </Text>
          </Card>
        </View>
        <View style={styles.cardTop}>
          <Card>
            <Card.Title style={{color: '#0087ff'}}>
              District warning level
            </Card.Title>

            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Data:district-wise, area Update Interval-Weekly update
              Availability:for specific date Graph Interval: secific date
            </Text>
          </Card>
          <Card>
            <Card.Title style={{color: '#0087ff'}}>Local Modules</Card.Title>
            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              React Native Card View for Android and IOS using
              "react-native-elements"
            </Text>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default overview;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
    ///justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#eeeeee',
  },
  paragraph: {
    margin: 5,
    fontSize: 14,

    textAlign: 'left',
    color: '#34495e',
  },
  Heading: {
    fontWeight: 'bold',
    color: '#0087ff',
    fontSize: 16,
  },
  cardTop: {
    //flex: 1,
    flexDirection: 'row',
    width: 205,
    height: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
