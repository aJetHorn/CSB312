/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * My algorithm is listed below to gather all of the nodes in the tree
 * and put them into an array that we can save in the database.
 * - Wellesley Arreza
 * Every object should have a node_id, asset_type, strategy_id, asset_id, target_pct
 * 
 * 
 */

$(document).ready(function() {
    
     var time = Math.floor( new Date().getMilliseconds());
     var id = "StrategyName" + time;
     $(".root").attr("id",id);
    
    
    
$("#stratSubmit").on("click",function(){ 
    
    $("#stratCheck").click();
    console.log(checkflag);
    
if(!checkflag){
    console.log("bad balance");
    alert("Tree is not balanced. Check again.");
    
}
else{
    console.log("good balance");
    alert("Strategy Saved.");
    
    
    



 var time = Math.floor( new Date().getMilliseconds());
            var id = $(".root").children(".node").children(".name").text() + time;
            $(".root").attr("id",id);    
    
    
console.log("yo clicked");

var phase=$("#phase").attr("value"); // tells whether user is creating or editing. values = { edit OR new }

var array=[];
var counter=0;


var tree=$('.tree');
var strategy=$('.tree').children('ul').children('li'); // a singular strategy
//strategy=$('#Asia');
var strategyID=$(strategy).attr("id");

recursiveStore("",strategy);

function recursiveStore(parent,object){
    
    
var current,drift,target,name,parent,node_id;
current= $(object).children('.node').children('.current').text();
drift=$(object).children('.node').children('.drift').text();
target=$(object).children('.node').children('.allocation').text();
name=$(object).children('.node').children('.name').text();
parent=$(object).parent().parent("li").attr('id');
node_id=$(object).attr('id');


var nodeHolder= new Object();
nodeHolder.node_id=node_id;
nodeHolder.asset_type="";
nodeHolder.strategy_id=strategyID;
nodeHolder.asset_id="";
nodeHolder.target_pct=target;
nodeHolder.drift=drift;
nodeHolder.current=current;
nodeHolder.parent=parent;
nodeHolder.name=name;
//nodeHolder.parent=parent.attr('id'); // make sure this a node_id.
//
// if you hit a leaf node.
if( $(object).children("ul").children()< 1){
array[counter]=nodeHolder;
counter++;
console.log(nodeHolder);
console.log("\n");
return; // there is no children. This is the base case.
}
else{

array[counter]=nodeHolder;
counter++;
console.log("iteration "+ counter +" \n");
console.log(nodeHolder);
console.log("\n");    
        
}


$(object).children("ul").children().each( function(){
// we recursively call for each child of the object.    
recursiveStore(object, this);

});


return;

}

console.log("Length of array "+ array.length);

// if phase == new
if(phase==='new'){

$.ajax({
            url: 'saveStrategy.php',
            type: 'post',
            data: {'tree' : array, 'Stratname': $(strategy).attr("id"), 'phase' : phase  },
            success: function(data, status) {

                //console.log("Successful ajax call data . Status : " + status);
                console.log("Successful ajax call data . Status : " + data);
                window.location.href = "../Main/hub.php";
            },
            error: function(xhr, desc, err) {
                console.log("Not Successful ajax call");
            }

        });


}
else if(phase==='edit'){
// if phase== edit


$.ajax({
            url: 'saveStrategy.php',
            type: 'post',
            data: {'tree' : array, 'Stratname': $(strategy).attr("id"), 'phase' : phase, 'Stratid': $('#selection').attr('value')},
            success: function(data, status) {

                //console.log("Successful ajax call data . Status : " + status);
                console.log("Successful ajax call data . Status : " + data);
                window.location.href = "../Main/hub.php";
            },
            error: function(xhr, desc, err) {
                console.log("Not Successful ajax call");
            }

        });




}


} // end of else statement

}); // end of button handler.




}); // end of document ready