/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var collapseTrue=false;

$(document).ready(function() {
    
    
    
    $("#collapseBtn").on("click",function(){
       
       // toggle.
        if(collapseTrue){
            collapseTrue=false;
            console.log("toggle collapsefalse");
        }
        else{
            collapseTrue=true;
            console.log("toggle collapseTrue");
        }
        
    });
    
    
    $("a").on("click",function(){
        
        if(collapseTrue){
         $(this).parent().children("ul").toggle();
         console.log("collapse");
     }
      console.log("finish collapse");
    });
    
});