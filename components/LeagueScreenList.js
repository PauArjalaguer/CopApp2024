import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
const styles = require('../styles/stylesheet');
import { LeagueScreenListItems } from './LeagueScreenListItems'
import * as SQLite from 'expo-sqlite';
export const LeagueScreenList = ({ matchIdLeague, matchGroupName }) => {
    // console.log("LeagueScreenList: " + matchIdLeague);

    //let items = [{}];
    /* if (Network.getIpAddressAsync()) {
      const ufm = useFetchMatches();
      items = ufm.data;
     // console.log(items)
    } */
    let matchesArray, classificationArray = [];
    let [matches, setMatches] = useState([]);
    let [classification, setClassification] = useState([]);

    let [reload, setReload] = useState(0);
    const fetchClassificationData = () => {
       // fetch("http://clubolesapati.cat/API/apiClassificacionsPerId.php?top=1&idLeague=" + matchIdLeague)
       fetch("http://jok.cat/API/classificationUrlToJson.php?url=https://www.fcf.cat/classificacio/2324/futbol-sala/lliga-segona-divisio-infantil-futbol-sala/bcn-gr-6")
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                setClassification(data);
                // console.log(data);
            })
    }
    const fetchMatchesData = () => {
       // fetch("http://clubolesapati.cat/API/apiTotsElsPartits.php?top=1&idLeague=" + matchIdLeague)
       fetch("http://jok.cat/API/leagueUrlToJson.php?url=https://www.fcf.cat/calendari/2324/futbol-sala/lliga-segona-divisio-infantil-futbol-sala/bcn-gr-6")
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                setMatches(data);
                //console.log(data); 
            })
    }
    useEffect(() => {
        fetchClassificationData();
        fetchMatchesData();
    }, [reload])


    if (matches && classification) {
        return (
            <>
                <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        borderRadius: 5, backgroundColor: '#fff', padding: 0, width: '99%', margin: 5, marginTop: 10, marginBottom: 5, elevation: 3,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text style={{ fontFamily: 'Jost500Medium', color: '#424242', padding: 10, fontSize: 18, flex: 2 }}>Classificació </Text>
                            <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost500Medium', color: '#424242', padding: 10, fontSize: 18, flex: 1 }}>Punts G E P</Text>
                        </View>
                        {classification?.map(c =>

                            <View key={c.classId} style={{ alignSelf: 'stretch', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#cdc' }}>
                                <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', }}>{c.position}</Text>
                                </View>
                                <View style={{ flex: 5, alignSelf: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', textTransform: 'capitalize' }}>{c.teamName.toLowerCase()}</Text>
                                </View>
                                <View style={{ flex: 1, alignSelf: 'stretch', }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', }}>{c.points}</Text>
                                </View>
                                <View style={{ flex: 1, alignSelf: 'stretch', }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', }}>{c.won}</Text>
                                </View >
                                <View style={{ flex: 1, alignSelf: 'stretch', }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', }}>{c.draw}</Text>
                                </View>
                                <View style={{ flex: 1, alignSelf: 'stretch', }}>
                                    <Text style={{ padding: 9, fontFamily: 'Jost500Medium', }}>{c.lost}</Text>
                                </View>

                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.sectionTitle}><Text  style={styles.sectionTitleText}>Partits</Text></View>
                {
                    matches?.map(
                        n => (
                            <LeagueScreenListItems
                                matchId={n.matchid}
                                matchLocal={n.local}
                                matchVisitor={n.visitor}
                                matchComplexName={n.complexName}
                                matchComplexAddress={n.complexAddress}
                                matchDate={n.matchDate}
                                matchHour={n.matchHour}
                                matchFixture={n.fixture}
                                matchLocalImage={n.localImage} matchVisitorImage={n.visitorImage}
                                matchIdLeague={n.idleague}
                                matchLeagueName={n.leagueName}
                                matchGroupName={n.groupName}
                                matchLocalResult={n.localResult}
                                matchVisitorResult={n.visitorResult}
                                key={n.matchId}
                                matchDistance={n.distance}
                                matchTravelTime={n.travelTime}
                                matchMeteo={n.matchMeteo}
                            ></LeagueScreenListItems>

                        )
                    )

                }

            </>
        )
    } else {
        return (
            <View>
                <Text style={{ padding: 9, fontFamily: 'GalanoGrotesqueBold', }}>Carregant dades</Text>
            </View>
        )
    }
}
