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
    )
}
