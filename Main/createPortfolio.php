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

$db= new Dbmgr();
if(!empty($_POST['newPortfolio'])){
    $db->addPortfolio($_POST['newPortfolio']);
    header("Location: ../Main/hub.php");
}
else{
    echo "error";
}
