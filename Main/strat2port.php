<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This php file is used for allowing the user to delete strategies from the hub page.
 * 
 */
include 'dbmgr.php';

$db = new Dbmgr();
$strategy=$_POST['slist'];
$portfolio=$_POST['plist'];
$allocation=$_POST['quantity'];
if (!empty($strategy) && !empty($portfolio)) {
    
    // for each strategy add to port
    
    $array=$db->get_unique_sid_pid($portfolio,$strategy);
    if(empty($array)){
        $db->addStrat2Port($strategy, $portfolio,$allocation);
    }
    else{
        $db->updateStrat2Port($strategy, $portfolio, $allocation);
    }
    
    header("Location: ../Main/hub.php");
} else {
    echo "error";
}