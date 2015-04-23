/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
$( ".drag" ).draggable({
      appendTo: "body",
      helper: "clone"
    });
    
      
      
    $( ".drop" ).droppable({
      drop: function( event, ui ) {
          console.log("YAY");
         ui.draggable.parent().appendTo( $(this). parent().children("ul")) ;
        //console.log(ui.draggable.text());
      }
    });
    });