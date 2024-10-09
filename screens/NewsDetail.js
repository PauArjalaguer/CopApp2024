import React, { useEffect, useState } from 'react'

import { Text, ImageBackground, View, ScrollView, useWindowDimensions, Platform } from 'react-native';

import { http_query } from '../functions/http';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
const systemFonts = [...defaultSystemFonts, 'Montserrat-Regular', 'Montserrat-Bold'];
const styles = require('../styles/stylesheet');

export const NewsDetail = ({ navigation, route }) => {
  const id = route.params.id;

  const [news, setNews] = useState([]);
  const [loaded, setLoaded] = useState(1);
  const fetchNewsData = () => {
    setLoaded(1);
    query = "https://clubolesapati.cat/API/apiNoticies.php?top=100&headline=0&id=" + id;
    params = [];
    let response = http_query(query, params).then((res) => { setNews(res); setLoaded(1) });
  }


  useEffect(() => {
    setNews([]);
    fetchNewsData();
  }, []);

  const { width } = useWindowDimensions();
  if (news[0]) {
    const source = {
      html: `<p style="font-family: 'BostonRegular', sans-serif; color:#625262; margin:0 ">${news[0]['content']}</p>`

    };


    if (loaded === 0) {
      console.log("loading" + loaded)
      return (<><Text style={{ fontSize: 46, color: '#c00' }}>Carregant</Text></>);

    } else {

      return (
        <>
          <View style={styles.newsDetailContainer}>
            <ImageBackground source={{ uri: 'https://clubolesapati.cat//images/dynamic/newsImages/mobile/'+news[0]['pathImage'] }} resizeMode="cover" style={styles.newsDetailImage}>
              <View style={styles.newsDetailInfo}>
                <View style={{ width: '80%' }}>
                  <Text style={{ ...styles.newsListTitle, color: '#fff' }}>{news[0]['title']}  </Text>
                </View>
                <View style={{ width: '20%' }}>
                  {/*  <Text style={styles.newsListDate}>Fa {news[0].date} dies </Text> */}
                </View>
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={styles.container}>
            <View style={{ width: '100%', flex: 0, paddingHorizontal: 15, }}>
              <Text style={styles.newsDetailSubtitle}>{news[0]['subtitle']}</Text>
              <RenderHtml contentWidth={width} source={source}></RenderHtml>
            </View>
          </ScrollView>
        </>
      )

    }

  }
}