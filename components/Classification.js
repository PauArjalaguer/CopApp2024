import React from 'react'
import { View, Text } from 'react-native'
import { ClassificationListItem } from './ClassificationListItem';

export const Classification = ({ classification, isLoadingClass, setVisibleClassification,visibleClassification }) => {

    const handleClassPress = (position) => {
        setVisibleClassification(position);
    }
    return (
        <View style={isLoadingClass ? { display: 'none' } : { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                borderRadius: 5, backgroundColor: '#fff', padding: 0, width: '99%', margin: 5, marginTop: 10, marginBottom: 5, elevation: 3, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 3.84, shadowOffset: {
                    width: 0,
                    height: 2,
                },

            }}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ flex: 7 }}>
                        <Text style={{ fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 2 }}>Classificació </Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                            P </Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ flex: 1, textAlign: 'left', paddingRight: 10, fontFamily: 'Jost700Bold', color: '#424242', padding: 10, fontSize: 12, flex: 1 }}>
                        </Text>
                    </View>
                </View>

                {classification?.map(c => {
                    return (<ClassificationListItem c={c} visibleClassification={visibleClassification} handleClassPress={handleClassPress} setVisibleClassification={setVisibleClassification} />)
                }
                )}
            </View>
        </View>

    )
}
