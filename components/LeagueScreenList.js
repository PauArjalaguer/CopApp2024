import React, { useState, useEffect, useRef, useContext } from 'react'
import { MatchProvider, MatchContext } from '../context/MatchContext';
import { View, Text, Image, TouchableOpacity } from 'react-native'
const styles = require('../styles/stylesheet');

import { http_query } from '../functions/http';
import { LoadingComponent } from './LoadingComponent';
import { Classification } from './Classification';
import { LeagueMatches } from './LeagueMatches';

export const LeagueScreenList = ({ matchIdLeague }) => {
    

    let [isLoadingMatches, setIsLoadingMatches] = useState(true);
    let [matches, setMatches] = useState([]);

    let [isLoadingClass, setIsLoadingClass] = useState(true);
    let [classification, setClassification] = useState([]);
    let [visibleClassification, setVisibleClassification] = useState(0);

    let [reload, setReload] = useState(0);
    const [state, setState] = useContext(MatchContext);
    const fetchClassificationData = async (matchIdLeague) => {
        query = "https://clubolesapati.cat/API/apiClassificacionsPerId.php?top=1&idLeague=" + matchIdLeague;
        params = [];
        let response = http_query(query, params).then((res) => { setClassification(res); setIsLoadingClass(false); });
    }
    const fetchMatchesData = async (matchIdLeague) => {
        query = "https://clubolesapati.cat/API/apiTotsElsPartits.php?top=1&idLeague=" + matchIdLeague+"&orderByRound=1";
        

        params = [];
        let response = http_query(query, params).then((res) => { setMatches(res);  setIsLoadingMatches(false); });
    }

    useEffect(() => {
        fetchClassificationData(matchIdLeague);
        fetchMatchesData(matchIdLeague);
    }, [reload])


    if (matches && classification) {
        return (
            <>
                {isLoadingClass ? <LoadingComponent loadText='Carregant classificació'></LoadingComponent> : null}
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
