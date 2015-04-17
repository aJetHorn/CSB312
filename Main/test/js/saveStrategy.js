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
    
   
    
var array=[];
var counter=0;


var tree=$('.tree');
var strategy=$('.tree').children('ul').children('li'); // a singular strategy
//strategy=$('#Asia');

recursiveStore("",strategy);

function recursiveStore(parent,object){
var current,drift,target,name;
current= $(object).children('.node').children('.current').text();
drift=$(object).children('.node').children('.drift').text();
target=$(object).children('.node').children('.target').text();
name=$(object).children('.node').children('.name').text();

var nodeHolder= new Object();
nodeHolder.asset_type="null";
nodeHolder.strategy_id="2";//$(strategy).attr("id");
nodeHolder.asset_id=name;
nodeHolder.target_pct=target;
nodeHolder.drift=drift;
nodeHolder.current=current;
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


$(object).children("ul").children().each( function(){
// we recursively call for each child of the object.    
recursiveStore(object, this);

});

array[counter]=nodeHolder;
counter++;
console.log("iteration "+ counter +" \n");
console.log(nodeHolder);
console.log("\n");
return;

}

console.log("Length of array "+ array.length);


$.ajax({
            url: 'saveStrategy.php',
            type: 'post',
            data: {'tree' : array, 'name': $(strategy).attr("id") },
            success: function(data, status) {

                //console.log("Successful ajax call data . Status : " + status);
                console.log("Successful ajax call data . Status : " + data);
                
            },
            error: function(xhr, desc, err) {
                console.log("Not Successful ajax call");
            }

        });





});
