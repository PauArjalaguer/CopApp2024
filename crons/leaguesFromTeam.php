<?php
$json = file_get_contents($_GET['url']);
//
$a = json_decode($json);
foreach($a as $league){
  //  echo "<pre>";print_r($league);echo "</pre>";
  if($league->teamName==$_GET['teamName'] && $league->teamCategory==$_GET['teamCategory'] ){
    echo "<br />".$league->leagueUrl;
  }
}