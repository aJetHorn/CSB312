/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 
 Wellesley Arreza
 09/07/2015
 
 */


var counter = 0;
var finalNode;


/*
 * 
 * Some tips
 * 
 * You may notice "d" as an argument in some of these functions.
 * 
 * "d" is a JSON object. It contains data about each node.
 * Do a console.log or debug to check the "d" attributes.
 * 
 *
 *
 *
 *
 */


$(function () {
    $("#tableView").hide();


    var childrenList;
    var parentList = [];

    var treeJSON = d3.json("./js/new.json", function (error, treeData) {
        //treeData = finalNode;
        //console.log(JSON.stringify(finalNode));
        // set the start node's id.
        treeData.id = "node" + Math.floor(new Date().getTime() / 1000);

        // Calculate total nodes, max label length
        var totalNodes = 0;
        var maxLabelLength = 0;
        // variables for drag/drop
        var selectedNode = null;
        var draggingNode = null;
        // panning variables
        var panSpeed = 200;
        var panBoundary = 20; // Within 20px from edges will pan when dragging.
        // Misc. variables
        var i = 0;
        var duration = 750;
        var root;



        var dragStarted;
        var clicked = false;


        // size of the diagram
        var viewerWidth = $(".row").width();
        var viewerHeight = $(document).height();

        var tree = d3.layout.tree()
                .size([viewerHeight, viewerWidth]);

        // define a d3 diagonal projection for use by the node paths later on.
        var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [d.x, d.y];
                });

        // A recursive helper function for performing some setup by walking through all nodes

        function visit(parent, visitFn, childrenFn) {
            if (!parent)
                return;

            visitFn(parent);

            var children = childrenFn(parent);
            if (children) {
                var count = children.length;
                for (var i = 0; i < count; i++) {
                    visit(children[i], visitFn, childrenFn);
                }
            }

            return;
        }

        // Call visit function to establish maxLabelLength
        visit(treeData, function (d) {
            totalNodes++;
            maxLabelLength = 12;// Math.max(d.name.length, maxLabelLength);  // max length for connector

        }, function (d) {
            return d.children && d.children.length > 0 ? d.children : null;
        });


        // sort the tree according to the node names

        function sortTree() {
            tree.sort(function (a, b) {
                return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
            });
        }
        // Sort the tree initially incase the JSON isn't in a sorted order.
        sortTree();

        // TODO: Pan function, can be better implemented.

        function pan(domNode, direction) {
            var speed = panSpeed;
            if (panTimer) {
                clearTimeout(panTimer);
                translateCoords = d3.transform(svgGroup.attr("transform"));
                if (direction == 'left' || direction == 'right') {
                    translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                    translateY = translateCoords.translate[1];
                } else if (direction == 'up' || direction == 'down') {
                    translateX = translateCoords.translate[0];
                    translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
                }
                scaleX = translateCoords.scale[0];
                scaleY = translateCoords.scale[1];
                scale = zoomListener.scale();
                svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
                d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
                zoomListener.scale(zoomListener.scale());
                zoomListener.translate([translateX, translateY]);
                panTimer = setTimeout(function () {
                    pan(domNode, speed, direction);
                }, 50);
            }
        }

        // Define the zoom function for the zoomable tree

        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }


        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        var zoomListener = d3.behavior.zoom().center([viewerWidth / 2, viewerHeight / 2]).scaleExtent([0.1, 3]).on("zoom", zoom);

        function initiateDrag(d, domNode) {
            draggingNode = d;
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
            d3.select(domNode).attr('class', 'node activeDrag');

            svgGroup.selectAll("g.node").sort(function (a, b) { // select the parent and sort the path's
                if (a.id != draggingNode.id)
                    return 1; // a is not the hovered element, send "a" to the back
                else
                    return -1; // a is the hovered element, bring "a" to the front
            });
            // if nodes has children, remove the links and nodes
            if (nodes.length > 1) {
                // remove link paths
                links = tree.links(nodes);
                nodePaths = svgGroup.selectAll("path.link")
                        .data(links, function (d) {
                            return d.target.id;
                        }).remove();
                // remove child nodes
                nodesExit = svgGroup.selectAll("g.node")
                        .data(nodes, function (d) {
                            return d.id;
                        }).filter(function (d, i) {
                    if (d.id == draggingNode.id) {
                        return false;
                    }
                    return true;
                }).remove();
            }

            // remove parent link
            parentLink = tree.links(tree.nodes(draggingNode.parent));
            svgGroup.selectAll('path.link').filter(function (d, i) {
                if (d.target.id == draggingNode.id) {
                    return true;
                }
                return false;
            }).remove();

            dragStarted = null;
        }

        // define the baseSvg, attaching a class for styling and the zoomListener
        var baseSvg = d3.select("#tree-container").append("svg")
                .attr("width", viewerWidth)
                .attr("height", viewerHeight)
                .attr("class", "overlay")
                .call(zoomListener);


        // Define the drag listeners for drag/drop behaviour of nodes.
        dragListener = d3.behavior.drag()
                .on("dragstart", function (d) {


                    d3.selectAll(".custom-tooltip").remove();
                    if (d == root) {
                        return;
                    }
                    dragStarted = true;
                    nodes = tree.nodes(d);
                    d3.event.sourceEvent.stopPropagation();
                    // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
                })
                .on("drag", function (d) {


                    if (d == root) {
                        return;
                    }
                    if (dragStarted) {
                        domNode = this;
                        initiateDrag(d, domNode);
                    }

                    // get coords of mouseEvent relative to svg container to allow for panning
                    relCoords = d3.mouse($('svg').get(0));
                    if (relCoords[0] < panBoundary) {
                        panTimer = true;
                        pan(this, 'left');
                    } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

                        panTimer = true;
                        pan(this, 'right');
                    } else if (relCoords[1] < panBoundary) {
                        panTimer = true;
                        pan(this, 'up');
                    } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
                        panTimer = true;
                        pan(this, 'down');
                    } else {
                        try {
                            clearTimeout(panTimer);
                        } catch (e) {

                        }
                    }

                    d.y0 += d3.event.dy;
                    d.x0 += d3.event.dx;
                    var node = d3.select(this);
                    node.attr("transform", "translate(" + d.x0 + "," + d.y0 + ")");
                    updateTempConnector();
                })
                .on("dragend", function (d) {



                    if (d == root) {
                        return;
                    }
                    domNode = this;
                    if (selectedNode) {
                        // now remove the element from the parent, and insert it into the new elements children
                        var index = draggingNode.parent.children.indexOf(draggingNode);
                        if (index > -1) {
                            draggingNode.parent.children.splice(index, 1);
                        }
                        if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
                            if (typeof selectedNode.children !== 'undefined') {
                                selectedNode.children.push(draggingNode);
                            } else {
                                selectedNode._children.push(draggingNode);
                            }
                        } else {
                            selectedNode.children = [];
                            selectedNode.children.push(draggingNode);
                        }
                        // Make sure that the node being added to is expanded so user can see added node is correctly moved
                        expand(selectedNode);
                        sortTree();
                        endDrag();
                    } else {
                        endDrag();
                    }
                });

        function endDrag() {
            selectedNode = null;
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
            d3.select(domNode).attr('class', 'node');
            // now restore the mouseover event or we won't be able to drag a 2nd time
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
            updateTempConnector();
            if (draggingNode !== null) {
                update(root);
                centerNode(draggingNode);
                draggingNode = null;
            }
            d3.selectAll(".custom-tooltip").remove();
            //print(root);
        }

        // Helper functions for collapsing and expanding nodes.

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        function expand(d) {
            if (d._children) {
                d.children = d._children;
                d.children.forEach(expand);
                d._children = null;
            }
        }

        var overCircle = function (d) {
            selectedNode = d;
            updateTempConnector();
        };
        var outCircle = function (d) {
            selectedNode = null;
            updateTempConnector();
        };

        // Function to update the temporary connector indicating dragging affiliation
        var updateTempConnector = function () {
            var data = [];
            if (draggingNode !== null && selectedNode !== null) {
                // have to flip the source coordinates since we did this for the existing connectors on the original tree
                data = [{
                        source: {
                            y: selectedNode.y0,
                            x: selectedNode.x0
                        },
                        target: {
                            y: draggingNode.y0,
                            x: draggingNode.x0
                        }
                    }];
            }
            var link = svgGroup.selectAll(".templink").data(data);

            link.enter().append("path")
                    .attr("class", "templink")
                    .attr("d", d3.svg.diagonal())
                    .attr('pointer-events', 'none');

            link.attr("d", d3.svg.diagonal());

            link.exit().remove();
            return;
        };

        // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

        function centerNode(source) {
            scale = zoomListener.scale();
            y = -source.y0;
            x = -source.x0;
            x = x * scale + viewerWidth / 2;
            y = y * scale + viewerHeight / 2;
            d3.select('g').transition()
                    .duration(duration)
                    .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
            return;
        }

        // Toggle children function

        function toggleChildren(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else if (d._children) {
                d.children = d._children;
                d._children = null;
            }
            return d;
        }

        // Toggle children on click.

        function click(d, source) {
            console.log($(source).attr("id"));
            addNode(root, $(source).attr("id"));
            d3.selectAll(".custom-tooltip").remove();
            clicked = false;
            return;
        }





        function deleteClick(d, source) {
            console.log($(source).attr("id"));

            var cid = $(source).attr("id");
            var pa = d3.select("#" + cid)[0][0].__data__.parent;

            if (pa === null || pa === "null" || pa === "") {
                return;
            }

            deleteNode(root, $(source).attr("id"));
            d3.selectAll(".custom-tooltip").remove();
            clicked = false;
            return;
        }

        function deleteNode(d, id) {
            console.log(d);
            if (!d.children) {
                return;
            }
            else {
                d.children = d.children.filter(function (elem) {
                    console.log(elem.id);
                    console.log(id);
                    return elem.id !== id;
                });
                //update(root);
            }
            //console.log(root.children);
            if (!d.children) {
                return;
            }
            else {
                d.children.forEach(function (d) {
                    deleteNode(d, id);
                });
            }

            update(root);
            centerNode(d);
            return;
        }












        function print(d) {
            console.log(d);
            if (!d.children) {
                return;
            }
            //console.log(root.children);

            d.children.forEach(function (d) {
                print(d);
            });

            return;
        }


        var checkFlag = true;
        function check(d) {
            console.log(d);
            console.log(d3.select("#" + d.id));
            console.log(d3.select("#" + d.id)[0][0].__data__.x0);



            $("#" + d.id).children(":first").css("stroke", "steelblue");
            if (!d.children) {
                return;
            }
            //console.log(root.children);
            var sum = 0;
            d.children.forEach(function (d) {
                //console.log(d);
                if (d.targetpct < 0 || d.targetpct > 100) {
                    checkFlag = false;
                    $("#" + d.id).children(":first").css("stroke", "red");
                    d3.select("#" + d.id).append("foreignObject").attr({
                        'x': 30,
                        'y': -30,
                        'width': 247,
                        'height': 100,
                        'class': 'error-red'
                    }).html('<i class="fa fa-exclamation-triangle"></i>');
                }
                sum += parseInt(d.targetpct);
                check(d);
                if (!checkFlag) {
                    return;
                }
            });
            //console.log(d.id + " sum:  " + sum);
            if (sum != 100) {
                //alert("Allocation sum != 100%. Reallocate again");
                checkFlag = false;

                $("#" + d.id).children(":first").css("stroke", "red");

                d.children.forEach(function (d) {
                    $("#" + d.id).children(":first").css("stroke", "red");
                    d3.select("#" + d.id).append("foreignObject").attr({
                        'x': 30,
                        'y': -30,
                        'width': 247,
                        'height': 100,
                        'class': 'error-red'
                    }).html('<i class="fa fa-exclamation-triangle"></i>');
                });

            }
            return;
        }

        function addNode(d, id) {
            //console.log(d.name);

            var newid = "node" + Math.floor(new Date().getTime() / 1000);
            if (d.id === id) {
                if (!d.children) {
                    d.children = [{"name": "Node", "id": newid, "targetpct": 0, "strategyID": d.strategyID}];
                }
                else {
                    d.children.push({"name": "Node", "id": newid, "targetpct": 0, "strategyID": d.strategyID});
                }
                update(root);
                centerNode(d);
                return;
            }
            else {
                if (!d.children) {
                    return;
                }


                d.children.forEach(function (d) {
                    addNode(d, id);
                });
            }

            return;
        }

        var currentData;
        var currentSelectedNode;

        function update(source) {
            // Compute the new height, function counts total children of root node and sets tree height accordingly.
            // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
            // This makes the layout more consistent.
            var levelWidth = [1];
            var childCount = function (level, n) {

                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1)
                        levelWidth.push(0);

                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function (d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, root);

            var newHeight = d3.max(levelWidth) * 200; // 25 pixels per line  
            // this line changes the spacing between nodes.

            tree = tree.size([newHeight, viewerWidth]);

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

            // Set widths between levels based on maxLabelLength.
            nodes.forEach(function (d) {
                d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
                // alternatively to keep a fixed scale one can set a fixed depth per level
                // Normalize for fixed-depth by commenting out below line
                // d.y = (d.depth * 500); //500px per level.

            });

            // Update the nodes…
            node = svgGroup.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id || (d.id = ++i);
                    });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                    //.call(dragListener)
                    .attr("class", "node")
                    .attr("id", function (d) {
                        counter++;
                        //console.log("id"+d.id);
                        // console.log("id"+d.name);
                        return "" + d.id;
                    })
                    .attr("transform", function (d) {
                        return "translate(" + source.x0 + "," + source.y0 + ")";
                    });



            nodeEnter.append("circle")
                    .attr('class', 'node circle')
                    .attr("r", 30)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .on('click', function (d) {


                        d3.selectAll(".custom-tooltip").remove();

                        currentSelectedNode = d;
                        currentData = d;
                        $("#alloc").val(d.targetpct);
                        $("#inputTitle").val(d.name);
                        $("#inputTitle").on("input change paste", function () {
                            d3.select("#title_" + currentData.id).text(function () {
                                return $("#inputTitle").val();
                            });
                            currentData.name = $("#inputTitle").val();
                        });

                        $(".tt-menu").on("click", function () {
                            d3.select("#title_" + currentData.id).text(function () {
                                return $("#inputTitle").val();
                            });
                            currentData.name = $("#inputTitle").val();
                        });
                        $("#alloc").on("input", function () {

                            var pa = d3.select("#" + d.id)[0][0].__data__.parent;
                            console.log(pa);
                            if (pa === null || pa === "null" || pa === "") {

                                return;
                            }


                            d3.select("#title_alloc_" + currentData.id).text(function () {

                                return $("#alloc").val();
                            });
                            currentData.targetpct = $("#alloc").val();

                            // auto check
                            d3.selectAll(".error-red").remove();
                            checkFlag = true;
                            check(root);


                        });


                        d3.select(this.parentNode.parentNode).append("image")
                                .on('click', function (d) {

                                    deleteClick(d, original);
                                })
                                .attr({
                                    "xlink:href": "./img/less.png",
                                    'x': d3.select(this.parentNode)[0][0].__data__.x0 - 105,
                                    'y': d3.select(this.parentNode)[0][0].__data__.y0 - 10,
                                    'width': 25,
                                    'height': 25,
                                    'class': 'custom-tooltip'
                                });

                        var data = [source];
                        var original = d3.select(this.parentNode)[0][0];
                        d3.select(this.parentNode.parentNode).append("image")
                                .on('click', function (d) {

                                    click(d, original);
                                })
                                .attr({
                                    "xlink:href": "./img/plus.png",
                                    'x': d3.select(this.parentNode)[0][0].__data__.x0 - 12,
                                    'y': d3.select(this.parentNode)[0][0].__data__.y0 + 50,
                                    'width': 25,
                                    'height': 25,
                                    'class': 'custom-tooltip'
                                });


                    });




            // append Title
            nodeEnter.append("text")
                    .attr("y", function (d) {
                        return d.children || d._children ? -10 : -10;
                    })
                    .attr("x", function (d) {
                        return d.children || d._children ? -10 : -10;
                    })
                    .attr("id", function (d) {
                        return "title_" + d.id;
                    })
                    .attr("dy", ".35em")
                    .attr('class', 'nodeText')
                    /*.attr("text-anchor", function (d) {
                     return d.children || d._children ? "end" : "start";
                     })*/
                    .text(function (d) {
                        return d.name;
                    })
                    .style("fill-opacity", 0);

            // append Allocation Amount Title
            nodeEnter.append("text")
                    .attr("y", function (d) {
                        return d.children || d._children ? 10 : 10;
                    })
                    .attr("x", function (d) {
                        return d.children || d._children ? -10 : -10;
                    })
                    .attr("id", function (d) {
                        return "title_alloc_" + d.id;
                    })
                    .attr("dy", ".55em")
                    .attr('class', 'nodeText')
                    /*.attr("text-anchor", function (d) {
                     return d.children || d._children ? "end" : "start";
                     })*/
                    .text(function (d) {
                        return parseInt(d.targetpct);
                    })
                    .style("fill-opacity", 1);




            // phantom node to give us mouseover in a radius around it
            nodeEnter.append("circle")
                    .attr('class', 'ghostCircle')
                    .attr("r", 30)
                    .attr("opacity", 0.2) // change this to zero to hide the target area
                    .style("fill", "orange")
                    .attr('pointer-events', 'mouseover')
                    .on("mouseover", function (node) {
                        overCircle(node);
                    })
                    .on("mouseout", function (node) {
                        outCircle(node);
                    });

            /*
             
             // Node Ticker
             
             // Update the text to reflect whether node has children or not.
             node.select('text')
             .attr("x", function (d) {
             return d.children || d._children ? -10 : -10;
             })
             .attr("text-anchor", function (d) {
             //return d.children || d._children ? "end" : "start";
             })
             .text(function (d) {
             return d.name;
             });
             */
            // Change the circle fill depending on whether it has children and is collapsed
            node.select("circle.nodeCircle")
                    .attr("r", 4.5)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });

            // Fade the text in
            nodeUpdate.select("text")
                    .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function (d) {
                        return "translate(" + source.x + "," + source.y + ")";
                    })
                    .remove();

            nodeExit.select("circle")
                    .attr("r", 0);

            nodeExit.select("text")
                    .style("fill-opacity", 0);

            // Update the links…
            var link = svgGroup.selectAll("path.link")
                    .data(links, function (d) {
                        return d.target.id;
                    });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                    .attr("class", function (d) {
                        return "link a" + d.target.id;
                    })

                    .attr("d", function (d) {
                        var o = {
                            x: source.x0,
                            y: source.y0
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .data({
                        x0: source.x0,
                        y0: source.y0
                    })

                    ;

            // Transition links to their new position.
            link.transition()
                    .duration(duration)
                    .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                    .duration(duration)
                    .attr("d", function (d) {
                        var o = {
                            x: source.x,
                            y: source.y
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            return;
        }

        // Append a group which holds all nodes and which the zoom Listener can act upon.
        var svgGroup = baseSvg.append("g");

        // Define the root
        root = treeData;
        root.x0 = viewerHeight / 2;
        root.y0 = 0;
        //root.id = "node" + Math.floor(new Date().getTime() / 1000);
        // print out JSON
        //console.log(root.children);
        // Layout the tree initially and center on the root node.
        update(root);
        centerNode(root);
        // print(root);
        //var jsonArray=JSON.parse(root);
        //console.log(jsonArray);



        $("#addBtn").on("click", function () {
            root.children.push({"name": "Node", "status": "pending"});
            update(root);
        });


        $("#center").on("click", function () {
            console.log($(".a1").attr("class"));
            console.log(d3.selectAll("#a1"));
            /*d3.selectAll(".node").filter("#a1").data(function(d){
             console.log(d);
             centerNode(d);
             
             });*/

            centerNode(d3.selectAll("#a9")[0][0].__data__);
        });


        $(".nodeItem").on("click", function () {
            centerNode(d3.selectAll("#" + $(this).attr("name"))[0][0].__data__);
        });


        var saveArray = [];
        var saveCounter = 0;
        var stratName;
        function resetSaveArray() {
            saveArray = [];
            saveCounter = 0;
            return;
        }
        function saveJSON(d) {
            //console.log(d);
            if (!d.children) {
                saveArray[saveCounter] = d;
                saveCounter++;
                return;
            }
            //console.log(root.children);

            d.children.forEach(function (d) {
                saveJSON(d);
            });
            saveArray[saveCounter] = d;
            saveCounter++;
            return;
        }

        function updateStrategyID() {
            var name = $("#stratname").val();
            if (name === "" || name === "Enter Strategy Name" || name === null) {
                alert("strategy name field null");
                return 0;
            }
            else {
                stratName = "" + name + Math.floor(new Date().getTime() / 1000);
                for (i = 0; i < saveArray.length; i++) {
                    saveArray[i].strategyID = stratName;
                }
                return 1;
            }
        }

        function updateParent() {
            var id = "";
            for (i = 0; i < saveArray.length; i++) {
                if (typeof saveArray[i].parent === 'undefined' || saveArray[i].parent === "") {
                    //alert("got em");
                    saveArray[i].parent = "";
                }
                else {
                    id = saveArray[i].parent.id;
                    //console.log("id "+id);
                    saveArray[i].parent = id;
                    //console.log(saveArray[i].parent);
                }

            }
        }

        $("#checkNow").on("click", function () {
            d3.selectAll(".error-red").remove();
            checkFlag = true;
            check(root);
            if (checkFlag) {
                alert("Done Checking. Correct balances");
            }

        });

        $("#submit").on("click", function () {
            d3.selectAll(".error-red").remove();
            checkFlag = true;
            check(root);
            //console.log("stat id: " + root.strategyID);
            //console.log(saveArray[0].strategyID);
            //console.log(saveArray);
            // id is used to delete old  strategy
            // get new strategy name
            if (checkFlag) {
                resetSaveArray();
                saveJSON(root);
                var stratBool = updateStrategyID();
                console.log(saveArray);
                updateParent();
                console.log(saveArray);
                console.log(stratName);
                //stratBool=false;
                if (stratBool) {
                    $.ajax({
                        url: 'saveStrategy.php',
                        type: 'post',
                        data: {'tree': saveArray, 'Stratname': stratName, 'phase': 'new', 'Stratid': stratName},
                        success: function (data, status) {

                            //console.log("Successful ajax call data . Status : " + status);
                            console.log("Successful ajax call data . Status : " + data);
                            window.location.href = "../Main/hub.php";
                        },
                        error: function (xhr, desc, err) {
                            console.log("Not Successful ajax call");
                        }

                    });
                }
                else {
                    alert("fill in strategy name");
                }
            }


        });

        d3.selectAll("i[data-zoom]")
                .on("click", zoomClicked);

        function zoomClicked() {
            svgGroup.call(zoomListener.event); // https://github.com/mbostock/d3/issues/2387

            // Record the coordinates (in data space) of the center (in screen space).
            console.log(zoomListener.center());
            var center0 = zoomListener.center(), translate0 = zoomListener.translate(), coordinates0 = coordinates(center0);
            zoomListener.scale(zoomListener.scale() * Math.pow(2, +this.getAttribute("data-zoom")));

            // Translate back to the center.
            var center1 = point(coordinates0);
            zoomListener.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

            svgGroup.transition().duration(750).call(zoomListener.event);
        }

        function coordinates(point) {
            var scale = zoomListener.scale(), translate = zoomListener.translate();
            return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
        }

        function point(coordinates) {
            var scale = zoomListener.scale(), translate = zoomListener.translate();
            return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
        }

        var tableStr = "";

        function tablePrint(d, indent) {

            //tableStr += "<p>" + d.name + "\t " + d.targetpct + "</p>";
            var total = 0;
            if (!d.children) {
                total = 0;
            }
            else {
                d.children.forEach(function (d) {
                    total += parseInt(d.targetpct);
                });
            }

            if (total < 100 && total > 0) {
                $("#col1").append('<div class="bg-danger" style="padding-left:' + indent + 'em;">' + d.name + " " + d.targetpct + "%" + "</div>");
                $("#col2").append("<div class='bg-danger' >" + total + "% <i class='fa fa-exclamation-triangle'></i></div>");
            }
            else {
                $("#col1").append('<div style="padding-left:' + indent + 'em;">' + d.name + " " + d.targetpct + "%" + "</div>");
                if (total > 0) {
                    $("#col2").append("<div>" + total + "%</div>");
                }
                else {
                    $("#col2").append("</br>");
                }
            }
            if (!d.children) {
                return;
            }

            //console.log(root.children);
            indent += 5;
            d.children.forEach(function (d) {
                tablePrint(d, indent);
            });
            return;
        }

        $("#TreeShow").on("click", function () {
            $("#tableView").hide();
            $("#treeView").show();
        });
        $("#TableShow").on("click", function () {

            tableStr = "";
            $("#col1").empty();
            $("#col2").empty();
            tablePrint(root, "");
            //$("#tableView").append("<div class='col-md-offset-5 col-md-2'>").append(tableStr).append("</div>");
            $("#treeView").hide();
            $("#tableView").show();

        });



        var substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push(str);
                    }
                });

                cb(matches);
            };
        };

    });
});