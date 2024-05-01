import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { LeagueScreenList } from '../components/LeagueScreenList'
const styles = require('../styles/stylesheet');
export const LeagueScreen = ({ navigation, route }) => {
    console.log(route.params)
    const matchIdLeague = route.params.matchIdLeague;
    const matchGroupName = route.params.matchGroupName;
    const matchLeagueName = route.params.matchLeagueName.toLowerCase();
    let h;
    h = <LeagueScreenList matchIdLeague={matchIdLeague} matchGroupName={matchGroupName} ></LeagueScreenList>
    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>
            <View style={{ width: '94%', marginLeft: '3%' ,height:'100%'}}>
                <Text style={styles.sectionTitleText}>{matchLeagueName} {matchGroupName}</Text>
                <ScrollView style={styles.container}>
                    {h}
                </ScrollView>
            </View>
        </>
    )
}
