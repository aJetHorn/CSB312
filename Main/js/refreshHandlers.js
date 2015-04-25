/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    function refreshHandlers() {

        console.log("refresh");
        
                    $(".node").on("click", function() {
        
        if(nodeSelected!== ""){
                $(nodeSelected).removeClass('colored');
            }
        nodeSelected = $(this);
        $(nodeSelected).addClass('colored');
        console.log("new node selected " + nodeSelected);
    });
        
        
        $(".drop").droppable({
            drop: function(event, ui) {
                console.log("YAY");
                //ui.draggable.children("dragtext").text().appendTo( $(this). parent().children("ul")) ;
               var time = Math.floor( new Date().getMilliseconds());
                var id = ui.draggable.children(".dragtext").text().replace(/\s+/g, '') + time; // remove white space
                var htmltext = "<li id='" +
                        id +
                        "'>" +
                        "<a href='#' class='node drop ui-droppable'>" +
                        "<div class='name'>" +
                        ui.draggable.children(".dragtext").text() +
                        "</div>" +
                        "<div class = 'allocation showVal' >" + "0" + "</div>" +
                        "<div class = 'percent showVal' > % </div>" +
                        "</a>" +
                        "<ul class='showParent'>" +
                        "</ul>" +
                        "</li>";



                $(this).parent().children("ul").append(htmltext);
                          
            $("#parentList").append("<option value='"+ui.draggable.children(".dragtext").text()+"' nodeID='"+id+"'>"+ui.draggable.children(".dragtext").text()+"</option>");

                //console.log(event);
                //console.log("id"+ "#"+id);

                // set the handler to change the currently selected node.
                $("#" + id).on("click", function() {
                    //console.log("clickity click");
                    nodeSelected = $(this).children('.node');
                    //console.log("new node selected "+ nodeSelected );
                });
                //console.log(ui.draggable.text());
                refreshHandlers();
            }
        });
        
    }
    
    $(".deleteButton").on("click",function(){
      $(this).parent().parent().remove(); 
   });


});