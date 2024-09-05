import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { NewsListItem } from './NewsListItem'
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite/legacy';
import { http_query } from '../functions/http';
const styles = require('../styles/stylesheet');
const goToMap = (address) => {
    const url = Platform.select({
        ios: `maps:0,0?q=${address}`,
        android: `geo:0,0?q=${address}`,
    })
    Linking.openURL(encodeURI(url))
}
export const HomeList = () => {
    const db = SQLite.openDatabase('db.FCFapp')
    const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName, leagueName) => {
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }

    const handleTeamPress = (teamId, teamName) => {
        if (teamName.includes('COP')) {
            navigation.navigate('Teams', { screen: 'TeamScreen', params: { teamId: teamId, teamName: teamName } });
        }
    }
    function split(string) {
        if (string) {
            let d = string.split('-');
            return d[0] + "-" + d[1];
        }
    }


    function splitHour(string) {
        if (string) {
            let d = string.split(':');
            return d[0] + ":" + d[1];
        }

    }
    let string = '';
    let [news, setNews] = useState([]);
    const [nextMatch, setNextMatch] = useState([]);
    let [items, setItems] = useState([]);
    let [teamString, setTeamString] = useState('');
    let [reload, setReload] = useState(0);
    let [empty, setEmpty] = useState(1);

    const [totalDuration, setTotalDuration] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    function convertirSegons(segons) {
        if (segons < 3600) {
            // Menys d'una hora, convertir a minuts
            const minuts = Math.floor(segons / 60);
            const segRestants = segons % 60;
            return minuts + " min";
        } else {
            // Una hora o més, convertir a hores i minuts
            const hores = Math.floor(segons / 3600);
            const minuts = Math.floor((segons % 3600) / 60);
            const segRestants = segons % 60;
            return hores + "h " + minuts + "m";
        }
    }
    function meteoIcon(meteoData) {
        if (meteoData) {
            let d = meteoData.split('|');
            return d[1].trim();
        }
    }
    let tString = '999';
    function removeLastComma(str) {
        return str.replace(/,\s*$/, '');
    }
    const fetchMatchesData = string => {
        string = removeLastComma(string);
        if (string.length > 1) {
            query = "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates from matches m join groups g on g.idGroup=m.idGroup where idLocal in (" + string + ") or idVisitor in (" + string + ")  limit 0,1";
        } else {
            query = "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates from matches m join groups g on g.idGroup=m.idGroup   limit 0,1";
        }
       //  query = "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates from matches m join groups g on g.idGroup=m.idGroup   limit 0,1";

        console.log(query);
        params = [];
        let response = http_query(query, params).then((res) => { setNextMatch(res[0].results.rows); });


    }
    const fetchNewsData = () => {
        query = "select id, title, subtitle,content, pathimage, insertdate from news limit 0,3";
        params = [];
        let response = http_query(query, params).then((res) => { setNews(res[0].results.rows); });
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
                fetchMatchesData(string);
            });
        })
        fetchNewsData();
    }, [reload]);

    if (news[0]) {
        return (
            <>
                {nextMatch[0] ?
                    <>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Proper partit</Text>
                        </View>

                        <View style={{ borderColor: '#aaa', borderWidth: 1, backgroundColor: '#fff', marginBottom: 6, borderBottomLeftRadius:4, borderBottomRightRadius:4}}>
                            <Text style={styles.homeScreenLeagueName}>{nextMatch[0].leagueName} {nextMatch[0][9]}</Text>
                            <View style={styles.homeScreenMatchTeamsRow}>
                                <View style={styles.homeScreenMatchTeam}>
                                    <Image source={{ uri: nextMatch[0][7] }} style={[styles.homeScreenMatchTeamImage]} />
                                    <Text style={[styles.homeScreenMatchTeamName]}>{nextMatch[0].truncatedLocal ? nextMatch[0].truncatedLocal : nextMatch[0][1]}</Text>
                                </View>
                                <View style={[styles.homeScreenMatchTeam, styles.homeScreenMatchTeamBorder]}>
                                    <Image source={{ uri: nextMatch[0][8] }} style={[styles.homeScreenMatchTeamImage]} />
                                    <Text style={[styles.homeScreenMatchTeamName]}>{nextMatch[0].truncatedVisitor ? nextMatch[0].truncatedVisitor : nextMatch[0][2]}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => goToMap(nextMatch[0].complexAddress)} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.homeScreenMatchComplexName}>{nextMatch[0][3]}</Text>
                                    <Text style={styles.homeScreenMatchDate}>{split(nextMatch[0][4]) + " " + splitHour(nextMatch[0][5])}</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={styles.homeScreenMatchComplexAddress}>{nextMatch[0].complexAddress}</Text>

                                    {nextMatch[0].distance != 0 ?
                                        <><Image style={{ height: 14, width: 14, marginRight: 3 }} source={{ uri: meteoIcon(nextMatch[0].meteo) }} />
                                            <Text style={{ fontSize: 11, color: '#929292', fontFamily: 'Jost300Light', textAlign: 'right', paddingRight: 15 }}>
                                                {nextMatch[0][13]} km | {convertirSegons(nextMatch[0][14])}</Text></>
                                        :
                                        <Image style={{ height: 16, width: 16, marginRight: 13, }} source={{ uri: meteoIcon(nextMatch[0][15]) }} />
                                    }
                                </View>
                            </View>

                        </View>
                    </> : null
                }

                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>Notícies</Text>
                </View>

                {news.map(
                    n => (
                        <NewsListItem id={n[0]} title={n[1]} subtitle={n[2]} image={n[4]} text={n[3]} date={n[5]}
                            key={n[0]}
                        ></NewsListItem>
                    )
                )
                }

            </>
        )
    }
}