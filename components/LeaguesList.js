import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite/legacy';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { http_query } from '../functions/http';
import { LoadingComponent } from './LoadingComponent';
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
    let [empty, setEmpty] = useState(1);
    const reloadPress = () => {
        setReload(Date.now());
    }
    function removeLastComma(str) {
        return str.replace(/,\s*$/, '');
    }
    const fetchLeaguesData = async (string) => {
        string = removeLastComma(string);
       // console.log(string);
        query = "https://clubolesapati.cat/API/apiLligues.php?app=1&idTeam="+string;
        params = [];
        let response = http_query(query, params).then((res) => { setLeagues(res); setIsLoading(false); });

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
                {isLoading ? <LoadingComponent loadText='Carregant dades' /> : null}
                {leagues?.map(
                    n =>
                    (<TouchableOpacity key={n['idLeague'] + "_" + n['leagueName'] + "_" + n['groupName']}
                        onPress={() => {
                            handleLeaguePress(n['idLeague'], n['leagueName'], n['groupName'])
                        }}>
                        <View style={styles.teamsLeagueListContainer}>
                            <View style={styles.teamsLeagueListContent}>

                                {n.isActive == 1 ?
                                    <Text style={styles.teamsLeagueListText}>  <FontAwesome5 name="skating" style={{ color: '#006e38', fontSize: 12 }} />  {n['leagueName']} {n['groupName']} </Text>
                                    :
                                    <Text style={styles.teamsLeagueListText}>  <FontAwesome5 name="skating" style={{ padding: 8, color: '#006e38', fontSize: 12 }} /> {n['leagueName']} {n['groupName']} </Text>
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