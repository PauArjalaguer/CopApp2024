import React from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { LeaguesScreenList } from './LeaguesScreenList'
import {LeagueScreen} from './LeagueScreen'
const Stack = createStackNavigator();
export const LeaguesScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LeaguesScreenList" component={LeaguesScreenList}></Stack.Screen>
       <Stack.Screen name="LeagueScreen" component={LeagueScreen}></Stack.Screen> 
    </Stack.Navigator>
  )
}
