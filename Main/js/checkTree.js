/*
 * My algorithm is listed below to check the allocation percentages
 * for each level of the tree.
 * 
 *  - Wellesley Arreza 
 */


var checkflag;
var tree;
var strategy;
var strategyID;
function initialize(){
 checkflag=true;
 tree=$('.tree');
 strategy=$('.tree').children('ul').children('li'); // a singular strategy
//strategy=$('#Asia');
 strategyID=$(strategy).attr("id");
}

    
function recursiveCheck(parent,object){
    
    
var current,drift,target,name,parent,node_id, allocationSum;
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


allocationSum=0;

// if you hit a leaf node.
if( $(object).children("ul").children().length< 1){
console.log($(object).children(".node").children(".name").text());
console.log("hit leaf node");
return parseInt(target); // there is no children. This is the base case.
}


$(object).children("ul").children().each( function(){
// we recursively call for each child of the object.    
allocationSum+=recursiveCheck(object, this); // sum the children allocations together.

});

    
    if(allocationSum!=100){
    console.log("Current child : "+ name);
    checkflag=false;
}

return parseInt(target); // return node's allocation.

}



$(document).ready(function() {


initialize();















    function checkSum(){
    // for each node
    // get the sum
    // if it all equals 100% ur good.
    var sum=0;
    
    // for each node
    // check if children below one level sums to 100%
    
    
    
    
    $(".allocation.showVal").each( function(){
        console.log("class"+$(this));
        var val=parseInt($(this).text());
        
        console.log("sum"+sum);
        console.log("val"+val);
        if((sum+val)>100){
            console.log("error");
            return false;
        }
        else{
            sum+=val;
        }
    });
    
    if(sum==100){
        return true;
    }
    else{
        console.log("Only this much"+ sum);
        return false;
    }   
}

    
    
     $("#stratCheck").on("click", function() {
         
     /*    
         if(checkSum()){
             alert("Good total");
         }
         else{
             alert("Invalid total");
         }
    */
   checkflag=true;
   recursiveCheck("",strategy);
if(checkflag){
    console.log("good balance");
    alert("good balance");
}
else{
    
    console.log("bad balance");
    alert("bad balance");
    
}
     
     });
    
});