import * as SQLite from "expo-sqlite";
import axios from 'axios';
  //const db = SQLite.openDatabase('db.COPapp');
//busco a l' api i descarrego equips

export function createTable(){
  const db = SQLite.openDatabase('db.COPapp2');
  db.transaction(tx => {
  //tx.executeSql('drop activeTeams',null, console.log("elimina la taula"));
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS activeTeams (teamId INTEGER PRIMARY KEY)',
      null,console.log('crea la taula')    
    )

  });
}
export  function fetchTeams(setLoadTeamsStatus) {

  setLoadTeamsStatus('Loading')
  console.log("EQUIPS  - Entro a la funció fetchTeams")



/*   axios({
    method: 'get',
    url: `http://clubolesapati.cat/API/apiEquips.php`,
  }).then((response) => {
    response.data.map((teams) => {
      console.log("Equips: " + teams.teamId + " " + teams.teamName)
      db.transaction(tx => {
         tx.executeSql(
           'insert or replace into teams (teamId, teamName) values (?,?); ', [teams.teamId, teams.teamName], null, (tx) => { console.log("inserto a la ddbb "+ teams.teamName) }
         ), null; 
      }, error => console.log(error));
    })
  }); */
}
