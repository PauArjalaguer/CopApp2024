import React, { useState, useEffect, useRef, useContext } from 'react'
import { MatchProvider, MatchContext } from '../context/MatchContext';
import { View, Text, Image, TouchableOpacity } from 'react-native'
const styles = require('../styles/stylesheet');
import { LeagueScreenListItems } from './LeagueScreenListItems'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const LeagueScreenList = ({ matchIdLeague, matchGroupName }) => {
    const url = 'https://jokcatfs-pauarjalaguer.turso.io/';
    const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ1MTcwNjYsImlkIjoiZjI3NmQ3NmUtMjA1My00ZmJhLWI2MTgtMGQyZGZkN2E3NDEzIn0.vGKIODWyeqUw-YY-XdW6jEUeRUSyFdevSdimkQ0bpIIghhEbrXsHUVdDMXUBWwCHFHYtBwWixlv_JqQVzuDoCQ";

    let [isLoadingClass, setIsLoadingClass] = useState(true);
    let [isLoadingMatches, setIsLoadingMatches] = useState(true);

    let [matches, setMatches] = useState([]);
    let [classification, setClassification] = useState([]);
    let [visibleClassification, setVisibleClassification] = useState(0);

    const idRound = useRef("");
    idRound.current = "Jornada 0";

    let [reload, setReload] = useState(0);
    const fetchClassificationData = async (matchIdLeague) => {
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
                            q: "SELECT  position,  teamName,  points,  played,  won,  draw,  lost,  goalsmade,  goalsreceived FROM classification where idLeague=771",
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
            setClassification(data[0].results.rows);          
            setIsLoadingClass(false);
        } catch (error) {
            console.error('Error inserting or replacing classification:', error);
        }
    }
    const fetchMatchesData = async (matchIdLeague) => {
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
                            q: "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates from matches m join groups g on g.idGroup=m.idGroup where g.idGroup ="+matchIdLeague,
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
            setMatches(data[0].results.rows);   
          console.log(matches)      
            setIsLoadingMatches(false);
        } catch (error) {
            console.error('Error inserting or replacing classification:', error);
        }
    }
    const handleClassPress = (position) => {
        setVisibleClassification(position);
    }
    useEffect(() => {
        fetchClassificationData(matchIdLeague);
        fetchMatchesData(matchIdLeague);
    }, [reload])
    const [state, setState] = useContext(MatchContext);
    if (matches && classification) {
        return (
            <>
                {isLoadingClass ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{
                    borderRadius: 5, backgroundColor: '#fff', padding: 4, width: '99%', margin: 5, marginTop: 5, marginBottom: 5, elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', padding: 10,
                }}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 16 }} />  Carregant classificació</Text></View> : null}
                <View style={isLoadingClass ? { display: 'none' } : { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                            <View style={{ flex: 7 }}>
                                <Text style={{ fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 2 }}>Classificació </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                                    P </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                                </Text>
                            </View>
                        </View>

                        {classification?.map(c => {
                            let classColor = '#ffcc00';
                            return (<>
                                <View key={c[0]} style={{ alignSelf: 'stretch', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#cdc' }}>
                                    <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: classColor }}>
                                        <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13, fontWeight: 'bold', color: 'white' }}>{c[0]}</Text>
                                    </View>
                                    <View style={{ flex: 7, alignSelf: 'flex-start', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            handleClassPress(c[0])
                                        }}><Text style={{ padding: 6, fontFamily: 'Jost500Medium', textTransform: 'capitalize', fontSize: 13, }}>{c[1].substring(0, 35)}</Text></TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13 }}>{c.points}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => {
                                            handleClassPress(c[0])
                                        }}>
                                            <FontAwesome5 name="angle-double-down" style={{ paddingTop: 8, color: '#41628b', fontSize: 16, display: visibleClassification == c[0] ? 'none' : 'flex' }} />
                                            <FontAwesome5 name="angle-double-up" style={{ paddingTop: 8, color: '#41628b', fontSize: 16, display: visibleClassification !== c[0] ? 'none' : 'flex' }} /></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', backgroundColor: '#eee', borderTopWidth: 1, borderTopColor: '#cdc', display: visibleClassification == c[0] ? 'flex' : 'none' }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 10, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>PUNTS:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[2]} </Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>J:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[3]}</Text>
                                        </View >
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>G:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[4]}</Text>
                                        </View >
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-center', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>E:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[5]}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>P:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[6]}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GF:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[7]}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GC:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[8]}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                </View>
                            </>)
                        }
                        )}
                    </View>
                </View>

                {/* <View style={styles.sectionTitle}><Text style={styles.sectionTitleText}>Partits</Text></View> */}
                {isLoadingMatches ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{
                    borderRadius: 5, backgroundColor: '#fff', padding: 4, width: '99%', margin: 5, marginTop: 5, marginBottom: 5, elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', padding: 10,
                }}><FontAwesome5 name="futbol" style={{ padding: 8, color: '#41628b', fontSize: 16 }} /> Carregant partits</Text></View> : null}
                <View style={isLoadingClass ? { display: 'none' } : { borderBottomColor: '#ddd' }}>
                    <MatchProvider>
                        {
                              matches?.map(
                                  n => {
                                      let showFixture;
                                      if (idRound.current != n[6]) {
                                          showFixture = true;
                                      } else {
                                          showFixture = false;
                                      }
                                      idRound.current = n[6];
                                      return (<LeagueScreenListItems  
                                          showFixture={showFixture}
                                          matchId={n[0]}
                                          matchLocal={n[1]}
                                          matchVisitor={n[2]}
                                          matchComplexName={n[3]}
                                          matchComplexAddress={n[16]}
                                          matchDate={n[4]}
                                          matchHour={n[5]}
                                          matchFixture={n[6]}
                                          matchLocalImage={n[7]} matchVisitorImage={n[8]}
                                          matchIdLeague={n[0]}
                                          matchLeagueName={n[9]}
                                          matchGroupName={n[9]}
                                          matchLocalResult={n[11]}
                                          matchVisitorResult={n[12]}
                                          matchesDistance={n[13]}
                                          matchesTravelTime={n[14]}
                                          matchMeteo={n[15]}
                                      ></LeagueScreenListItems>);
                                  }
                              )
                        }</MatchProvider>
                </View>
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
