import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.COPapp2')
const styles = require('../styles/stylesheet');
export const TeamsList = () => {

  // returns Database object  
  const navigation = useNavigation();
  const handleTeamPress = (teamId, teamName) => {
    console.log(teamId, teamName);
    navigation.navigate('TeamScreen', { teamId: teamId, teamName: teamName });

  }
  const reloadPress = () => {
    setReload(Date.now());
  }
  const changeTeamStatusTeamPress = (teamId, isActive) => {
    if (isActive == 1) { isActive = 0 } else { isActive = 1 }
   
    db.transaction((tx) => {
      if (isActive == 1) {
        tx.executeSql(`insert into activeTeams (teamId) values (${teamId})`, null, console.log(`insert into activeTeams (teamId) values (${teamId})`));
      } else {
        tx.executeSql(`delete from  activeTeams where teamId = ${teamId}`, null, console.log(`delete from  activeTeams where teamId = ${teamId}`));

      }
    
      setReload(Date.now())
    })
  }

  let [teams, setTeams] = useState([]);

  let [reload, setReload] = useState(0);
  const sqliteData = async () => {

    const result = "";
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT distinct teamId FROM  activeTeams ;", [], (tx, results) => {
        
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
      url: `http://clubolesapati.cat/API/apiEquips.php?tString=s` + tString,
    })
      .then(response => {
        return response.data;
      })
      .then(data => {
        setTeams(data);
      
      })
  }
  useEffect(() => {
    const sqliteDataA = sqliteData().then((d) => {
      let tString = "";
      d.map((tA) => {
        tString += tA.teamId + ";";        
      })
      console.log(tString);
      axiosCallback(tString);
    });


  }, [reload])


  if (teams) {
    return (

      <>
      {/*   <TouchableOpacity style={{ flex: 3 }}
          onPress={() => { reloadPress() }}>
          <Text>Reload</Text>
        </TouchableOpacity> */}
        {teams?.map(
          n => (
            <View style={styles.teamsListContainer} key={n.teamId}>
              <View style={styles.teamsListContent}>
                <TouchableOpacity
                  style={{ flex: 3 }}
                  onPress={() => {
                    handleTeamPress(n.teamId, n.teamName)
                  }}>
                  <View >
                    <Text style={styles.teamsListText}>

                      {n.teamName}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ flex: 4 }}
                    onPress={() => {
                      changeTeamStatusTeamPress(n.teamId, n.isActive)
                    }}>
                 
                    <FontAwesome5 name={n.isActive == 1 ? 'toggle-on' : 'toggle-off'} size={20} color='#296b29' style={{ padding: 0 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

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
