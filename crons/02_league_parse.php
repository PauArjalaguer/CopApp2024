<?php

include("../cnx/c.php");
error_reporting(E_ALL & ~E_NOTICE  & ~E_WARNING & ~E_DEPRECATED);
function printR($array)
{
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}
$searchTeams = ['F.S. OLESA', 'MASQUEFA'];
//$searchTeams = ['MASQUEFA'];
$leaguesWithTeams = array();
function parseLeagues($url, $searchTeams, $mysqli)
{

    $foundTeam = 0;
    $url = str_replace("resultats", "equipacions", $url);
    $url = str_replace("calendari", "equipacions", $url);
    echo "<h1>$url</h1>";
    $dom = new DOMDocument();
    $html = $dom->loadHTMLFile($url);
    $dom->preserveWhiteSpace = true;
    $select  = $dom->getElementsByTagName('select');
    $selectRounds = $select[2];
    $xpath = new DomXPath($dom);
    $teams = $xpath->query("//div[@class='equipacio-box']");
    $teamsArray = array();
    foreach ($teams as $team) {
        if ($team->parentNode->tagName == 'a') {
            $teamUrl = $team->parentNode->attributes[0]->nodeValue;
            $t = explode("/", $teamUrl);
            $teamCategory = $t[5];
            $teamName = $team->parentNode->nodeValue;

            foreach ($searchTeams as $st) {
                // echo "<hr/ >Comparo equip $teamName amb  $st";
                if (str_contains($teamName, $st)) {
                    echo "<hr /> $teamCategory $teamName " . $teamUrl;
                    $$teamName = ['teamName' => trim($teamName)];
                    $$teamName['teamCategory'] = $teamCategory;
                    $$teamName['teamUrl'] = $teamUrl;
                    $url = str_replace("equipacions", "calendari", $url);
                    $$teamName['leagueUrl'] = $url;
                    $l = explode("/", $teamUrl);
                    $b = explode("-", $teamUrl);
                    $n=count($b)-1;
                    $$teamName['idTeam'] = $l[5]."_".$b[$n];
                    array_push($teamsArray, $$teamName);
                }
            }
        }
    }

    return $teamsArray;
}

$j = file_get_contents("realfcfGroups.json");
//printR(json_decode($j));
$a = 0;
foreach (json_decode($j) as $league) {
    if ($a < 1155) {
        $lwt = parseLeagues($league, $searchTeams, $mysqli);
        if ($lwt) {
            array_push($leaguesWithTeams, $lwt);
        }
    }
    $a++;
}
foreach ($searchTeams as $st) {
    $teamLeagues = array();
    $st = str_replace(".", "", strtolower($st));
    $st = str_replace(" ", "-", $st);
    echo "<br /><br/>Busco en els arrays les lligues de $st";
    foreach ($leaguesWithTeams as $lwt) {
        $leagueUrl = $lwt[0]['leagueUrl'];
        foreach ($lwt as $t) {
            if (str_contains($t['teamUrl'], $st)) {
                //  echo "<br />. $st" . $t['teamName'] . " " . $t['teamCategory'] . " " . $t['leagueUrl'];
                $a = ['leagueUrl' => $t['leagueUrl']];
                $a['teamName'] = $t['teamName'];
                $a['teamCategory'] = $t['teamCategory'];
                $a['teamUrl'] = $t['teamUrl'];
                $a['idTeam'] = $t['idTeam'];
                $cal = str_replace("equipacions", "calendari", $t['leagueUrl']);
                echo $cal;
                $array = get_headers($cal);
                if($array[0]=="HTTP/1.1 200 OK"){
                    $a['calendar']=1;
                }
                array_push($teamLeagues, $a);
            }
        }
    }
    file_put_contents("lligues_$st.json", json_encode($teamLeagues));
}
