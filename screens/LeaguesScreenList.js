import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native';
import { LeaguesList } from '../components/LeaguesList'
const styles = require('../styles/stylesheet');
export const LeaguesScreenList = ({ navigation }) => {
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  const [currentDate, setcurrentDate] = useState(hours + "" + min + "" + sec)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      var date = new Date().getDate(); //To get the Current Date
      var month = new Date().getMonth() + 1; //To get the Current Month
      var year = new Date().getFullYear(); //To get the Current Year
      var hours = new Date().getHours(); //To get the Current Hours
      var min = new Date().getMinutes(); //To get the Current Minutes
      var sec = new Date().getSeconds(); //To get the Current Seconds
      setcurrentDate(hours + "" + min + "" + sec);
      // console.log('Refreshed! ' + currentDate);
    });
    return unsubscribe;
  }, [navigation, currentDate]);
  let h;
  h = <LeaguesList key={currentDate}></LeaguesList>
  return (
    <>
      <View style={{ width: '94%', marginLeft: '3%', height:'100%' }}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Competicions</Text>
        </View>
        <ScrollView>
          {h}
        </ScrollView></View>
    </>
  )
}
