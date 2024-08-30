import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');
export const TeamLeaguesList = ({ teamId, teamName }) => {
    const url = 'https://jokcatfs-pauarjalaguer.turso.io/';
    const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ1MTcwNjYsImlkIjoiZjI3NmQ3NmUtMjA1My00ZmJhLWI2MTgtMGQyZGZkN2E3NDEzIn0.vGKIODWyeqUw-YY-XdW6jEUeRUSyFdevSdimkQ0bpIIghhEbrXsHUVdDMXUBWwCHFHYtBwWixlv_JqQVzuDoCQ";

    const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName, leagueName) => {
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }
    let itemsArray = [];
    let [items, setItems] = useState([]);
    let [isLoading, setIsLoading] = useState(1);
    let [reload, setReload] = useState(0);
    const fetchLeaguesData = async () => {
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
                            q: "select idGroup, groupName from groups where idGroup in(select distinct idGroup from  matches where (idLocal =527))",
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
            setItems(data[0].results.rows);

            setIsLoading(false);
        } catch (error) {
            console.error('Error inserting or replacing match:', error);
        }
    }
    useEffect(() => {
        fetchLeaguesData();

    }, [reload])

    if (items) {

        return (
            <>
                {items.map(
                    n => (
                        <TouchableOpacity key={n[0] + "_" + n[1]}
                            onPress={() => {
                                handleLeaguePress(n[0], n.groupName, n.leagueName)
                            }}>
                            <View style={styles.teamsLeagueListContainer}>
                                <View style={styles.teamsLeagueListContent}>
                                    <Text style={styles.teamsLeagueListText}> {n[1]}</Text>
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
