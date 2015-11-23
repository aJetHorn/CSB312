<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include 'dbmgr.php';

$db = new Dbmgr();

$array=$_POST['buys_array'];
if (!empty($_POST['buys_array'])) {
    print_r($array);
    for($i=0;$i<sizeof($array); $i++){
        $obj=$array[$i];
       
        $db->insertTrades($obj['asset_id'],$obj['amount'],$obj['pid'],$obj['action']);
    }
    
} else {
    echo "error";
}