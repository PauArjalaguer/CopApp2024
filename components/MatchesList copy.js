import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { MatchesListItem } from './MatchesListItem'
import * as SQLite from 'expo-sqlite';

export const MatchesList = () => {
  const db = SQLite.openDatabase('db.cop');
  let matchesArray = [];
  let [items, setItems] = useState([]);
  let [activeTeams, setActiveTeams] = useState([]);

  const selectActiveTeams = () => {
    let string = "";
    console.log("\n \n Entro a active teams")
    db.transaction((tx) => {
      tx.executeSql("SELECT teamId, teamName,  isActive FROM  teams order by teamName asc;", [], (tx, results) => {
        var len = results.rows.length;
        setActiveTeams(results.rows);

      });
    }, null, null)



  }

  const fetchMatchesData = () => {
    let string = selectActiveTeams();

    console.log("Entro a fetchMatchesData:" + JSON.stringify(string));
    fetch("http://clubolesapati.cat/API/apiPropersPartits.php?teamFilter=" + activeTeams)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setItems(data);

      })



  }
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT teamId, teamName,isActive FROM  teams where isActive=1 order by teamName asc;", console.log("potllaa"), (tx, results) => {
        console.log("Actius:" + activeTeams);
        var len = results.rows.length;
        console.log("resultats: " + results.rows.length);
        setActiveTeams(results.rows);
        console.log("Actius 2:" + activeTeams);

      },
        (err) => {
          console.log("SQL Error: " + err);
        }, console.log("OK")
      );
    })
  }, [])



  if (items._array) {
    matchesArray = Array.from(items._array)
    //console.log(matchesArray) 
  }
  if (items) {
    return (
      <>

        {items?.map(
          n => (
            < MatchesListItem
              matchId={n.matchId} matchLocal={n.local} matchVisitor={n.visitor}
              matchComplexName={n.complexName} matchComplexAddress={n.complexAddress} matchDate={n.matchDate}
              matchHour={n.matchHour} matchFixture={n.matchFixture}
              matchLocalImage={n.localImage} matchVisitorImage={n.visitorImage}
              matchIdLeague={n.idLeague} matchLeagueName={n.leagueName} matchGroupName={n.groupName}
              matchesLocalResult={n.localResult} matchesVisitorResult={n.visitorResult}
              key={n.matchId}
            ></MatchesListItem>

          )
        )
        }


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
