import React, { useEffect, useState } from 'react'
import { Text, ImageBackground, View, ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html'
const styles = require('../styles/stylesheet');

export const NewsDetail = ({ navigation, route }) => {
  const id = route.params.id;

  const [news, setNews] = useState([]);
  const [loaded, setLoaded] = useState(1);
  const fetchNewsData = () => {
    setLoaded(1);
    fetch("http://jok.cat/api/news/efs_masquefa/1")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setNews(data);
        setLoaded(1)
        //  console.log(news[0]);
      })
  }
  useEffect(() => {
    setNews([]);
    fetchNewsData();
  }, []);

  const { width } = useWindowDimensions();
  if (news[0]) {
    const source = {
      html: `${news[0].newsContent}`

    };

    if (loaded === 0) {
      console.log("loading" + loaded)
      return (<><Text style={{ fontSize: 46, color: '#c00' }}>Carregant</Text></>);

    } else {

      return (
        <>
          <View style={styles.newsDetailContainer}>
            <ImageBackground source={{ uri: "http://jok.cat/"  + news[0].newsImage }} resizeMode="cover" style={styles.newsDetailImage}>
              <View style={styles.newsDetailInfo}>
                <View style={{ width: '80%' }}>
                  <Text style={{ ...styles.newsListTitle, color: '#fff' }}>{news[0].newsTitle}  </Text>
                </View>
                <View style={{ width: '20%' }}>
                  {/*  <Text style={styles.newsListDate}>Fa {news[0].date} dies </Text> */}
                </View>
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={styles.container}>
            <View style={{ width: '100%', flex: 0, paddingHorizontal: 15 }}>
              <Text style={styles.newsDetailSubtitle}>{news[0].newsSubtitle}</Text>

              <RenderHtml contentWidth={width} source={source}></RenderHtml>
            </View>
          </ScrollView>
        </>
      )

    }

  }
}