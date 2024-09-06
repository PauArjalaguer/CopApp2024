import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export const LoadingComponent = ({ loadText, setReloadFunction }) => {
    const reload = () => {
     
        setReloadFunction(123 );
    }
    return (
        <View
            style={{
                flex: 1, backgroundColor: '#fff', width: '100%', flex: 1, flexDirection: 'row', elevation: 3, borderWidth: 1, borderColor: '#41628b',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                }, marginTop: 5, marginBottom: 5,
            }}>
            <View style={{ width: '75%', }}>
                <Text style={{
                    borderRadius: 5, padding: 10, width: '99%',
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', paddingLeft: 15,
                }}>

                    <FontAwesome5 name="futbol" style={{ padding: 18, color: '#41628b', height: 14, width: 14, alignSelf: 'flex-end', marginRight: 0, marginTop: -2 }} /> {loadText}

                </Text>
            </View>

            <View style={{ width: '25%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 20 }}>
                <TouchableOpacity onPress={reload}>
                    <Text>
                        <FontAwesome5 name="sync" style={{ padding: 18, color: '#41628b', height: 14, width: 14, alignSelf: 'flex-end', marginRight: 0, marginTop: -2 }} />
                    </Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}
