import React from 'react'
import { View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export const LoadingComponent = ({ loadText }) => {

    return (
        <View
            style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
                borderRadius: 5, backgroundColor: '#fff', padding: 4, width: '99%', margin: 5, marginTop: 5, marginBottom: 5, elevation: 3,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84, fontFamily: 'Jost500Medium', color: '#424242', padding: 10,
            }}>
                <FontAwesome5 name="futbol" style={{ padding: 18, color: '#41628b',  height: 14, width: 14, alignSelf: 'flex-end', marginRight: 0, marginTop: -2 }} /> {loadText}
            </Text>
        </View>
    )
}
