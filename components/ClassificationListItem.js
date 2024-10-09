import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export const ClassificationListItem = ({ c, visibleClassification, handleClassPress, setVisibleClassification}) => {
    let classColor = '#006e38'
    return (
        <View key={c['teamName']} >
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#cdc' }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: classColor }}>
                    <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13, fontWeight: 'bold', color: 'white' }}>{c['position']}</Text>
                </View>
                <View style={{ flex: 7, alignSelf: 'flex-start', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        handleClassPress(c['position'])
                    }}><Text style={{ padding: 6, fontFamily: 'Jost500Medium', textTransform: 'capitalize', fontSize: 13, }}>{c['teamName'].substring(0, 35)}</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ padding: 6, fontFamily: 'Jost500Medium', fontSize: 13 }}>{c.points}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => {
                        handleClassPress(c['position'])
                    }}>
                        <FontAwesome5 name="angle-double-down" style={{ paddingTop: 8, color: '#006e38', fontSize: 16, display: visibleClassification == c['position'] ? 'none' : 'flex' }} />
                        <FontAwesome5 name="angle-double-up" style={{ paddingTop: 8, color: '#006e38', fontSize: 16, display: visibleClassification !== c['position'] ? 'none' : 'flex' }} /></TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#eee', borderTopWidth: 1, borderTopColor: '#cdc', display: visibleClassification == c['position'] ? 'flex' : 'none' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>PUNTS:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['points']} </Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>J:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['played']}</Text>
                    </View >
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>G:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['won']}</Text>
                    </View >
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-center', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>E:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['draw']}</Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>P:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['lost']}</Text>
                    </View>
                  {/*   <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GF:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c['gf']}</Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignSelf: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, fontWeight: 'bold', }}>GC:</Text>
                        <Text style={{ padding: 3, fontFamily: 'Jost500Medium', fontSize: 10, }}> {c[8]}</Text>
                    </View> */}
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
    )
}
