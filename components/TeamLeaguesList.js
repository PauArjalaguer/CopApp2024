import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { http_query } from '../functions/http';

const styles = require('../styles/stylesheet');
export const TeamLeaguesList = ({ idTeam, teamName }) => {
      const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName, leagueName) => {
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }
    let itemsArray = [];
    let [items, setItems] = useState([]);
    let [isLoading, setIsLoading] = useState(1);
    let [reload, setReload] = useState(0);
    const fetchLeaguesData = async () => {
        console.log("-" + idTeam);
        query = "https://clubolesapati.cat/API/apiLligues.php?top=1&idTeam=" + idTeam;

        params = [];
        let response = http_query(query, params).then((res) => { setItems(res); });
       
    }
    useEffect(() => {
        fetchLeaguesData();

    }, [reload])

    if (items) {

        return (
            <>
                {items.map(
                    n => (
                        <TouchableOpacity key={n['idLeague'] + "_" + n['leagueName']}
                            onPress={() => {
                                handleLeaguePress(n['idLeague'], n.groupName, n.leagueName)
                            }}>
                            <View style={styles.teamsLeagueListContainer}>
                                <View style={styles.teamsLeagueListContent}>
                                    <Text style={styles.teamsLeagueListText}> {n['leagueName']} {n['groupName']}</Text>
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
