import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native'
const styles = require('../styles/stylesheet');
const goToMap = (address) => {
    const url = Platform.select({
        ios: `maps:0,0?q=${address}`,
        android: `geo:0,0?q=${address}`,
    })
    Linking.openURL(url)
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
function meteoIcon(meteoData) {
    if (meteoData) {
        let d = meteoData.split('|');
       
        return d[1].trim();
    }
}
export const TeamNextMatch = ({ teamId, teamName }) => {

    const [nextMatch, setNextMatch] = useState([]);

    const [totalDuration, setTotalDuration] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    let [reload, setReload] = useState(0);
    const reloadPress = () => {
        setReload(Date.now());
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
    const fetchMatchesData = () => {       
        fetch("http://clubolesapati.cat/API/apiPropersPartits.php?top=1&idTeam=" + teamId)
            .then(response => {
                //console.log(response)
                return response.json()
            })
            .then(data => {
                setNextMatch(data);
                //console.log(data);
            })
    }
    useEffect(() => {
        fetchMatchesData();

    }, [reload])
    /*  return (<TouchableOpacity style={{ flex: 3, fontSize: 48 }}
         onPress={() => { reloadPress() }}>
         <Text style={{ fontSize: 48 }}>Reload</Text>
     </TouchableOpacity>)  */
    if (nextMatch[0]) {
        return (
            <View style={{ borderColor: '#ddd', borderWidth: 1 }}>
                <Text style={styles.homeScreenLeagueName}>{nextMatch[0].leagueName} {nextMatch[0].groupName}</Text>
                <View style={styles.homeScreenMatchTeamsRow}>
                    <View style={styles.homeScreenMatchTeam}>
                        <Image source={{ uri: nextMatch[0].localImage }} style={[styles.homeScreenMatchTeamImage]} />
                        <Text style={[styles.homeScreenMatchTeamName]}>{nextMatch[0].truncatedLocal ? nextMatch[0].truncatedLocal : nextMatch[0].local}</Text>
                    </View>
                    <View style={[styles.homeScreenMatchTeam, styles.homeScreenMatchTeamBorder]}>
                        <Image source={{ uri: nextMatch[0].visitorImage }} style={[styles.homeScreenMatchTeamImage]} />
                        <Text style={[styles.homeScreenMatchTeamName]}>{nextMatch[0].truncatedVisitor ? nextMatch[0].truncatedVisitor : nextMatch[0].visitor }</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => goToMap(nextMatch[0].complexAddress)} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.homeScreenMatchComplexName}>{nextMatch[0].complexName}</Text>
                        <Text style={styles.homeScreenMatchDate}>{split(nextMatch[0].matchDate) + " " + splitHour(nextMatch[0].matchHour)}</Text>
                    </TouchableOpacity>
                    <View style={{flex:1,  flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={styles.homeScreenMatchComplexAddress}>{nextMatch[0].complexAddress}</Text>
                      
                        {nextMatch[0].distance != 0 ?
                            <><Image style={{ height: 14, width: 14,  marginRight: 3 }} source={{ uri: meteoIcon(nextMatch[0].meteo) }} />
                                <Text style={{ fontSize: 11, color: '#929292', fontFamily: 'Jost300Light',  textAlign: 'right', paddingRight:15 }}>
                                    {nextMatch[0].distance} km | {convertirSegons(nextMatch[0].travelTime)}</Text></>
                            :
                            <Image style={{ height: 16, width: 16,marginRight:13 }} source={{ uri: meteoIcon(nextMatch[0].meteo) }} />
                        }
                    </View>
                </View>
              
            </View>

        )
    } else {
        return (
            <View style={{ borderColor: '#ddd', borderWidth: 1 }}>
                <Text style={{ padding: 10, fontFamily: 'Jost700Bold', elevation: 3, fontSize: 18, textAlign: 'center', marginTop: 20, color: '#242424', }}>No hi ha partits previstos per aquest equip.</Text>
            </View>)
    }
}
