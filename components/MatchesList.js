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
    return str.replace(/,\s*$/, '');
  }
  const fetchMatchesData = (string) => {
    string = removeLastComma(string);
    query = "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates, m.idGroup from matches m join groups g on g.idGroup=m.idGroup where idLocal in (" + string + ") or idVisitor in (" + string + ")  limit 0,50";
    params = [];
    let response = http_query(query, params).then((res) => { setMatches(res[0].results.rows); });
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
          matchId={n[0]} matchLocal={n[1]} matchVisitor={n[2]}
          matchComplexName={n[3]} matchComplexAddress={n[3]} matchDate={n[4]}
          matchHour={n[5]} matchFixture={n[6]}
          matchLocalImage={n[7]} matchVisitorImage={n[8]}
          matchIdLeague={n[17]} matchLeagueName={n[9]} matchGroupName={n[9]}
          matchesLocalResult={n[10]} matchesVisitorResult={n[11]}
          key={n[0]} matchesDistance={n[13]}
          matchesTravelTime={n[14]} matchesMeteo={n[15]} matchesMeteoIcon={n[15]}
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
