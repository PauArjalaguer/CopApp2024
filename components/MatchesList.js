import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MatchesListItem } from './MatchesListItem'

import * as SQLite from 'expo-sqlite/legacy';
const styles = require('../styles/stylesheet');
export const MatchesList = () => {
  const db = SQLite.openDatabase('./db.FCFapp') // returns Database object  
  const navigation = useNavigation();

  let itemsArray = [];
  let [items, setItems] = useState([]);
  let [matches, setMatches] = useState([]);
  useEffect(() => {
    console.log("use effect")
    let string = "";
    setItems([]);
    setMatches([]);
    db.transaction((tx) => {
      console.log("Transaction");
      tx.executeSql("SELECT distinct teamId FROM  activeTeams ;", [], (tx, results) => {
        var len = results.rows.length;
        setItems(results.rows);
        console.log(results.rows)
        results.rows._array.map((team) => {
          string = string + team.teamId + ",";
        })
        console.log("After map:" + string)
        fetch("http://clubolesapati.cat/API/apiPropersPartits.php?teamFilter=" + string)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setMatches(data);
            console.log(matches);

          })
      });
    })

  }, [setItems])

  if (items._array) {
    itemsArray = Array.from(items._array)

  }
  if (matches) {
    return (
      <>

        {matches?.map(
          n => (
            < MatchesListItem
              matchId={n.matchId} matchLocal={n.local} matchVisitor={n.visitor}
              matchComplexName={n.complexName} matchComplexAddress={n.complexAddress} matchDate={n.matchDate}
              matchHour={n.matchHour} matchFixture={n.matchFixture}
              matchLocalImage={n.localImage} matchVisitorImage={n.visitorImage}
              matchIdLeague={n.idLeague} matchLeagueName={n.leagueName} matchGroupName={n.groupName}
              matchesLocalResult={n.localResult} matchesVisitorResult={n.visitorResult}
              key={n.matchId} matchesDistance={n.distance}
              matchesTravelTime={n.travelTime} matchesMeteo={n.meteo} matchesMeteoIcon={n.meteoIcon}
            ></MatchesListItem>

          )
        )
        }
        <View><Text> </Text></View>
        <View><Text> </Text></View>
        <View><Text> </Text></View>
      </>
    )
  } else {
    return (
      <View>
        <Text style={{ padding: 9, fontFamily: 'GalanoGrotesqueBold', }}>Carregant dades</Text>
      </View>
    )
  }
}
