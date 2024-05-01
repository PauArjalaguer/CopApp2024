import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { MatchesList } from '../components/MatchesList'
const styles = require('../styles/stylesheet');
export const MatchesScreenList = ({ navigation }) => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds
    const [currentDate, setcurrentDate] = useState(hours + "" + min + "" + sec)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            var date = new Date().getDate(); //To get the Current Date
            var month = new Date().getMonth() + 1; //To get the Current Month
            var year = new Date().getFullYear(); //To get the Current Year
            var hours = new Date().getHours(); //To get the Current Hours
            var min = new Date().getMinutes(); //To get the Current Minutes
            var sec = new Date().getSeconds(); //To get the Current Seconds
            setcurrentDate(hours + "" + min + "" + sec);
            // console.log('Refreshed! ' + currentDate);
        });
        return unsubscribe;
    }, [navigation, currentDate]);

    let h;
    h = <MatchesList key={currentDate}></MatchesList>

    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>
           <View style={{ width: '96%', marginLeft: '2%', }}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>Propers partits</Text>
                </View>
                <View style={{height:5}}><Text> </Text></View>
                <ScrollView>
                    {h}
                </ScrollView>
            </View>
        </>
    )
}



