import { StyleSheet, Dimensions } from 'react-native'
//export default StyleSheet.create({
module.exports = StyleSheet.create({
    //global 
    sectionTitle: {
        width: '100%', alignItems: 'center', backgroundColor: 'transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden',
        elevation:3
    },
    sectionTitleText: { overflow: 'hidden', width: '100%', fontFamily: 'Jost700Bold', fontSize: 18, backgroundColor: '#41628b', padding:10, color: '#fff', textTransform: 'capitalize' },
    globalFlexStart: { alignSelf: 'flex-start' },
    globalFlexEnd: { alignSelf: 'flex-end' },
    scrollView: { paddingVertical: 5, },

    //home
    homeScreenLeagueName: { flex: 1, fontFamily: 'Jost700Bold', elevation: 3, fontSize: 18, textAlign: 'center',  color: '#242424', 
    textTransform: 'capitalize', textTransform:'uppercase', marginBottom:4, padding:15 },
    homeScreenMatchTeamsRow: { flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginVertical: 0, },
    homeScreenMatchTeam: { flex: 1, alignSelf: 'stretch', width: '50%', paddingHorizontal: 0, marginVertical: 10, alignItems:'center'},
    homeScreenMatchTeamBorder: { borderLeftWidth: 1, borderLeftColor:'#ddd' },
    homeScreenMatchTeamImage: { width: 100, height: 100, alignSelf:'center' },
    homeScreenMatchTeamName: {  fontFamily: 'Jost500Medium', fontSize: 14, marginTop: 10 },
    homeScreenMatchComplexName: { flex:3 ,  fontFamily: 'Jost500Medium', color: '#424242', fontSize: 14, textAlign: 'left', marginTop: 0 , paddingLeft: 15},
    homeScreenMatchDate: { flex: 1, fontFamily: 'Jost500Medium', color: '#424242', fontSize: 12,  textAlign:'right',textAlign: 'right', marginBottom: 0,  
    paddingTop: 0,  alignSelf: 'flex-end', paddingRight:15},
    homeScreenMatchComplexAddress: { flex: 3, fontFamily: 'Jost300Light', color: '#626262', fontSize: 12, paddingLeft: 15,marginBottom:20, width:'80%' },
   

    //newsList
    newsListContainer: { marginBottom: 7, paddingHorizontal: 0, flex: 1, flexDirection: 'row', paddingLeft: 10, borderWidth: 1, borderColor: '#aaa', backgroundColor:'#fff' },
    newsListTouchable: {
        width: '100%',

        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        height: Dimensions.get('window').width / 4.5,
        marginVertical: 7
    },
    newsListImage: {

        flex: 1,
        justifyContent: "flex-end",
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    newsListInfo: { flex: 1, padding: 10, flexDirection: 'column', justifyContent: 'space-between' },
    newsListTitle: { fontFamily: 'Jost700Bold', fontSize: 15, color: '#42aa43', color: '#242424' },
    newsListSubtitle: { fontFamily: 'Jost400Book', fontSize: 12, color: '#42aa43', color: '#424242', marginTop: 5 },
    newsDetailSubtitle: { fontFamily: 'Jost500Medium', fontSize: 14, color: '#42aa43', color: '#000', marginTop: 15 , marginBottom:12},
    newsListDate: { fontFamily: 'Jost300Light', textAlign: 'left', color: '#828282', alignItems: 'flex-start', fontSize: 12 },
    newsDetailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
       /*  shadowColor: "#c00",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, */
        flexDirection: 'row',
        width: '100%',
        height: Dimensions.get('window').width / 2,
        justifyContent: 'flex-start'
    },
    newsDetailImage: {
        borderTopWidth: 1, borderTopColor: '#42aa43',
        justifyContent: "flex-end",
        resizeMode: 'contain',
        height: '100%',
        width: '100%',

    },
    newsDetailInfo: { backgroundColor: '#41628b', padding: 15, borderTopWidth: 1, borderTopColor: '#42aa43', opacity: 0.9, flexDirection: 'row' },
    newsDetailContent: { fontFamily: 'Jost500Medium', fontSize: 18, textAlign: 'justify', padding: 10 },

    //teamsList
    teamsListContainer: {
        paddingHorizontal: 4, marginBottom: 7, borderWidth: 1, borderColor: '#41628b', 
    },
    teamsListContent: {
        flex: 1,
        flexDirection: 'row', 
        padding: 8,
       alignItems:'center', backgroundColor:'#ffffff'
       
    },
    teamsListText: { fontSize: 14 , textAlign: 'left',  fontFamily: 'Jost500Medium', textTransform: 'capitalize', color:'#41628b', fontWeight:'bold' },
    teamsListImage: { width: 16, height: 16, alignItems: 'baseline' },
    teamsLeagueListContainer: {  marginBottom: 7, borderWidth: 1, borderColor: '#41628b', },
    teamsLeagueListContent:
    {
        flex: 1,
        flexDirection: 'row', 
        padding: 8,
       alignItems:'center', backgroundColor:'#ffffff'

    },
    teamsLeagueListText: { fontSize: 14 , textAlign: 'left',  fontFamily: 'Jost500Medium', textTransform: 'capitalize', color:'#41628b', fontWeight:'bold'  },
    teamsLeagueListTextInactive: {fontSize: 14 , textAlign: 'left',  fontFamily: 'Jost500Medium', textTransform: 'capitalize', color:'#828282', fontWeight:'bold' },
    teamsPlayersListContainer: { paddingHorizontal: 5, paddingVertical: 5, width: '50%' },
    teamsPlayersListContainerSmall: { paddingHorizontal: 5, paddingVertical: 5, width: '100%' },
    teamsPlayersListContent:
    {
        alignSelf: 'stretch',
        borderRadius: 5, marginVertical: 5, elevation: 3, backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        justifyContent: 'space-between', flexDirection: 'row',
       
        paddingLeft: 30,
        paddingRight: 15,
        paddingVertical: 10,

    },
    teamsPlayersListNumberView: {
        zIndex:999,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        width: '15%', textAlignVertical: 'top', padding: 15, position: 'absolute', top: -10, left: -5, borderRadius: 300, elevation: 3, backgroundColor: 'white'
    },
    teamsPlayersListNumber: { textAlign: 'center', fontFamily: 'Jost700Bold', textTransform: 'capitalize', color: '#42aa43', fontSize: 12, },

    teamsPlayersListText: { fontSize: 12, textAlign: 'right', fontFamily: 'Jost500Medium', textTransform: 'capitalize', width: '100%', 
    textAlignVertical: 'bottom' },
    teamsPlayersListDate: { textAlign: 'right', fontSize: 16 },
    teamPlayersListImage: {
        width: 64, height: 64,
        borderRadius: 150,
        overflow: 'hidden',
        padding: 0

    },
    //matchesList
    matchesListContainer: { flex: 1, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 4, },
  
    matchesListContent: {
        alignItems: 'center', borderRadius: 5, backgroundColor: '#fff', elevation: 3, shadowColor: "#bbb", padding: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,backgroundColor:'#fff', color:'#fff'
    },
      
    matchesListContentOlesa: {
        alignItems: 'center', borderRadius: 5, backgroundColor: '#fff', elevation: 3, shadowColor: "#000", padding: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,backgroundColor:'#fff', color:'#fff'
    },
    matchesListResultsColumn: { width: '15%', borderLeftWidth: 1, borderColor: '#dedede' },
    
    matchesListResultsColumnEmpty: { width: '15%', borderLeftWidth: 0, borderColor: '#fff' },
 
    matchesListResult: { fontFamily: 'Jost500Medium', color: '#424242', fontSize: 14, textAlign: 'center', padding: 0, paddingTop: 7 },
    matchesListTeam: { fontFamily: 'Jost500Medium', color: '#424242', fontSize: 14, marginLeft: 0, textTransform: 'capitalize' },
    matchesListLogo: { width: 14, height: 14, alignItems: 'baseline'},
    matchesListInfoContainer: { width: '100%', flex: 1, flexDirection: 'row' }, 
    matchesListInfoContent: { width: '100%', flex: 1, width: '100%', marginTop: 10, paddingTop: 5, borderTopWidth: 1, borderTopColor: '#eee', },
    matchesListLeagueName: { fontFamily: 'Jost500Medium', color: '#424242', fontSize: 14, textAlign: 'left', marginBottom: 10, textTransform: 'capitalize' },
    matchesListComplexName: { fontFamily: 'Jost500Medium', color: '#424242', fontSize: 14, textAlign: 'left', marginTop: 0 ,  width:'75%'},
    matchesListComplexAddress: { fontFamily: 'Jost300Light', color: '#626262', fontSize: 11, textAlign: 'left', padding: 0, },
    matchesListComplexDate: { fontFamily: 'Jost400Book', color: '#424242', fontSize: 13,  textAlign:'right',  width:'25%' }
});
