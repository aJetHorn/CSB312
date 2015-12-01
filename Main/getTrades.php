<?php

include 'dbmgr.php';

$sList = array();
$db = new Dbmgr();
$val = $_GET['portfolioID'];
if (!empty($val)) {
   
    $buys=$db->getBuys($val);
    $sells=$db->getSells($val);
    $trades=[];
    $trades[0]=$buys;
    $trades[1]=$sells;
    
    $myJSONString = json_encode($trades);
    header('Content-type: application/json');
    echo $myJSONString;
    //echo $sList;
} else {
    echo "error";
}