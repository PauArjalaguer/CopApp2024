import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Video } from 'expo-av';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HomeScreen } from './screens/HomeScreen'
import { NewsScreen } from './screens/NewsScreen'
import { MatchesScreen } from './screens/MatchesScreen'
import { TeamsScreen } from './screens/TeamsScreen'
import { LeaguesScreen } from './screens/LeaguesScreen';

import { createTable } from './functions/functions'

export default function App() {
  const [videoVisible, setVideoVisible] = useState(true);
  const [loadTeamsStatus, setLoadTeamsStatus] = useState('Esperant dades')
  useEffect(() => {
    createTable();
    setTimeout(() => { setVideoVisible(false) },10000);
  }, []);
  const navTheme = {
    colors: {
      background: "transparent"
    }
  };
  const [fontsLoaded] = useFonts({
    'Jost900Black': require('./assets/fonts/BostonBlack.otf'),
    'Jost700Bold': require('./assets/fonts/BostonBold.otf'),
    'Jost500Medium': require('./assets/fonts/BostonRegular.otf'),
    'Jost400Book': require('./assets/fonts/BostonRegular.otf'),
    'Jost300Light': require('./assets/fonts/BostonLight.otf'),
    'Jost400BookItalic': require('./assets/fonts/BostonRegularIt.otf'),
    'GalanoGrotesqueBold': require('./assets/fonts/BostonBlack.otf'),

  });


  if (!fontsLoaded) {
    return (<><View style={{ backgroundColor: '#ffffff', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 50 }}><Text>Carregant</Text>
        {/*  <Image style={{ width: 200, height: 200, alignContent: 'center', justifyContent: 'center' }} source={require('./assets/images/appImages/gif.gif')} /> */}



      </View></View></>)

  } else {
    return (
      <><StatusBar translucent backgroundColor="transparent" />
        <Video
          source={require('./assets/images/appImages/intro.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{ width: "100%", aspectRatio: 0.7,  resizeMode: 'contain', display: videoVisible  ? '' : 'none'  }}
        />
        <ImageBackground source={require('./assets/images/appImages/app_back.jpg')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain', display: videoVisible  ? 'none' : 'flex'  }}>
          <NavigationContainer theme={navTheme}>
            <View style={styles.header}>
              <View style={{ flex: 1, flexDirection: 'column', paddingTop: 34 }}>
                <Text style={styles.headerText}>
                  <Image style={styles.headerImage} source={require('./assets/images/appImages/logo.png')} />
                  &nbsp; Club Olesa Patí &nbsp;
                  <Image style={styles.headerImage} source={require('./assets/images/appImages/logo.png')} />
                </Text>
              </View>
            </View>
            <Tab.Navigator
              initialRouteName="Home"
              inactiveColor="#646464"
              activeColor="#006e38"
              barStyle={{ backgroundColor: '#fff', paddingTop: 0, color: 'white', borderTopWidth: 1, borderTopColor: '#006e38', height: '11%' }}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                  let iconName;
                  if (route.name === "Home") {
                    iconName = 'home';
                    size = 20
                  } else if (route.name === "Matches") {
                    iconName = 'skating';
                    size = 20
                  }
                  else if (route.name === "News") {
                    iconName = 'newspaper';
                    size = 20
                  } else if (route.name === "Teams") {
                    iconName = 'users';
                    size = 20
                  } else if (route.name === "Leagues") {
                    iconName = 'trophy';
                    size = 20

                  } else if (route.name === "Calendar") {
                    iconName = 'calendar';
                    size = 20

                  }
                  return (
                    <FontAwesome5 name={iconName} size={size} color={color} />
                  )
                }
              })
              }

            >
              <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>
              }} />
              <Tab.Screen
                name="News"
                component={NewsScreen}
                options={
                  {
                    tabBarLabel: <Text style={styles.tabBarLabel}>Notí­cies</Text>
                  }

                } />
              <Tab.Screen
                name="Matches"
                component={MatchesScreen}
                options={
                  {
                    tabBarLabel: <Text style={styles.tabBarLabel}>Partits</Text>
                  }
                } />


              <Tab.Screen name="Teams" component={TeamsScreen} options={{
                tabBarLabel: <Text style={styles.tabBarLabel}>Equips</Text>
              }} />

              <Tab.Screen name="Leagues" component={LeaguesScreen} options={{
                tabBarLabel: <Text style={styles.tabBarLabel}>Lligues</Text>
              }} />
              {/*  <Tab.Screen name="Calendar" component={LeaguesScreen} options={{
                tabBarLabel: <Text style={styles.tabBarLabel}>Agenda</Text>
              }} /> */}

            </Tab.Navigator>
          </NavigationContainer>
        </ImageBackground>

      </>
    )
  };
}


const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  header: { width: '100%', height: 90, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0, marginTop: 10, marginBottom: 15 },
  headerText: { fontSize: 32, fontFamily: 'Jost700Bold', color: 'white' },
  headerImage: { width: 36, height: 36 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {},

  tabBarLabel: { fontFamily: 'Jost700Bold', color: '#006e38', fontSize: 10, textTransform: 'uppercase' }

});
