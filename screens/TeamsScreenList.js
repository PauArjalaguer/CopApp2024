import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { TeamsList } from '../components/TeamsList'
const styles = require('../styles/stylesheet');
export const TeamsScreenList = () => {
    let h;
    h = <TeamsList></TeamsList>
    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>
             <View style={{ width: '96%', marginLeft: '2%', height:'100%' }}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>Equips</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {h}
                </ScrollView>
            </View>            
        </>
    )
}

