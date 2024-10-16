import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, Platform } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MatchContext } from '../context/MatchContext';
const goToMap = (address) => {

    const url = Platform.select({
        ios: `maps:0,0?q=${address}`,
        android: `geo:0,0?q=${address}`,
    })
    //console.log(url);
    Linking.openURL(encodeURI(url));
}


function splitHour(string) {
    if (string) {
        let d = string.split(':');
        return d[0] + ":" + d[1];
    }

}
function split(string) {
    let d = string.split('-');
    return d[2] + "-" + d[1] + "-" + d[0];
}
function meteoIcon(meteoData) {
    if (meteoData) {
        let d = meteoData.split('|');
        return d[1].trim();
    }
}
function minutesToHour(totalSeconds) {
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    if (hours < 1) {
        return minutes + " minuts";
    } else { return hours + ":" + minutes; }
    // 

}

export const LeagueScreenListItems = ({ matchId, matchLocal, matchVisitor, matchComplexName, matchComplexAddress, matchDate, matchHour, matchFixture, matchLocalImage, matchVisitorImage, matchIdLeague, matchLeagueName, matchGroupName, matchLocalResult, matchVisitorResult, matchesDistance, matchesTravelTime, matchMeteo, showFixture, key }) => {
    const [state, setState] = useContext(MatchContext);

    let [visibleMatch, setVisibleMatch] = useState("a");
    useEffect(() => {
        //fetchClassificationData();
        //fetchMatchesData();
    }, [visibleMatch]);
    const handleMatchPress = (position) => {
        setVisibleMatch(position);
    }
    const navigation = useNavigation();

    const idRound = useRef("");
    idRound.current = "Jornada 0";

    const windowWidth = Dimensions.get('window').width;
    let small;
    if (windowWidth < 479) {
        small = true;
    } else {
        small = false;
    }

    return (
        <View key={matchId}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, backgroundColor: '#006e38', alignItems: 'left', padding: 6, justifyContent: 'center', borderColor: '#aca', display: showFixture ? 'flex' : 'none' }} >
                <View style={{ flex: 6, }}>
                    <Text style={{ color: '#ffffff', fontFamily: 'Jost700Bold', fontWeight: 'bold', }}>Jornada {matchFixture}</Text>
                </View>
                <View style={{ flex: 6, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#ffffff', fontFamily: 'Jost700Bold', fontWeight: 'bold', }}> {split(matchDate)}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                setState(state => ({ ...state, name: matchLocal + matchVisitor }))

            }}>
                <View style={{ flexDirection: 'row', borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#ccc', borderBottomWidth: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', flexDirection: 'row', }}>
                        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}><Text style={styles.matchesListTeam}><Image source={{ uri: matchLocalImage }} style={styles.matchesListLogo} /></Text></View>
                        <View style={{ flex: 6, justifyContent: 'center', backgroundColor: '#fff' }}><Text style={styles.matchesListTeam}>{matchLocal.toLowerCase().substring(0, 17)}</Text></View>
                        <View style={{
                            flex: 2, borderRadius: 150, backgroundColor: '#006e38', alignItems: 'center', padding: 3, justifyContent: 'center', elevation: 3, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}><Text style={{ fontFamily: 'Jost700Bold', fontWeight: 'bold', color: '#fff' }}>{matchLocalResult} - {matchVisitorResult}</Text></View>
                        <View style={{ flex: 6, alignItems: 'flex-end' }}><Text style={styles.matchesListTeam}>{matchVisitor.toLowerCase().substring(0, 17)}</Text></View>

                        <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.matchesListTeam}><Image source={{ uri: matchVisitorImage }} style={styles.matchesListLogo} /></Text></View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <FontAwesome5 name="angle-double-down" style={{ color: '#006e38', fontSize: 16, display: state.name == matchLocal + matchVisitor ? 'none' : 'flex' }} />
                            <FontAwesome5 name="angle-double-up" style={{ paddingTop: 0, color: '#00a856', fontSize: 16, display: state.name == matchLocal + matchVisitor ? 'flex' : 'none' }} />

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#ccc', backgroundColor: '#fafafa', padding: 6, display: state.name == matchLocal + matchVisitor ? 'flex' : 'none' }}>
                <View style={{ flex: 8 }}>
                    <TouchableOpacity onPress={() => goToMap(matchComplexAddress)}>
                        <Text style={{ fontFamily: 'Jost500Medium', fontSize: 11, color: '#424242', textTransform: 'capitalize' }}>{matchComplexName.toLowerCase()}</Text>
                        {/* <Text style={{ fontFamily: 'Jost500Medium', fontSize: 11}}>{matchComplexAddress}</Text> */}
                        <Text style={{ fontFamily: 'Jost500Medium', fontSize: 11, color: '#626262', textAlign: 'left', width: '100%' }}>{matchesDistance} km | {minutesToHour(matchesTravelTime)} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4, alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Jost500Medium', fontSize: 11, color: '#626262' }}>{split(matchDate)} {matchHour} <Image style={{ height: 14, width: 14, alignSelf: 'flex-end', marginRight: 0, marginTop: -2 }} source={{ uri: meteoIcon(matchMeteo) }} /></Text>
                </View>
            </View>
        </View>


    )
}

