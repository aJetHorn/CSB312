/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var target=false;
var drift=false;
var current=false;

$(document).ready(function() {
    $("#targetsBox").click();
    $(".drift").toggle();
    $(".current").toggle();
    target=true;
    
    $("#positionsBox").on("click", function(){
       if(target){
           $("#targetsBox").prop('checked', false);
           $(".allocation").toggle();
           target=false;
       }
       
       if(drift){
           $("#driftsBox").prop('checked', false);
           $(".drift").toggle();
           drift=false;
       }       
       
       
       $(".current").toggle(); 
        current=true;
    });
    
    $("#targetsBox").on("click", function(){
       
       if(current){
           $("#positionsBox").prop('checked', false); // uncheck
           $(".current").toggle(); // filter data
           current=false;
       }
       
       if(drift){
           $("#driftsBox").prop('checked', false); // uncheck
           $(".drift").toggle(); // filter data
           drift=false;
       }  
       
      
       $(".allocation").toggle();
       target=true;
        
    });
    
    $("#driftsBox").on("click", function(){
       
       if(current){
           $("#positionsBox").prop('checked', false); // uncheck
           $(".current").toggle(); // filter data
           current=false;
       }

       if(target){
           $("#targetsBox").prop('checked', false);
           $(".allocation").toggle();
           target=false;
       }
       
       $(".drift").toggle();
       drift=true;
        
    });
});


