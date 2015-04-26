/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// get node id.
// append name and allocation to unordered list of node.

$(document).ready(function() {
    var treeval = $(".root").children(".node").children(".name").text();
    var treeid = $(".root").attr("id");
    $("#parentList").append("<option value='" + treeval + "' nodeID='" + treeid + "'>" + treeval + "</option>");

    $("#customAdd").on("click", function(){ 
    console.log("onlcick");
        var parentId = $("#parentList").find(":selected").attr("nodeID");
        var parentVal = $("#parentList").find(":selected").attr("value");
        var time = Math.floor( new Date().getMilliseconds());
        var id = $("#inputName").val().replace(/\s+/g, '') + time; // remove white space
        var htext = "<li id='" +
                id +
                "'>" +
                "<a href='#' class='node drop ui-droppable'>" +
                "<div class='name'>" +
                $("#inputName").val() +
                "</div>" +
                "<div class = 'allocation showVal' >" + $("#inputAlloc").val() + "</div>" +
                "<div class = 'percent showVal' > % </div>" +
                "</a>" +
                "<ul class='showParent'>" +
                "</ul>" +
                "</li>";
        $("#" + parentId).children("ul").append(htext);
        
        
        // change css
            var width=Math.ceil(parseInt($(".tree").width()))+50;
            $(".tree").css("width",""+width);
            console.log(""+width+"px");
            
            // update parentList.
            $("#parentList").append("<option value='"+$("#inputName").val()+"' nodeID='"+id+"'>"+$("#inputName").val()+"</option>");
            refreshHandlers();

    });

});