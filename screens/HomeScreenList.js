import React, { useEffect, useState } from 'react'
import { HomeList } from '../components/HomeList'
import { StyleSheet, Text, ScrollView, Dimensions, View } from 'react-native';

export const HomeScreenList = ({ navigation }) => {
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
    h = <HomeList key={currentDate}></HomeList>

    let deviceWidth = Dimensions.get('window').width;
    let imageHeight = deviceWidth / 2;
    return (
        <>
            <ScrollView style={styles.container}>
                {h}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: { width:'96%', marginLeft:'2%' },
});

