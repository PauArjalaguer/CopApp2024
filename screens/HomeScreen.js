import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { HomeScreenList } from './HomeScreenList'
import { HomeScreenNewsDetail } from './HomeScreenNewsDetail'
import { View,Text } from 'react-native';
const Stack = createStackNavigator();

export const HomeScreen = () => {
    return (
        <>       
        
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}> 
            <Stack.Screen name="HomeScreenList" component={HomeScreenList} ></Stack.Screen>
            <Stack.Screen name="HomeScreenNewsDetail" component={HomeScreenNewsDetail}></Stack.Screen>
        </Stack.Navigator>
        </>
    )
}
