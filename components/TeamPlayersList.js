import React, { useState, useEffect } from 'react'
import { Image, Text, View, Dimensions } from 'react-native'
import * as SQLite from 'expo-sqlite';
const styles = require('../styles/stylesheet');
export const TeamPlayersList = ({ teamId,teamName, teamLink }) => {
    let itemsArray = [];
    let [items, setItems] = useState([]);
    let [reload, setReload] = useState();
    const fetchPlayersData = () => {       
        fetch("http://jok.cat/API/teamUrlToJson.php?url="+teamLink)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                setItems(data);
              //  console.log(data);
            })
    }
    useEffect(() => {
        fetchPlayersData();

    }, [reload])

    if (items._array) {
        itemsArray = Array.from(items._array)
    }
    const windowWidth = Dimensions.get('window').width;
    let small;
    if (windowWidth < 479) {
        small = true;
    } else {
        small = false;
    }
    if (items) {
        return (
            <>
                {items.map(

                    n => (
                        <View style={small ? styles.teamsPlayersListContainerSmall : styles.teamsPlayersListContainer

                        } key={n.playerName}>

                            <View style={styles.teamsPlayersListContent}>
                                <View style={styles.teamsPlayersListNumberView}><Text style={styles.teamsPlayersListNumber}>{n.number}</Text></View>
                                <Image source={{ uri: "http://clubolesapati.cat/images/dynamic/playersImages/blank.png"}} style={styles.teamPlayersListImage} ></Image>
                                <View>
                                    <Text style={styles.teamsPlayersListText}>{n.playerName}</Text>
                                    <Text style={styles.teamsPlayersListDate}>{n.birthdate}</Text>
                                </View>

                            </View>
                        </View>
                    )
                )
                }
            </>
        )
    }
}