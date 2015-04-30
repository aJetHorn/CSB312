<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * This php file allows use to save strategies.
 * // there are two options
 * 
 * new 
 * New is for the createStragepage.php
 * 
 * edit
 * edit is for editing a current strategy.
 * 
 * - Wellesley Arreza
 */
include 'dbmgr.php';

$db= new Dbmgr();
if($_POST['phase']=== 'new'){
    $db->storeStrategy();
}

else if($_POST['phase']=== 'edit'){
    
    if(!empty($_POST['Stratid'])){
        $db->editStrategy($_POST['Stratid']);
    }
    
    
}
else{
    echo "error";
}


