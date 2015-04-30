/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {
    $("#leftmenu").toggle();
    $(".navbar-brand").on("click",function(){
        $("#leftmenu").toggle();
        $("#main").css("width","77%");
    });
    
    
    
});