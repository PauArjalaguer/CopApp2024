import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { TeamLeaguesList } from '../components/TeamLeaguesList'
import { TeamPlayersList } from '../components/TeamPlayersList'
import { TeamNextMatch } from '../components/TeamNextMatch'

const styles = require('../styles/stylesheet');
export const TeamScreen = ({ navigation, route }) => {
  const teamId = route.params.teamId;
  const teamName = route.params.teamName;
  let h, p, n;
  p = <TeamPlayersList teamId={teamId} style={{ flex: 1, flexDirection: 'row' }}></TeamPlayersList>
  h = <TeamLeaguesList teamId={teamId} teamName={teamName}></TeamLeaguesList>
  n = <TeamNextMatch teamId={teamId} teamName={teamName} ></TeamNextMatch>
  let deviceWidth = Dimensions.get('window').width;
  let imageHeight = deviceWidth / 2;
  return (
    <>
      <View style={{ width: '96%', marginLeft: '2%', }}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>{teamName}</Text>
        </View>

        <ScrollView style={styles.container} >
          {/*  <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Proper partit</Text>
          </View> */}
          {n}
          <View><Text> </Text></View>
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

