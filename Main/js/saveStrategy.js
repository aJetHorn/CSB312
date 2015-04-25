/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * Every object should have a node_id, asset_type, strategy_id, asset_id, target_pct
 * 
 * 
 */

$(document).ready(function() {
    
$("#stratSubmit").on("click",function(){   
    console.log("yo clicked");
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


$.ajax({
            url: 'saveStrategy.php',
            type: 'post',
            data: {'tree' : array, 'Stratname': $(strategy).attr("id") },
            success: function(data, status) {

                //console.log("Successful ajax call data . Status : " + status);
                console.log("Successful ajax call data . Status : " + data);
                
            },
            error: function(xhr, desc, err) {
                console.log("Not Successful ajax call");
            }

        });





}); // end of button handler.




}); // end of document ready