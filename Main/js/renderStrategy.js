/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * My printTree algorithm basically takes the nodes from the database
 * and outputs them into the page in correct order.
 */

$(document).ready(function () {

    console.log($("#selection").val());
    $.ajax({
        datatype: 'json',
        url: 'renderStrategy.php',
        type: 'get',
        data: {'strategyID': $("#selection").val()},
        success: function (data, status) {

            //console.log("Successful ajax call data . Status : " + status);
            console.log("Successful ajax call data . Status : ");
            // console.log(data[0].parent);
            //console.log("length " + Object.keys(data).length);
            // sample json access. data[0].id;
            //console.log(data[0]);
            
            main(data);
            //printTree(data, Object.keys(data).length);
            
            initialize();
            refreshHandlers();
        },
        error: function (xhr, desc, err) {
            console.log("Not Successful ajax call");
            console.log(err);
        }

    });




    var childrenList;
    var parentList=[];
    var c=0;
    function main(data) {
        childrenList = data;
        console.log(childrenList.length);
        console.log(childrenList);
        var i;
        var parent;
        for(i=0; i<data.length; i++){
            parentList[i]=data[i].id;
        }
        
        
        for (i = 0; i < childrenList.length; i++) {
            if (childrenList[i].parent === "") {
                parent = childrenList[i];
                childrenList.splice(i, 1);
                console.log(childrenList);
            }
        }

        var finalNode = getChild(parent);
        console.log(finalNode);
        

    }


    // remember to make a list of children
    // every time I delete a member, the ordering gets messed up after I return from previous recursions.
    // fix this

    function getChild(node) {
        console.log("current node: "+ node.id);
        var i;
        /*if (node === null) {
            return;
        }*/
        if (node.children === undefined) {
            console.log("new");
            node.children = [];
        }

        for (i = childrenList.length-1; i>-1 ; i--) {
            // for each node
            console.log("Next child "+childrenList[i].id+" for current node "+ node.id);
            if (node.id === childrenList[i].parent) {
                var node2 = getChild(childrenList[i]);
                //console.log(node);
                //console.log(node.children);
                //console.log(node2);
                node.children.push(node2);
                childrenList.splice(i, 1);
                console.log(childrenList[1]);
                i=childrenList.length-1;
                // remove child from child list.

            }

        }

        console.log("--------------------------------------");
        return node;



    }




    function printTree(data, length) {

        //main(data);
        //root.children.push({"name": "Node", "status": "pending"});
        var jsonObject = [];
        var array = data; // temp JSON array
        // console.log(array);
        // first find the tree "root"
        for (var i = 0; i < length; i++) {
            // if parent is "" or empty.

            // then we found the root. print tree root out
            // dequeue the array of the tree root.
            // break loop

            if (array[i].parent === "") {
                var htmltext = "<li class='root' id='" +
                        array[i].id +
                        "'>" +
                        "<a href='#' class='node drop' id=''>" +
                        "<div class='name'>" + array[i].name + "</div>" +
                        "<div class='current hideVal'>" + "</div>" +
                        "<div class='drift hideVal'>" + "</div>" +
                        "<div class='allocation hideVal'>" + "</div>" +
                        "<div class='percent hideVal' >" + "</div>" +
                        "</a>" +
                        "<ul class='showParent'>" +
                        "</ul>" +
                        "</li>";


                $(".tree").children("ul").append(htmltext);
                jsonObject = array[i];
                array.splice(i, 1);
                break;

            }
        }
        console.log(jsonObject);

        var currentObject = jsonObject;
        // if tree root does exist. continue to printing children.
        var x = 0;

        while (array.length > 0) {
            console.log("x = " + x);
            var str = array[x].parent;
            console.log(str);
            // find the parent


            if (array[x].parent === "" || array[x].parent === 0) {
                console.log("top parent");
                x++;
            }
            else {

                if ($('.tree').find("#" + str).length === 1) {
                    // if parent exists.
                    // append node to parent.
                    var htmltext = "<li id='" +
                            array[x].id +
                            "'>" +
                            "<a href='#' class='node drop' id=''>" +
                            "<div class='name'>" +
                            array[x].name +
                            "</div>" +
                            "<div class = 'allocation showVal' >" + array[x].targetpct + "</div>" +
                            "<div class = 'percent showVal' > % </div>" +
                            "</a>" +
                            "<ul class='showParent'>" +
                            "</ul>" +
                            "</li>";

                    $('#' + array[x].parent).children('ul').append(htmltext);

                    // update parentList.
                    $("#parentList").append("<option value='" + array[x].name + "' nodeID='" + array[x].id + "'>" + array[x].name + "</option>");
                    refreshHandlers();


                    // check if children field exists
                    // jsonObject['children'] returns false if DNE.
                    // if so, do this object1.children=[];
                    // then append

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

        // initialize checktree variables
        initialize();


    }

    function findParent(node) {

    }

    function printParent(node) {

    }


});