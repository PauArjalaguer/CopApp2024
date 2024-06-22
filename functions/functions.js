import * as SQLite from "expo-sqlite";
import axios from 'axios';
//const db = SQLite.openDatabase('db.COPapp');
//busco a l' api i descarrego equips

export function createTable() {
  const db = SQLite.openDatabase('db.FCFapp');
  db.transaction(tx => {
    //tx.executeSql('drop activeTeams',null, console.log("elimina la taula"));
   
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS activeTeams (idTeam varchar PRIMARY KEY)',
      null, console.log('crea la taula')
    )

  });
}
export function fetchTeams(setLoadTeamsStatus) {
  setLoadTeamsStatus('Loading')


}
