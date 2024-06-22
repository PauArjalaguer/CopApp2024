import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const styles = require('../styles/stylesheet');

const db = SQLite.openDatabase('db.FCFapp')
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
    const reloadPress = () => {
        setReload(Date.now());
    }
    const fetchLeaguesData = () => {
        // console.log("Fetch news");
        fetch("http://clubolesapati.cat/API/apiLligues.php")
            .then(response => {
                return response.json()
            })
            .then(data => {
            
                setItems(data);

            })
    }
    useEffect(() => {
        db.transaction((tx) => {
            console.log("Transaction");
            tx.executeSql("SELECT distinct idTeam FROM  activeTeams;", [], (tx, results) => {
                var len = results.rows.length;
                setItems(results.rows);
                console.log(results.rows);
                results.rows._array.map((team) => {
                    string = string + team.idTeam + ",";
                })
                console.log("After map:" + string)
                fetch("http://jok.cat/API/leaguesSearchByIdTeams.php?url=lligues_masquefa.json&teams=" + string)
                    .then(response => {                     
                        return response.json()
                    })
                    .then(data => {
                        setIsLoading(false);
                        setLeagues(data);


                    })
            });
        })

    }, [reload])

    if (items._array) {
        itemsArray = Array.from(items._array)
    }
    if (leagues) {
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
                    (<TouchableOpacity key={n.leagueName + "_" + n.groupName + "_" + n.idLeague}
                        onPress={() => {
                            handleLeaguePress(n.idLeague, n.groupName, n.leagueName)
                        }}>
                        <View style={styles.teamsLeagueListContainer}>
                            <View style={styles.teamsLeagueListContent}>
                          
                                {n.isActive == 1 ?
                                    <Text style={styles.teamsLeagueListText}>  <FontAwesome5 name="futbol" style={{  color: '#41628b', fontSize: 12 }} /> {n.leagueName} {n.groupName} </Text>
                                    :
                                    <Text style={styles.teamsLeagueListTextInactive}>  <FontAwesome5 name="futbol" style={{  padding:8,color: '#41628b', fontSize: 12 }} /> {n.leagueName} {n.groupName} </Text>
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