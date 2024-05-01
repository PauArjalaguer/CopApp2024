import React from 'react'
import { NewsList } from '../components/NewsList'
import { StyleSheet, Text, ScrollView, Dimensions, View } from 'react-native';
const styles = require('../styles/stylesheet');

export const NewsScreenList = () => {
    let h;
    h = <NewsList></NewsList>

    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>    
            <View style={{ width: '96%', marginLeft: '2%', }}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>Notícies</Text>
                </View>
                <ScrollView>
                    {h}
                    <View><Text></Text></View>
                    <View><Text></Text></View>
                    <View><Text></Text></View>
                </ScrollView>
            </View> 
        </>
    )
}


