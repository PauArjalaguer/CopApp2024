<?php
error_reporting(E_ALL & ~E_NOTICE  & ~E_WARNING & ~E_DEPRECATED);
$url = $_GET['url'];
$dom = new DOMDocument();
$html = $dom->loadHTMLFile($url);
$dom->preserveWhiteSpace = true;
$select  = $dom->getElementsByTagName('select');
$selectRounds = $select[2];
$xpath = new DomXPath($dom);
$rounds = $xpath->query("//table[@class='calendaritable']");
$matches=[];
foreach ($rounds as $round) {
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
        $match = ['fixture' => $idRound];
        $match['matchDate'] = $matchDate;
        $match['local'] = $localName;
        $match['localNameLink'] = $localNameLink;
        $match['localImage'] = $localNameImage;
        $match['localResult'] = $localResult;
        $match['visitor'] = $visitorName;
        $match['visitorNameLink'] = $visitorNameLink;
        $match['visitorImage'] = $visitorNameImage;
        $match['visitorResult'] = $visitorResult;
        array_push($matches, $match);
    }
}
echo json_encode($matches);
?>
