import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { LeagueScreenList } from '../components/LeagueScreenList'
const styles = require('../styles/stylesheet');
export const LeagueScreen = ({ navigation, route }) => {
    console.log(route.params.matchIdLeague)
    const matchIdLeague = route.params.matchIdLeague;
    const matchLeagueName = route.params.matchLeagueName;
    let h;
    h = <LeagueScreenList matchIdLeague={matchIdLeague}  ></LeagueScreenList>
    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>
            <View style={{ width: '97%',marginHorizontal:'auto', height: '99.5%', }}>
                <Text style={styles.sectionTitleText}>{matchLeagueName}</Text>
                <ScrollView style={styles.container}>
                    {h}
                </ScrollView>
            </View>
        </>
    )
}
