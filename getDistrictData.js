import  React , {useState,useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
VictoryTooltip,
VictoryBrushContainer,
VictoryVoronoiContainer,
VictoryAxis}
from 'victory-native';
export default function getPositiveCasesCountAPI(){

  const[loading,setLoading]=useState(null);
  const [districtWisePositiveCases, setDistrictWisePositiveCases] = useState([]);
  const [districtNames, setDistrictNames] = useState(['Linz-Land']);
const [selectedValue, setSelectedValue] = useState("Linz-Land");
  var city=[];
  var month=[];
  var cases=[];
  var year=[];
var see='';
    useEffect(() => {
      getDistrictData()
      getDistrictNames()
    },[]);
      async function getDistrictData(){
        await fetch('https://79fcda4fe6ce.ngrok.io/api/positivecasesbydistrict/?districtname=Linz-Land&year=2020&interval=monthly')
          .then((response) => response.json())
          .then((json) => setDistrictWisePositiveCases(json.data.filter(d=>d.Year==='2020')))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
   }
   async function getDistrictNames(){
     await fetch('https://79fcda4fe6ce.ngrok.io/api/alldistrictnames/')
       .then((response) => response.json())
       .then((json) => setDistrictNames(json))
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
}

if (loading) return "Loading...";
  return (
    <>
    <View style={{ flex: 1, padding: 5 }}>
    <Text style={{color: 'blue', fontSize: 16, textAlign: 'center'}}>
     Positive Covid Cases By Month-Linz Land

     </Text>

    </View>
<View>
<Text>{districtWisePositiveCases.Month}</Text>
<VictoryChart
      theme={VictoryTheme.material}
       width={600} height={470}
       containerComponent={
 <VictoryVoronoiContainer

   labels={({ datum }) => `cases: ${datum.AnzahlFaelle},month:${datum.Month}`}
 />
}>
        <VictoryLine labelComponent={<VictoryTooltip/>}
        style={{
          data: {stroke: '#c43a31', strokeWidth:1},
          parent: {border: '1px solid #ccc'},
        }}

          data={districtWisePositiveCases}
          x= {"Month"}
           y={"AnzahlFaelle"}
          labels={({ datum }) => datum.AnzahlFaelle}
        />
      </VictoryChart>


</View>
</>
  );
  }

  const styles = StyleSheet.create({
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
  // <Picker
  //        selectedValue={selectedValue}
  //        style={{ height: 50, width: 150 }}
  //        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  //      >
  //        <Picker.Item label="Linz-Land" value="Linz-Land" />
  //        <Picker.Item label="Linz(Stadt)" value="Linz(Stadt)" />
  //        <Picker.Item label="Wels(Stadt)" value="Linz(Stadt)" />
  //
  //      </Picker>
