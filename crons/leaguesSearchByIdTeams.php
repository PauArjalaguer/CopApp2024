<?php

function printR($array)
{
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}
$t = explode(",", $_GET['teams']);
//printR($t);
$j = file_get_contents($_GET['url']);
$leaguesArray = array();
foreach (json_decode($j) as $league) {
    //printR($league);
    foreach ($t as $team) {
        if ($league->idTeam == $team) {
            $n = explode("/",$league->leagueUrl);
            $leagueName = $n[6]." ".$n[7];
         
            $l = ['idLeague' => $league->leagueUrl];
            $l['teamName'] = $league->teamName;
            $l['teamCategory'] = $league->teamCategory;
            $l['leagueName'] =  ucwords(str_replace("-"," ",$leagueName));
            $l['teamUrl'] = $league->teamUrl;
            $l['idTeam'] = $league->idTeam;
         
            array_push($leaguesArray, $l);
        }
    }
}
echo json_encode($leaguesArray);
