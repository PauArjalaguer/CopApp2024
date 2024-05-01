import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');
export const TeamLeaguesList = ({ teamId, teamName }) => {
    const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName, leagueName) => {
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }
    let itemsArray = [];
    let [items, setItems] = useState([]);
    let [reload, setReload] = useState(0);
    const fetchLeaguesData = () => {       
        fetch("http://clubolesapati.cat/API/apiLligues.php?top=1&idTeam=" + teamId)
            .then(response => {
                //console.log(response)
                return response.json()
            })
            .then(data => {
                setItems(data);
                console.log(data);
            })
    }
    useEffect(() => {
        fetchLeaguesData();

    }, [reload])
   
    if (items) {
        return (
            <>
                {items.map(
                    n => (
                        <TouchableOpacity key={n.leagueName + "_" + n.groupName}
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
