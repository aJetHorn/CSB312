/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
  
   // flag for determining whether or not to show delete button.
   var deleteTrue=false;
   // when user wants to delete nodes
   // click on delete mode.
   // add handler to handle deletes.
   
   $("#deleteOn").on("click",function(){
       if(!deleteTrue){
       var htmltext="<button class='deleteButton'><i class='fa fa-times fa-1x fa-fw'></i></button>";
       $(".node").prepend(htmltext); 
   $(".deleteButton").on("click",function(){
      $(this).parent().parent().remove(); 
   });
   
        deleteTrue=true;
       }
       else if(deleteTrue){
           $('.deleteButton').remove();
           deleteTrue=false;
       }
    
       
   });
   

    
});

