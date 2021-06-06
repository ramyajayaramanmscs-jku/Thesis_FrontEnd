import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {Header} from 'react-native-elements';
const overview = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          backgroundColor="#005fff"
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{
            text: 'Data Overview',
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

        <View style={styles.cardTop}>
          <Card>
            {/*react-native-elements Card*/}
            <Card.Title style={{color: '#0087ff'}}>Positive Cases</Card.Title>
            <Text>Granularity: district-wise</Text>
            <Text>Update Interval:Daily update</Text>
            <Text>Availability:(lagging by two days)</Text>
            <Text>Graph Interval:Year-Week-Month</Text>
          </Card>
          <Card>
            <Card.Title style={{color: '#0087ff'}}>R-effective</Card.Title>
            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Granularity:Austria Update Interval-Daily update
              Availability:up-to-date(lagging by one week) Graph Interval:
              Year-Week-Month
            </Text>
          </Card>
        </View>
        <View style={styles.cardTop}>
          <Card>
            <Card.Title style={{color: '#0087ff'}}> Warning level </Card.Title>

            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Granularity:district-wise, area Update Interval-Weekly update
              Availability:For Specific Date Graph Interval: Specific Date
            </Text>
          </Card>
          <Card>
            <Card.Title style={{color: '#0087ff'}}>Vaccination Data</Card.Title>
            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Granularity:state-wise, Update Interval-Daily update
              Availability:(lagging by two days) Graph Interval: Year-Week-Month
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

    paddingTop: 13,
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
