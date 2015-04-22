<?php

include 'dbmgr.php';

$db= new Dbmgr();
$lst=$db->getAllNodes();
$length= sizeof($lst);
/*
for($i=0; $i<$length; $i++){
    echo "\r\n";
    echo $lst[$i]->name;
    echo "\r\n";
}
*/

$myJSONString = json_encode($lst);
header('Content-type: application/json');
echo $myJSONString;
//echo serialize($lst);
//echo implode(",",$lst);

