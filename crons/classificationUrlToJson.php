<?php
error_reporting(E_ALL & ~E_NOTICE  & ~E_WARNING & ~E_DEPRECATED);
$url = $_GET['url'];
$dom = new DOMDocument();
$html = $dom->loadHTMLFile($url);
$dom->preserveWhiteSpace = true;
$select  = $dom->getElementsByTagName('select');
$selectRounds = $select[2];
$xpath = new DomXPath($dom);
$classification = $dom->getElementsByTagName('table');
$classificationA=[];

  //echo "<pre>"; print_r($classification[1]->childNodes[3]->childNodes); echo "</pre>";
    foreach ($classification[1]->childNodes[3]->childNodes as $row) {       
        if($row->tagName=='tr'){
$p= explode(" ",$row->childNodes[9]->nodeValue);
$points=$p[0];
            $class= ['position' =>$row->childNodes[1]->nodeValue];
            $class['teamName']=$row->childNodes[5]->nodeValue;
            $class['teamImgSrc']=$row->childNodes[3]->childNodes[0]->childNodes[0]->childNodes[0]->attributes[2]->nodeValue;
            $class['points'] = $points;
            $class['played'] = $row->childNodes[19]->nodeValue;
            $class['won'] = $row->childNodes[21]->nodeValue;
            $class['draw'] = $row->childNodes[23]->nodeValue;
            $class['lost'] = $row->childNodes[25]->nodeValue;
            array_push($classificationA, $class);
           
        }
    
    }
echo json_encode($classificationA);
?>
