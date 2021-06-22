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
            text: 'Feature Overview',
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

        <View style={styles.cardRow}>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}>Positive Cases</Card.Title>
            <Text>
              <Text style={styles.subHeading}>Granularity:</Text> City-Wise
            </Text>
            <Text>
              <Text style={styles.subHeading}>Update Interval:</Text>
              Daily
            </Text>
            <Text style={styles.subHeading}>Availability:</Text>
            <Text>Lagging By Two Days</Text>
            <Text style={styles.subHeading}>Graph Interval:</Text>
            <Text> Week-Month-Year</Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}> Warning Level </Card.Title>
            <Text>
              <Text style={styles.subHeading}>Granularity:</Text> City-Wise
            </Text>
            <Text>
              <Text style={styles.subHeading}>Update Interval:</Text>
              Weekly
            </Text>
            <Text style={styles.subHeading}>Availability:</Text>
            <Text>For Specific Date</Text>
            <Text style={styles.subHeading}>Map Interval:</Text>
            <Text>Specific Date</Text>
          </Card>
        </View>

        <View style={styles.cardRow}>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}>Vaccination </Card.Title>
            <Text>
              <Text style={styles.subHeading}>Granularity:</Text> State-Wise
            </Text>
            <Text>
              <Text style={styles.subHeading}>Update Interval:</Text>
              Daily
            </Text>
            <Text style={styles.subHeading}>Availability:</Text>
            <Text>Lagging By Two Days</Text>
            <Text style={styles.subHeading}>Graph Interval: </Text>
            <Text>Week-Month-Year</Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={styles.cardTitle}>REffective</Card.Title>
            <Text>
              <Text style={styles.subHeading}>Granularity:</Text> Country-Wise
            </Text>
            <Text>
              <Text style={styles.subHeading}>Update Interval:</Text>
              Daily
            </Text>
            <Text style={styles.subHeading}>Availability:</Text>
            <Text>Lagging By One Week</Text>
            <Text style={styles.subHeading}>Graph Interval: </Text>
            <Text>Week-Month-Year</Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={styles.modelCard}>
            <Card.Title style={styles.cardTitle}>
              Model Simulation Parameters
            </Card.Title>

            <View>
              <Text style={styles.subHeading}>Room:</Text>
              <Text>Size ,Ventilation and Ceiling Height</Text>
              <Text style={styles.subHeading}>People: </Text>
              <Text>People Count, Speech Volume and Duration</Text>
              <Text style={styles.subHeading}>Duration:</Text>
              <Text>Stay Duration in Room</Text>
              <Text style={styles.subHeading}>Own Behavior:</Text>
              <Text>Masks and Vaccination</Text>
              <Text style={styles.subHeading}>COVID-19 Info:</Text>
              <Text>Positive Cases and Vaccination Count</Text>
            </View>
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

    backgroundColor: '#eeeeee',
    
  },

  Heading: {
    fontWeight: 'bold',
    color: '#0087ff',
    fontSize: 16,
  },
  cardRow: {
    //flex: 1,
    flexDirection: 'row',
  },
  modelCard: {
    borderRadius: 20,
    borderColor: 'lightgrey',
    paddingBottom: 10
  },
  cardStyle: {
    borderRadius: 20,
    width: 180,
    marginRight: 0,
    marginLeft: 10,
    borderColor: 'lightgrey',
  },
  cardTitle: {
    color: '#0087ff',
    fontSize: 15,
  },
  subHeading: {
    fontWeight: 'bold',
  },
});
