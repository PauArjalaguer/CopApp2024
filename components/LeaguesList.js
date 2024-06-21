import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');

const db = SQLite.openDatabase('db.COPapp2')
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
                console.log(items);

            })
    }
    useEffect(() => {
        db.transaction((tx) => {
            console.log("Transaction");
            tx.executeSql("SELECT distinct teamId FROM  activeTeams;", [], (tx, results) => {
                var len = results.rows.length;
                setItems(results.rows);
                console.log(results.rows);
                results.rows._array.map((team) => {
                    string = string + team.teamId + ",";
                })
                console.log("After map:" + string)
                fetch("http://clubolesapati.cat/API/apiLligues.php?idTeam=" + string)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
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
              {/*   <TouchableOpacity style={{ flex: 3 }}
                    onPress={() => { reloadPress() }}>
                    <Text>Reload</Text>
                </TouchableOpacity> */}
                {leagues?.map(
                    n =>
                    (<TouchableOpacity key={n.leagueName + "_" + n.groupName + "_" + n.idLeague}
                        onPress={() => {
                            handleLeaguePress(n.idLeague, n.groupName, n.leagueName)
                        }}>
                        <View style={styles.teamsLeagueListContainer}>
                            <View style={styles.teamsLeagueListContent}>

                                {n.isActive == 1 ?
                                    <Text style={styles.teamsLeagueListText}> {n.leagueName} {n.groupName} </Text>
                                    :
                                    <Text style={styles.teamsLeagueListTextInactive}>{n.leagueName} {n.groupName} </Text>
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