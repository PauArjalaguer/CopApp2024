import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as SQLite from 'expo-sqlite/legacy';
const db = SQLite.openDatabase('db.FCFapp_2')
const styles = require('../styles/stylesheet');
export const TeamsList = () => {

  const url = 'https://jokcatfs-pauarjalaguer.turso.io/';
  const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ1MTcwNjYsImlkIjoiZjI3NmQ3NmUtMjA1My00ZmJhLWI2MTgtMGQyZGZkN2E3NDEzIn0.vGKIODWyeqUw-YY-XdW6jEUeRUSyFdevSdimkQ0bpIIghhEbrXsHUVdDMXUBWwCHFHYtBwWixlv_JqQVzuDoCQ";

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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statements: [
            {
              q: "select teamId as idTeam, teamName, teamAcronym from teams where idClub=1",
            }
          ]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response:', errorBody);
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setProcessedTeams([]);
      data[0].results.rows.map((m, index) => {      
        let isActive = 0;
        if (tString.search(m[0]) >= 0) {
          //console.log("index "+index+" : "+m[0] + " està a " + tString);
          isActive = 1;
        }
        setProcessedTeams(processedTeams => [...processedTeams, { 'idTeam': m[0], 'teamName': m[1], 'isActive': isActive }]);       
      })

      setIsLoading(false);
    } catch (error) {
      console.error('Error inserting or replacing match:', error);
    }

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
        {isLoading ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{
          borderRadius: 5, backgroundColor: '#fff', padding: 4, width: '99%', margin: 5, marginTop: 5, marginBottom: 5, elevation: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', padding: 10,
        }}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 16 }} /> Carregant dades.</Text></View> : null}
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
                    <Text style={styles.teamsListText}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 12 }} /> {n.teamName}  <Text style={{ textTransform: 'uppercase', color: '#828282', fontSize: 9 }}> </Text>
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
