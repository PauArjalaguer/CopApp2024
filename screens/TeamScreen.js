import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { TeamLeaguesList } from '../components/TeamLeaguesList'
import { TeamPlayersList } from '../components/TeamPlayersList'
import { TeamNextMatch } from '../components/TeamNextMatch'

const styles = require('../styles/stylesheet');
export const TeamScreen = ({ navigation, route }) => {
  const idTeam = route.params.idTeam;
  const teamName = route.params.teamName;
  const teamLink = route.params.teamLink;
  let h, p, n;
  p = <TeamPlayersList idTeam={idTeam} teamLink={teamLink} style={{ flex: 1, flexDirection: 'row' }}></TeamPlayersList>
  h = <TeamLeaguesList idTeam={idTeam} teamName={teamName}></TeamLeaguesList>
  n = <TeamNextMatch idTeam={idTeam} teamName={teamName}  ></TeamNextMatch>
  let deviceWidth = Dimensions.get('window').width;
  let imageHeight = deviceWidth / 2;
  return (
    <>   
      <View style={{ width: '97%', marginHorizontal: 'auto', }}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>{teamName}</Text>
        </View>

        <ScrollView style={styles.container} >       
          {n}
         
           <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Competició</Text>
          </View>
          {h}
         <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Jugadors</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap', padding: 5 }}>
            {p}
          </View>

          <View><Text> </Text></View>
          <View><Text> </Text></View>
          <View><Text> </Text></View>
          <View><Text> </Text></View>
        </ScrollView> 
      </View>
    </>
  )
}

