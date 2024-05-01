import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { TeamsScreenList } from './TeamsScreenList'
import { TeamScreen } from './TeamScreen' 
const Stack = createStackNavigator();
export const TeamsScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="TeamsScreenList" component={TeamsScreenList}></Stack.Screen>
      <Stack.Screen name="TeamScreen" component={TeamScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}