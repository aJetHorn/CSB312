/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
   $('#leftmenu').on('mouseover',function(){
       $(this).css("opacity","1.0");
   });
   $('#leftmenu').on('mouseleave',function(){
       $(this).css("opacity",".2");
   }); 
});