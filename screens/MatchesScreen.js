import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MatchesScreenList } from './MatchesScreenList'
import {LeagueScreen} from './LeagueScreen'
//import {matchesFetch, MatchesFetch} from '../helpers/db/matchesFetch'
const Stack = createStackNavigator();
export const MatchesScreen = () => {
  //matchesFetch();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MatchesScreenList" component={MatchesScreenList}></Stack.Screen>
      <Stack.Screen name="LeagueScreen" component={LeagueScreen}></Stack.Screen>
    </Stack.Navigator>

  )
}