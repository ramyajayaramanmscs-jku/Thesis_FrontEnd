import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {Card, SearchBar, Icon} from 'react-native-elements';
import Slider from '@react-native-community/slider';

export default function modelSimulationWithParameters() {
  const [roomstate, setRoomState] = useState([
    {
      roomSize: 10,
    },
  ]);
  const [durationstate, setDurationState] = useState([
    {
      durationofStay: 30,
    },
  ]);
  const [peopleCount, setPeopleCount] = useState([
    {
      noofPeople: 2,
    },
  ]);
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardStyle}>
        <Card.Title>Model Simulation Parameters</Card.Title>
        <Card.Divider />
        <Icon
          raised
          name="head-side-mask"
          type="font-awesome"
          color="#f50"
          onPress={() => console.log('hello')}
        />
        <Icon
          raised
          name="door-open"
          type="font-awesome"
          color="#f50"
          onPress={() => console.log('hello')}
        />
        <Text style={styles.heading}>Room Properties</Text>
        <Text style={styles.subheading}>Room size in meters</Text>
        <View style={styles.row}>
          <Slider
            style={{width: 200, height: 50}}
            value={roomstate.roomSize}
            onValueChange={value => setRoomState({roomSize: Math.round(value)})}
            minimumValue={10}
            maximumValue={100}
            minimumTrackTintColor="green"
            maximumTrackTintColor="red"
            thumbTintColor="grey"
            onSlidingComplete={val => setRoomState({roomSize: Math.round(val)})}
          />

          <Text>Value: {roomstate.roomSize}</Text>
        </View>

        <Text style={styles.subheading}>Duration of stay in room min/hour</Text>
        <View style={styles.row}>
          <Slider
            style={{width: 200, height: 50}}
            value={durationstate.durationofStay}
            onValueChange={value =>
              setDurationState({durationofStay: Math.round(value)})
            }
            minimumValue={0.5}
            maximumValue={12}
            minimumTrackTintColor="green"
            maximumTrackTintColor="red"
            thumbTintColor="grey"
          />
          <Text>Value: {durationstate.durationofStay}</Text>
        </View>
        <Text style={styles.subheading}>Number of people in room</Text>
        <View style={styles.row}>
          <Slider
            style={{width: 200, height: 40}}
            value={peopleCount.noofPeople}
            onValueChange={value =>
              setPeopleCount({noofPeople: Math.round(value)})
            }
            minimumValue={2}
            maximumValue={36}
            minimumTrackTintColor="green"
            maximumTrackTintColor="red"
            thumbTintColor="grey"
          />
          <Text>Value: {peopleCount.noofPeople}</Text>
        </View>
      </Card>
    </View>
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
    paddingTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStyle: {
    marginTop: 20,

    paddingTop: 20,
    height: 450,
    width: 350,
  },
});
