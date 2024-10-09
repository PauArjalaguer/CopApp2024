import React, { useRef } from 'react'
import { MatchProvider } from '../context/MatchContext';

import { View, } from 'react-native';
import { LeagueScreenListItems } from './LeagueScreenListItems';
export const LeagueMatches = ({ matches, isLoadingMatches }) => {
    const idRound = useRef("");
    idRound.current = "Jornada 0";

    return (
        <View style={isLoadingMatches ? { display: 'none' } : { borderBottomColor: '#ddd' }}>
            <MatchProvider>
                {
                    matches?.map(
                        n => {
                            let showFixture;
                            if (idRound.current != n['fixture']) {
                                showFixture = true;
                            } else {
                                showFixture = false;
                            }
                            idRound.current = n['fixture'];
                            return (<LeagueScreenListItems
                                showFixture={showFixture}
                                matchId={n['matchid']}
                                matchLocal={n['local']}
                                matchVisitor={n['visitor']}
                                matchComplexName={n['complexName']}
                                matchComplexAddress={n['complexAddress']}
                                matchDate={n['matchDate']}
                                matchHour={n['matchHour']}
                                matchFixture={n['fixture']}
                                matchLocalImage={n['localImage']} matchVisitorImage={n['visitorImage']}
                                matchIdLeague={n['matchid']}
                                matchLeagueName={n['leagueName']}
                                matchGroupName={n['groupName']}
                                matchLocalResult={n['localResult']}
                                matchVisitorResult={n['visitorResult']}
                                matchesDistance={n['distance']}
                                matchesTravelTime={n['travelTime']}
                                matchMeteo={n['meteo']}
                            ></LeagueScreenListItems>);
                        }
                    )
                }</MatchProvider>
        </View>
    )
}
