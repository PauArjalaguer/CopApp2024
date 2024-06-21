import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');
const goToMap = (address) => {
    const url = Platform.select({
        ios: `maps:0,0?q=${address}`,
        android: `geo:0,0?q=${address}`,
    })
    Linking.openURL(encodeURI(url))
}

function splitHour(string) {
    if (string) {
        let d = string.split(':');
        return d[0] + ":" + d[1];
    }

}
function split(string) {
    let d = string.split('-');
    return d[2] + "-" + d[1];
}


export const LeagueScreenListItems = ({ matchId, matchLocal, matchVisitor, matchComplexName, matchComplexAddress, matchDate, matchHour, matchFixture, matchLocalImage, matchVisitorImage, matchIdLeague, matchLeagueName, matchGroupName, matchLocalResult, matchVisitorResult, matchesDistance, matchesTravelTime, matchesMeteo }) => {
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    let small;
    if (windowWidth < 479) {
        small = true;
    } else {
        small = false;
    }
    if (matchLocal.includes('COP') || matchVisitor.includes('COP')) {
        return (
            <>
                <View style={styles.matchesListContainer} key={matchId}>
                    <View style={styles.matchesListContentOlesa}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '85%' }}>
                                <View style={{ padding: 2 }}>
                                    <Text style={styles.matchesListTeam}><Image source={{ uri: matchLocalImage }} style={styles.matchesListLogo} /> {small ? matchLocal.substring(0, 35) : matchLocal}</Text>
                                </View>
                                <View style={{ padding: 2 }}>
                                    <Text style={styles.matchesListTeam}><Image source={{ uri: matchVisitorImage }} style={styles.matchesListLogo} /> {small ? matchVisitor.substring(0, 35) : matchVisitor}</Text>
                                </View>

                            </View>
                            <View style={matchLocalResult ? styles.matchesListResultsColumn : styles.matchesListResultsColumnEmpty}>
                                <View>
                                    <Text style={styles.matchesListResult}>{matchLocalResult}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.matchesListResult}>{matchVisitorResult}</Text>
                                </View>
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
                                    <Text style={styles.matchesListComplexAddress}>{matchComplexAddress}</Text>
                                </TouchableOpacity>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {/*   <Image style={{ height: 16, width: 16, alignSelf: 'flex-end', marginRight: 3 }} source={{ uri: meteoIcon(matchesMeteo) }} />
                                {matchesDistance != 0 ?
                                    <Text style={{ fontSize: 12, color: '#929292', fontFamily: 'Jost300Light' }}>
                                        Distancia : {matchesDistance} km |  {matchesTravelTime} : </Text>
                                    :
                                    ''
                                } */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    } else {
        if (matchLocalResult) {
            return (
                <>
                    <View style={styles.matchesListContainer}>
                        <View style={styles.matchesListContent}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '86%', paddingLeft: 0 }}>
                                    <View style={{ padding: 5 }}>
                                        <Text style={styles.matchesListTeam}><Image source={{ uri: matchLocalImage }} style={styles.matchesListLogo} /> {small ? matchLocal.toLowerCase().substring(0, 35) : matchLocal.toLowerCase()}</Text>
                                    </View>
                                    <View style={{ padding: 5 }}>
                                        <Text style={styles.matchesListTeam}><Image source={{ uri: matchVisitorImage }} style={styles.matchesListLogo} /> {small ? matchVisitor.toLowerCase().substring(0, 35) : matchVisitor.toLowerCase()}</Text>
                                    </View>
                                </View>
                                <View style={styles.matchesListResultsColumn}>
                                    <View>
                                        <Text style={styles.matchesListResult}>{matchLocalResult}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.matchesListResult}>{matchVisitorResult}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </>
            )
        }
    }
}

