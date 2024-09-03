import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite/legacy';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const styles = require('../styles/stylesheet');

const db = SQLite.openDatabase('db.FCFapp_2')
const url = 'https://jokcatfs-pauarjalaguer.turso.io/';
const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ1MTcwNjYsImlkIjoiZjI3NmQ3NmUtMjA1My00ZmJhLWI2MTgtMGQyZGZkN2E3NDEzIn0.vGKIODWyeqUw-YY-XdW6jEUeRUSyFdevSdimkQ0bpIIghhEbrXsHUVdDMXUBWwCHFHYtBwWixlv_JqQVzuDoCQ";

export const LeaguesList = () => {
    const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName, leagueName) => {
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }
    let string = "";
    let itemsArray = [];
    let [items, setItems] = useState([]);
    let [leagues, setLeagues] = useState([]);
    let [reload, setReload] = useState(0);
    let [isLoading, setIsLoading] = useState(true);
    let [empty, setEmpty] = useState(1);
    const reloadPress = () => {
        setReload(Date.now());
    }
    function removeLastComma(str) {
        return str.replace(/,\s*$/, '');
      }
    const fetchLeaguesData = async (string) => {
      string=removeLastComma(string);
      console.log(string);
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
                            q: "select idGroup, groupName from groups where idGroup in(select distinct idGroup from  matches where (idLocal in("+string+")));"
                         
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
            console.log(data)
            setLeagues(data[0].results.rows);
            setIsLoading(false);
        } catch (error) {
            console.error('Error inserting or replacing match:', error);
        }
    }
    useEffect(() => {
        db.transaction((tx) => {
            console.log("Transaction");
            tx.executeSql("SELECT distinct idTeam FROM  activeTeams;", [], (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    setEmpty(1);
                }
                setItems(results.rows);

                results.rows._array.map((team) => {
                    string = string + team.idTeam + ",";
                })
                fetchLeaguesData(string);

            });
        })

    }, [reload])

    if (items._array) {
        itemsArray = Array.from(items._array)
    }
    if (items) {
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
                }}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#001fbc', fontSize: 16 }} />  Carregant dades</Text></View> : null}
                {leagues?.map(
                    n =>
                    (<TouchableOpacity key={n[0] + "_" + n[1] + "_" + n[1]}
                        onPress={() => {
                            handleLeaguePress(n[0], n[1], n[1])
                        }}>
                        <View style={styles.teamsLeagueListContainer}>
                            <View style={styles.teamsLeagueListContent}>

                                {n.isActive == 1 ?
                                    <Text style={styles.teamsLeagueListText}>  <FontAwesome5 name="futbol" style={{ color: '#41628b', fontSize: 12 }} /> {n[0]} {n[1]} </Text>
                                    :
                                    <Text style={styles.teamsLeagueListText}>  <FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 12 }} /> {n[1]} {n.groupName} </Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    )

                )
                }
            </>
        )
    }
}