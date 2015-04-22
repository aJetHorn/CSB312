/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


$(document).ready(function() {


    $.ajax({
        datatype: 'json',
        url: 'renderStrategy.php',
        type: 'get',
        data: {'strategyID': "18"},
        success: function(data, status) {

            //console.log("Successful ajax call data . Status : " + status);
            console.log("Successful ajax call data . Status : ");
            console.log(data);
            console.log("length " + Object.keys(data).length);
            // sample json access. data[0].id;
            printTree(data, Object.keys(data).length);
        },
        error: function(xhr, desc, err) {
            console.log("Not Successful ajax call");
            console.log(err);
        }

    });

    function printTree(data, length) {
        var array = data; // temp JSON array

        // first find the tree "root"
        for (var i = 0; i < length; i++) {
            // if parent is "" or empty.

            // then we found the root. print tree root out
            // dequeue the array of the tree root.
            // break loop

            if (array[i].parent === "") {
                var htmltext = "<li id='" +
                        array[i].id +
                        "'>" +
                        "<a href='#' class='node'>" +
                        "<div class='name'>" + array[i].name + "</div>" +
                        "<div class='current hideVal'>" + "</div>" +
                        "<div class='drift hideVal'>" + "</div>" +
                        "<div class='allocation showVal'>" + "</div>" +
                        "<div class='percent showVal' >" + "</div>" +                               
                        "</a>" +
                        "<ul class='showParent'>" +
                        "</ul>" +
                        "</li>";


                $(".tree").children("ul").append(htmltext);
                 array.splice(i, 1);
                 break;
                
            }
        }
        console.log(array);


        // if tree root does exist. continue to printing children.
        var x = 0;
       
        while (array.length>0) {
            console.log("x = "+x);
        var str=array[x].parent;
        console.log(str);
            // find the parent
            
            
            if(array[x].parent==="" || array[x].parent===0 ){
                console.log("top parent");
                x++;
            }
            else{
            
            if ($('.tree').find("#"+str).length === 1) {
                // if parent exists.
                // append node to parent.
                var htmltext = "<li id='" +
                        array[x].id +
                        "'>" +
                        "<a href='#' class='node'>" +
                        "<div class='name'>" +
                        array[x].name +
                        "</div>" +
                        "<div class = 'allocation hideVal' >" + array[x].targetpct + "</div>" +
                        "<div class = 'percent showVal' > % </div>" +
                        "</a>" +
                        "<ul class='showParent'>" +
                        "</ul>" +
                        "</li>";
                
                $('#' + array[x].parent).children('ul').append(htmltext);



                // dequeue array of node.
                 //array.splice(index,howmany,item1,.....,itemX)
                array.splice(x, 1);
                x++;
            }
            else {
                // wait until parent is created.
                x++;
            }
            
            
            }
            
           

            console.log("length :" + array.length);

            // reset array.
            if (x >= array.length) {
                x = 0;
            }


        }

        // if while loop takes longed than 35 seconds. quit.

    }

    function findParent(node) {

    }

    function printParent(node) {

    }


});