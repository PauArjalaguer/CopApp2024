import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NewsScreenList } from './NewsScreenList'
import { NewsDetail } from './NewsDetail'


const Stack = createStackNavigator();
export const NewsScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="NewsScreenList" component={NewsScreenList}></Stack.Screen>
      <Stack.Screen name="NewsDetail" component={NewsDetail}></Stack.Screen>
    </Stack.Navigator>
  )
}
