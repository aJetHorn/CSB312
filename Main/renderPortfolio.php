<?php

/*
 * Get Portfolio Data from DB.
  -Wes
 */
include 'dbmgr.php';

$sList = array();
$db = new Dbmgr();
$val = $_GET['portfolioID'];
if (!empty($val)) {
    $lst = $db->getStrategyIDs2($val);
    $i = 0;
    for ($i = 0; $i < sizeof($lst); $i++) {
        $slist[$i] = $db->getAllNodes($lst[$i]);
    }

    $myJSONString = json_encode($slist);
    header('Content-type: application/json');
    echo $myJSONString;
    
} else {
    echo "error";
}
