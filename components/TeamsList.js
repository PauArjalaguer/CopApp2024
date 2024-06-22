import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.FCFapp')
const styles = require('../styles/stylesheet');
export const TeamsList = () => {


  const navigation = useNavigation();
  const handleTeamPress = (idTeam, teamName) => {
    navigation.navigate('TeamScreen', { idTeam: idTeam, teamName: teamName });
  }
  const reloadPress = () => {
    setReload(Date.now());
  }
  const changeTeamStatusTeamPress = (idTeam, isActive) => {
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

  let [teams, setTeams] = useState([]);
  let [reload, setReload] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  const sqliteData = async () => {

    const result = "";
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT distinct idTeam FROM  activeTeams ;", [], (tx, results) => {

          var len = results.rows.length;

          resolve(results.rows._array);
        });

      })
    })
  }
  const axiosCallback = (tString) => {
    let arrayTeams = [];
    console.log("\n\n axiosCallback \n\n")
    axios({
      method: 'get',
      url: `http://jok.cat/API/clubUrlToJson.php?url=https://www.fcf.cat/club/2324/espardenya-masquefa-fs&tString=s` + tString,
    })
      .then(response => {
        return response.data;
      })
      .then(data => {
        setTeams(data);
        setIsLoading(false);

      })
  }
  useEffect(() => {
    const sqliteDataA = sqliteData().then((d) => {
      let tString = "";
      d.map((tA) => {
        tString += tA.idTeam + ";";
      })

      axiosCallback(tString);
    });


  }, [reload])


  if (teams) {
    return (
      <>
        {isLoading ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{
          borderRadius: 5, backgroundColor: '#fff', padding: 4, width: '99%', margin: 5, marginTop: 5, marginBottom: 5, elevation: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', padding: 10,
        }}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 16 }} /> Carregant dades</Text></View> : null}
        {teams?.map(
          n => (
            <View style={styles.teamsListContainer} key={n.idTeam}>
              <View style={styles.teamsListContent}>
                <TouchableOpacity
                  style={{ flex: 3 }}
                  onPress={() => {
                    handleTeamPress(n.idTeam, n.teamName)
                  }}>
                  <View >
                    <Text style={styles.teamsListText}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 12 }} /> {n.teamName} <Text style={{ textTransform: 'uppercase', color: '#828282', fontSize: 9 }}> {n.category}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ flex: 4 }}
                    onPress={() => {
                      changeTeamStatusTeamPress(n.idTeam, n.isActive)
                    }}>
                    <FontAwesome5 name={n.isActive == 1 ? 'toggle-on' : 'toggle-off'} size={20} color='#41628b' style={{ padding: 0 }} />
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
      <View>
        <Text style={{ padding: 9, fontFamily: 'GalanoGrotesqueBold', }}>Carregant dades</Text>
      </View>
    )
  }
}
