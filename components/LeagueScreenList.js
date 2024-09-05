import React, { useState, useEffect, useRef, useContext } from 'react'
import { MatchProvider, MatchContext } from '../context/MatchContext';
import { View, Text, Image, TouchableOpacity } from 'react-native'
const styles = require('../styles/stylesheet');

import { http_query } from '../functions/http';
import { LoadingComponent } from './LoadingComponent';
import { Classification } from './Classification';
import { LeagueMatches } from './LeagueMatches';

export const LeagueScreenList = ({ matchIdLeague, matchGroupName }) => {

    let [isLoadingMatches, setIsLoadingMatches] = useState(true);
    let [matches, setMatches] = useState([]);

    let [isLoadingClass, setIsLoadingClass] = useState(true);
    let [classification, setClassification] = useState([]);
    let [visibleClassification, setVisibleClassification] = useState(0);

    let [reload, setReload] = useState(0);
    const [state, setState] = useContext(MatchContext);
    const fetchClassificationData = async (matchIdLeague) => {
        query = "SELECT  position,  teamName,  points,  played,  won,  draw,  lost,  goalsmade,  goalsreceived FROM classification where idLeague=771";
        params = [];
        let response = http_query(query, params).then((res) => { setClassification(res[0].results.rows); setIsLoadingClass(false); });
    }
    const fetchMatchesData = async (matchIdLeague) => {
        query = "select  idMatch,localName, visitorName, place,matchDate, matchHour, idRound, localImage,visitorImage, groupName, groupName, localResult, visitorResult, distance,travelTime,meteo,coordinates from matches m join groups g on g.idGroup=m.idGroup where g.idGroup =" + matchIdLeague
        params = [];
        let response = http_query(query, params).then((res) => { setMatches(res[0].results.rows); setIsLoadingMatches(false); });
    }

    useEffect(() => {
        fetchClassificationData(matchIdLeague);
        fetchMatchesData(matchIdLeague);
    }, [reload])


    if (matches && classification) {
        return (
            <>
                {isLoadingClass ? <LoadingComponent loadText='Carregant classificaci'></LoadingComponent> : null}
                <Classification classification={classification} isLoadingClass={isLoadingClass} setVisibleClassification={setVisibleClassification} visibleClassification={visibleClassification} />

                {isLoadingMatches ? <LoadingComponent loadText='Carregant partits'></LoadingComponent> : null}
                <LeagueMatches matches={matches} isLoadingMatches={isLoadingMatches} />
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
