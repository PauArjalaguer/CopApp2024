import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { http_query } from '../functions/http';
import * as SQLite from 'expo-sqlite/legacy';
import { LoadingComponent } from './LoadingComponent';
const db = SQLite.openDatabase('db.FCFapp')
const styles = require('../styles/stylesheet');
export const TeamsList = () => {

  const navigation = useNavigation();
  const handleTeamPress = (idTeam, teamName, link) => {

    navigation.navigate('TeamScreen', { idTeam: idTeam, teamName: teamName, teamLink: link });
  }
  const reloadPress = () => {
    setReload(Date.now());
  }
  const changeTeamStatusTeamPress = (idTeam, isActive) => {
    setProcessedTeams([]);
    if (isActive == 1) { isActive = 0 } else { isActive = 1 }

    db.transaction((tx) => {
      if (isActive == 1) {
        tx.executeSql(`insert into activeTeams (idTeam) values ('${idTeam}')`, null, console.log(`insert into activeTeams (idTeam) values ('${idTeam}')`));
      } else {
        tx.executeSql(`delete from  activeTeams where idTeam = '${idTeam}'`, null, console.log(`delete from  activeTeams where idTeam = '${idTeam}'`));
      }
      setReload(Date.now())
    })
  }


  let [processedTeams, setProcessedTeams] = useState([]);
  let [reload, setReload] = useState(0);
  let [isLoading, setIsLoading] = useState(true);

  const sqliteData = async () => {
    const result = "";
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT distinct idTeam FROM activeTeams ;", [], (tx, results) => {
          resolve(results.rows._array);
          setReload(1);
        });
      })
    })
  }

  const axiosCallback = async (tString) => {
    query = "https://clubolesapati.cat/API/apiEquips.php?tString=s"+tString;

    params = [];
    let response = http_query(query, params).then((res) => {
      setProcessedTeams([]);
     
      res.map((m, index) => {
        let isActive = 0;
        if (tString.search(m[0]) >= 0) {          
          isActive = 1;
        }
        setProcessedTeams(processedTeams => [...processedTeams, { 'idTeam': m['teamId'], 'teamName': m['teamName'], 'isActive': m['isActive'] }]);
      })
     
      setIsLoading(false);
    });


  }
  useEffect(() => {
    setProcessedTeams([]);
    const sqliteDataA = sqliteData().then((d) => {
      let tString = "";
      d.map((tA) => {
        tString += tA.idTeam + ";";
      })
      axiosCallback(tString);
    });


  }, [reload])


  if (processedTeams) {
    return (
      <>
        {isLoading ? <LoadingComponent /> : null}
        {processedTeams?.map(
          n => (
            <View style={styles.teamsListContainer} key={n.idTeam}>
              <View style={styles.teamsListContent}>
                <TouchableOpacity
                  style={{ flex: 3 }}
                  onPress={() => {
                    handleTeamPress(n.idTeam, n.teamName, n.link)
                  }}>
                  <View >
                    <Text style={styles.teamsListText}><FontAwesome5 name="skating" style={{ padding: 8, color: '#006e38', fontSize: 12 }} /> {n.teamName}  <Text style={{ textTransform: 'uppercase', color: '#828282', fontSize: 9 }}> </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ flex: 4 }}
                    onPress={() => {
                      changeTeamStatusTeamPress(n.idTeam, n.isActive)
                    }}>
                    <FontAwesome5 name={n.isActive == 1 ? 'toggle-on' : 'toggle-off'} size={20} color='#006e38' style={{ padding: 0 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          )
        )
        }
        <View style={{ padding: 20 }}><Text style={{ color: '#fff' }}>...</Text></View>
      </>
    )
  } else {
    return (
     <LoadingComponent />
    )
  }
}
