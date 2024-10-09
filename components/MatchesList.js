import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MatchesListItem } from './MatchesListItem';
import { http_query } from '../functions/http';
import * as SQLite from 'expo-sqlite/legacy';
const styles = require('../styles/stylesheet');

export const MatchesList = () => {
  const db = SQLite.openDatabase('./db.FCFapp')
  const navigation = useNavigation();

  let itemsArray = [];
  let string = "";
  let [items, setItems] = useState([]);
  let [matches, setMatches] = useState([]);
  let [empty, setEmpty] = useState(0);
  let [reload, setReload] = useState([]);



  function removeLastComma(str) {
  //  return str.replace(/,\s*$/, '');
  return str;
  }
  const fetchMatchesData = (string) => {
    string = removeLastComma(string);
    query = "https://clubolesapati.cat/API/apiPropersPartits.php?teamFilter=" + string;
    console.log("https://clubolesapati.cat/API/apiPropersPartits.php?teamFilter=" + string);
    params = [];
    let response = http_query(query, params).then((res) => { setMatches(res); });
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT distinct idTeam FROM  activeTeams;", [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          setEmpty(1);
        }
        setItems(results.rows);
        results.rows._array.map((team) => {
          string = string + team.idTeam + ",";
        })
        fetchMatchesData(string);
      });
    })

  }, [reload]);

  if (items._array) {
    itemsArray = Array.from(items._array)

  }
  if (matches) {
    return (<>{matches?.map(
      n => (
        < MatchesListItem
          matchId={n['matchId']} matchLocal={n['truncatedLocal']} matchVisitor={n['truncatedVisitor']}
          matchComplexName={n['complexName']} matchComplexAddress={n['complexAddress']} matchDate={n['matchDate']}
          matchHour={n['matchHour']} matchFixture={n['matchFixture']}
          matchLocalImage={n['localImage']} matchVisitorImage={n['visitorImage']}
          matchIdLeague={n['idLeague']} matchLeagueName={n['leagueName']} matchGroupName={n['groupName']}
          matchesLocalResult={n['localResult']} matchesVisitorResult={n['visitorResult']}
          key={n['matchId']} matchesDistance={n['distance']}
          matchesTravelTime={n['travelTime']} matchesMeteo={n['meteo']} matchesMeteoIcon={n['meteo']}
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
      <View><Text>1</Text></View>
    )
  }
}
