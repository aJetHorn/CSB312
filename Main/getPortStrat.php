<?php

include 'dbmgr.php';

$sList = array();
$db = new Dbmgr();
$val = $_GET['portfolioID'];
if (!empty($val)) {
   
    $sList=$db->getPortStrat($val);

    $myJSONString = json_encode($sList);
    header('Content-type: application/json');
    echo $myJSONString;
    //echo $sList;
} else {
    echo "error";
}