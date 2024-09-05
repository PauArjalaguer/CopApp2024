import React from 'react'
import { Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const styles = require('../styles/stylesheet');

export const NewsListItem = ({ id, title,subtitle, image, date, text }) => {
 
    const navigation = useNavigation();
    const gotoHomeScreenNewsDetail = (id) => {
        navigation.navigate('NewsDetail', { id: id, title: title, subtitle: subtitle, image: image, text: text, date: date });
    }
  
    return (
        <View style={styles.newsListContainer}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.newsListTouchable} onPress={() => { gotoHomeScreenNewsDetail(id, title, image, text) }}>
                 {/*    <ImageBackground imageStyle={{ borderRadius: 10 }} source={{ uri: "http://clubolesapati.cat/images/dynamic/newsImages/" + image }} resizeMode="cover" style={styles.newsListImage}>

                    </ImageBackground> */}
                    <Image  source={{ uri:  image }} style={styles.newsListImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.newsListInfo}>
                <View>
                    <TouchableOpacity onPress={() => { gotoHomeScreenNewsDetail(id, title, image, text) }}>
                        <Text style={styles.newsListTitle}>{title}</Text>
                    </TouchableOpacity>
              
                    <Text style={styles.newsListSubtitle}>{subtitle}</Text>
                </View>
                <View>
                    <Text style={styles.newsListDate}> {date}</Text>
                </View>
            </View>
        </View >)
}
