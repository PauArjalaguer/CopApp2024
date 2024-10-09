import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');
const goToMap = (address) => {

    const url = Platform.select({
        ios: `maps:0,0?q=${address}`,
        android: `geo:0,0?q=${address}`,
    })
    //console.log(url);
    Linking.openURL(encodeURI(url));
}
export const MatchesListItem = ({ matchId, matchLocal, matchVisitor, matchComplexName, matchComplexAddress, matchDate, matchHour, matchFixture, matchLocalImage, matchVisitorImage, matchIdLeague, matchLeagueName, matchGroupName, matchesLocalResult, matchesVisitorResult, matchesDistance, matchesTravelTime, matchesMeteo }) => {
    const windowWidth = Dimensions.get('window').width;

    let small;
    if (windowWidth < 479) {
        small = true;
    } else {
        small = false;
    }
    function split(string) {
        if (string) {
            let d = string.split('-');
            // return d[2] + "-" + d[1] + "-" + d[0];
            return d[0] + "-" + d[1];
        }
    }
    function splitHour(string) {
        if (string) {
            let d = string.split(':');
            return d[0] + ":" + d[1];
        }

    }

    function meteoIcon(meteoData) {
        if (meteoData) {
            let d = meteoData.split('|');
            return d[1].trim();
        }
    }
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



    const navigation = useNavigation();
    const handleLeaguePress = (idLeague, groupName = 'Grup', leagueName) => {
        console.log("LL" + idLeague)
        navigation.navigate('Leagues', { screen: 'LeagueScreen', params: { matchIdLeague: idLeague, matchGroupName: groupName, matchLeagueName: leagueName } });
    }

    return (
        <>
            <View style={styles.matchesListContainer}>
                <View style={styles.matchesListContent} >
                    <View style={{ fontFamily: 'Jost300Light', width: '100%', borderBottomWidth: 1, paddingBottom: 3, color: '#aaa', borderColor: '#aaa', marginBottom: 3 }}
                    ><TouchableOpacity onPress={() => { handleLeaguePress(matchIdLeague, matchLeagueName, matchGroupName) }}>
                            <Text style={{ width: '100%', fontFamily: 'Jost700Bold', color: '#006e38', textAlign: 'left', textTransform: 'capitalize', fontSize:14 }}>{matchLeagueName} {matchGroupName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '75%',  }}>
                            <View style={{ padding: 2 }}>
                                <Text style={styles.matchesListTeam}><Image source={{ uri: matchLocalImage }} style={styles.matchesListLogo} /> {small ? matchLocal.substring(0, 35) : matchLocal}</Text>
                            </View>
                            <View style={{ padding: 2 }}>
                                <Text style={styles.matchesListTeam}><Image source={{ uri: matchVisitorImage }} style={styles.matchesListLogo} /> {small ? matchVisitor.substring(0, 35) : matchVisitor}</Text>
                            </View>
                        </View>
                        <View style={{ width: '25%', borderLeftWidth: 0, borderLeftColor: '#eee', }}>
                            {matchesDistance != 0 ?
                                <><Image style={{ height: 24, width: 24, alignSelf: 'flex-end', marginRight: 3, fontSize:16 }} source={{ uri: meteoIcon(matchesMeteo) }} />
                                    <Text style={{ fontSize: 12.5, color: '#828282', fontFamily: 'Jost300Light', alignSelf: 'flex-end', textAlign: 'right', paddingTop: 5 }}>
                                        {matchesDistance} km - {convertirSegons(matchesTravelTime)}</Text></>
                                :
                                <Image style={{ height: 32, width: 32, alignSelf: 'flex-end', marginRight: 3, marginTop: 10 }} source={{ uri: meteoIcon(matchesMeteo) }} />
                            }
                        </View>
                    </View>
                    <View style={styles.matchesListInfoContainer}>
                        <View style={styles.matchesListInfoContent}>
                            <TouchableOpacity onPress={() => goToMap(matchComplexAddress)}>
                                <View style={{ flex: 2, flexDirection: 'row' }}>
                                    <Text style={styles.matchesListComplexName}>{matchComplexName}</Text>
                                    <Text style={styles.matchesListComplexDate}>
                                        {split(matchDate)} {splitHour(matchHour)}
                                    </Text>
                                </View>
                                {/*   <Text style={styles.matchesListComplexAddress}>{matchComplexAddress}</Text> */}
                            </TouchableOpacity>

                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
