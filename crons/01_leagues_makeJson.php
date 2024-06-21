<?php
$arrayGroups = [];
$idSeason = 19;
$idCategory = 19308236;
//f11: 19308233, f7:19308235, f5:24885364, fs:19308236, fem:19308237,fsfem:24694879,beach:19308239
// carrego totes les lligues
function printR($array)
{
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}
function curl_leagues($idSeason, $idCategory)
{
    $url = "https://www.fcf.cat/cargar_competiciones";
    $curl = curl_init();
    $fields = array("temporada" => $idSeason, "categoria" => $idCategory);
    $fp = fopen(dirname(__FILE__) . '/errorlog.txt', 'w');
    curl_setopt($curl, CURLOPT_VERBOSE, 1);
    curl_setopt($curl, CURLOPT_STDERR, $fp);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, TRUE);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:multipart/form-data'));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    $html = curl_exec($curl);
    //print_r($response);
    curl_close($curl);
    return $html;
}
function curl_groups($idSeason, $idCategory, $idLeague)
{
    $url = "https://www.fcf.cat/cargar_grupos";
    $curl = curl_init();
    $fields = array("tipo" => "futbol-sala", "categoria" => $idCategory,  "competicion" => $idLeague, "temporada" => $idSeason);
    $fp = fopen(dirname(__FILE__) . '/errorlog.txt', 'w');
    curl_setopt($curl, CURLOPT_VERBOSE, 1);
    curl_setopt($curl, CURLOPT_STDERR, $fp);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, TRUE);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:multipart/form-data'));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    $html = curl_exec($curl);
    //print_r($response);
    curl_close($curl);
    return $html;
}
$returnedHtml = curl_leagues($idSeason, $idCategory);
$dom = new DOMDocument();
$dom->loadHTML($returnedHtml);
$ps = $dom->getElementsByTagName('p');
foreach ($ps as $league) {
    $idLeague = $league->attributes[2]->nodeValue;
    echo "<hr ><h1>" . $idLeague . " " . utf8_decode($league->nodeValue) . "</h1>";
    $groupsPerLeagueHtml = curl_groups($idSeason, $idCategory, $idLeague);
    //printR($groupsPerLeagueHtml);
    $dom2 = new DOMDocument();
    $dom2->loadHTML($groupsPerLeagueHtml);
    $as = $dom2->getElementsByTagName('a');
   // printR($as);
    foreach ($as as $group) {
        $idGroup = $group->attributes[1]->nodeValue;
        echo "<div style='background-color:#ccc; margin:5px; padding:5px;'>" . $idGroup . " " . utf8_decode($group->nodeValue) . "</div>";
      array_push( $arrayGroups,$idGroup);
    }
}
print_r($arrayGroups);
file_put_contents('fcfGroups.json', json_encode($arrayGroups));
/* 
$returnedHtml= curl_groups(19,19308236,49734121);
$dom = new DOMDocument();
$dom->loadHTML($returnedHtml);
$as = $dom->getElementsByTagName('a');
foreach ($as as $group) {
    $idGroup = $group->attributes[1]->nodeValue;
    echo "<div style='background-color:#ccc; margin:5px; padding:5px;'>" . $idGroup . " " . utf8_decode($group->nodeValue) . "</div>";
} */
