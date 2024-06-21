<?php

include("../cnx/c.php");
error_reporting(E_ALL & ~E_NOTICE  & ~E_WARNING & ~E_DEPRECATED);
function printR($array)
{
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}
//$searchTeam = ;
$searchTeams = ['F.S. OLESA', 'E.F.S. MASQUEFA','MASQUEFA'];

function parseLeagues($url, $searchTeams, $mysqli)
{
echo "<h1>$url</h1>";
    $foundTeam = 0;
    $url = str_replace("resultats", "calendari", $url);
    $dom = new DOMDocument();
    $html = $dom->loadHTMLFile($url);
    $dom->preserveWhiteSpace = true;
    $select  = $dom->getElementsByTagName('select');
    $selectRounds = $select[2];
    $xpath = new DomXPath($dom);
    $rounds = $xpath->query("//table[@class='calendaritable']");
    $matches = [];

    foreach ($rounds as $round) {
        $match = array();
        $idRound = $round->childNodes[1]->childNodes[1]->childNodes[1]->nodeValue;
        $matchDate = $round->childNodes[1]->childNodes[1]->childNodes[3]->nodeValue;
        foreach ($round->childNodes[3]->childNodes as $match) {
            $localName = $match->childNodes[0]->nodeValue;
            $localNameLink = $match->childNodes[0]->childNodes[0]->attributes[0]->nodeValue;
            $localNameImage = $match->childNodes[2]->childNodes[0]->childNodes[0]->attributes[0]->nodeValue;
            $localResult = $match->childNodes[3]->nodeValue;
            $visitorName = $match->childNodes[8]->nodeValue;
            $visitorNameLink = $match->childNodes[6]->childNodes[0]->attributes[0]->nodeValue;
            $visitorNameImage = $match->childNodes[6]->childNodes[0]->childNodes[0]->attributes[0]->nodeValue;
            $visitorResult = $match->childNodes[5]->nodeValue;
            // echo "<br />$localName $searchTeam";
            foreach ($searchTeams as $st) {
                echo "<hr/ >Comparo equips $localName || $visitorName amb  $st || $localNameLink $visitorNameLink || $url";
                if (str_contains($localName, $st)) {
                    echo " -> Existeix $st";
                    $spUrl = explode("/", $localNameLink);
                    printR($spUrl);
                    $sql = "insert into teams (categoryName, teamName,teamUrl) values ('" . $spUrl[5] . "','" . $spUrl[6] . "','$localNameLink') ON DUPLICATE KEY UPDATE  teamUrl='$localNameLink'";
                  
                  echo "<br />$sql";  $mysqli->query($sql);
                    $spUrl = explode("/", $url);
                    $sql = "insert into leagues (leagueName, leagueUrl,groupName,sportName) values ('" . $spUrl[6] . "','" . $url . "','" .  $spUrl[7] . "','" . $spUrl[5] . "') ON DUPLICATE KEY UPDATE leagueName='" . $spUrl[6] . "', leagueUrl='$url'";
                    $mysqli->query($sql);

                    $sql = "insert into teams_leagues (urlLeague, urlTeam) values ('" . $url . "','" . $localNameLink."') ON DUPLICATE KEY UPDATE urlTeam='" . $localNameLink . "', urlLeague='$url'";
                    $mysqli->query($sql);
                }
            }

            $match = ['idRound' => $idRound];

            $match['matchDate'] = $matchDate;
            $match['localName'] = $localName;

            $match['localNameLink'] = $localNameLink;
            $match['localNameImage'] = $localNameImage;
            $match['localResult'] = $localResult;

            $match['visitorName'] = $visitorName;
            $match['visitorNameLink'] = $visitorNameLink;
            $match['visitorNameImage'] = $visitorNameImage;
            $match['visitorResult'] = $visitorResult;
            array_push($matches, $match);
        }
    }
    //print_r(json_encode($matches));
    $jsonURL = str_replace("/", "-", str_replace("https://www.fcf.cat/calendari/2324/futbol-sala/", "", $url));

    // echo $jsonURL;

    if ($foundTeam == 1) {

        // printR($leaguesWithTeams);
        file_put_contents("jsons/$jsonURL.json", json_encode($matches));
        return $url;
    }
}

$j = file_get_contents("fcfGroups.json");
//printR(json_decode($j));
$a = 0;
foreach (json_decode($j) as $league) {
    if ($a < 11111150) {
        $lwt = parseLeagues($league, $searchTeams, $mysqli);
        if ($lwt) {
            array_push($leaguesWithTeams, $lwt);
        }
    }
    $a++;
}
$searchTeam = str_replace(".", "", strtolower($searchTeam));
$searchTeam = str_replace(" ", "-", $searchTeam);
file_put_contents("lligues_$searchTeam.json", json_encode($leaguesWithTeams));
printR(get_defined_vars());
