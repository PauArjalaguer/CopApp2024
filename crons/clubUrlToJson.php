<?php
error_reporting(E_ALL & ~E_NOTICE  & ~E_WARNING & ~E_DEPRECATED);
$url = $_GET['url'];
$dom = new DOMDocument();
$html = $dom->loadHTMLFile($url);
$dom->preserveWhiteSpace = true;
$select  = $dom->getElementsByTagName('select');
$selectRounds = $select[2];
$xpath = new DomXPath($dom);
$teams = $xpath->query("//table[@class='fcftable w-100 mb-15']");
$teamsA = [];
foreach ($teams as $team) {
    $teamName = $team->childNodes[1]->childNodes[1]->nodeValue;
    $link = $team->childNodes[1]->childNodes[1]->childNodes[0]->attributes[0]->nodeValue;

    $teamA = ['teamName' => $teamName];
    $teamA['link'] = $link;
    $l = explode("/", $link);
    $b = explode("-", $link);
    $n=count($b)-1;
$teamA['category']=$l[5];
    $teamA['idTeam'] = $l[5]."_".$b[$n];
    if(strpos($_GET['tString'], $teamA['idTeam'])) {$teamA['isActive']=1;}else{$teamA['isActive']=0;}
    array_push($teamsA, $teamA);
}

echo json_encode($teamsA);
