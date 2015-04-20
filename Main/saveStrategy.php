<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include 'dbmgr.php';

$db= new Dbmgr();
$db->getDBConnection();
$db->storeStrategy();
//$db->createStrategyID();
