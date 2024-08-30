import React, { useState, useEffect, useRef, useContext } from 'react'
import { MatchProvider,MatchContext } from '../context/MatchContext';
import { View, Text, Image, TouchableOpacity } from 'react-native'
const styles = require('../styles/stylesheet');
import { LeagueScreenListItems } from './LeagueScreenListItems'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const LeagueScreenList = ({ matchIdLeague, matchGroupName }) => {

    let [isLoadingClass, setIsLoadingClass] = useState(true);
    let [isLoadingMatches, setIsLoadingMatches] = useState(true);

    let [matches, setMatches] = useState([]);
    let [classification, setClassification] = useState([]);
    let [visibleClassification, setVisibleClassification] = useState(0);

    const idRound = useRef("");
    idRound.current = "Jornada 0";

    let [reload, setReload] = useState(0);
    const fetchClassificationData = () => {
        var classUrl = matchIdLeague.replace("calendari", "classificacio");
        fetch("http://jok.cat/API/classificationUrlToJson.php?url=" + classUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setClassification(data);
                setIsLoadingClass(false);
            })
    }
    const fetchMatchesData = () => {
        fetch("http://jok.cat/API/leagueUrlToJson.php?url=" + matchIdLeague)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setMatches(data);
                setIsLoadingMatches(false);
            })
    }
    const handleClassPress = (position) => {
        setVisibleClassification(position);
    }
    useEffect(() => {
        fetchClassificationData();
        fetchMatchesData();
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
                            let classColor = c.color;
                            return (<>
                                <View key={c.position} style={{ alignSelf: 'stretch', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#cdc' }}>
                                    <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: classColor }}>
                                        <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13, fontWeight: 'bold', color: 'white' }}>{c.position}</Text>
                                    </View>
                                    <View style={{ flex: 7, alignSelf: 'flex-start', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            handleClassPress(c.position)
                                        }}><Text style={{ padding: 6, fontFamily: 'Jost500Medium', textTransform: 'capitalize', fontSize: 13, }}>{c.teamName.toLowerCase().substring(0, 35)}</Text></TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13 }}>{c.points}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => {
                                            handleClassPress(c.position)
                                        }}>
                                            <FontAwesome5 name="angle-double-down" style={{ paddingTop: 8, color: '#41628b', fontSize: 16, display: visibleClassification == c.position ? 'none' : 'flex' }} />
                                            <FontAwesome5 name="angle-double-up" style={{ paddingTop: 8, color: '#41628b', fontSize: 16, display: visibleClassification !== c.position ? 'none' : 'flex' }} /></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', backgroundColor: '#eee', borderTopWidth: 1, borderTopColor: '#cdc', display: visibleClassification == c.position ? 'flex' : 'none' }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 10, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>PUNTS:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.points} </Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>J:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.played}</Text>
                                        </View >
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>G:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.won}</Text>
                                        </View >
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-center', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>E:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.draw}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>P:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.lost}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GF:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.gF}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GC:</Text>
                                            <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c.gC}</Text>
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
                                    if (idRound.current != n.fixture) {
                                        showFixture = true;
                                    } else {
                                        showFixture = false;
                                    }
                                    idRound.current = n.fixture;
                                    return (<LeagueScreenListItems
                                   
                                        showFixture={showFixture}
                                        matchId={n.local + n.visitor}
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
                                        matchDistance={n.distance}
                                        matchTravelTime={n.travelTime}
                                        matchMeteo={n.matchMeteo}
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
