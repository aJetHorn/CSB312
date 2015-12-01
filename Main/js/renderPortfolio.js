/*
 - Wes 
 11/7/2015
 
 */


var counter = 0;

// This is the parent node that will appear on the view.
var finalNode = {
    "id": "",
    "name": "portfolio",
    "parent": "",
    "targetpct": "100",
    "portfolioID": "",
    "status": "1",
    "children": [
    ]
};

var tempNode;



$(function () {

    var portID = parseInt($("#selection").val());
    var portVal=100000;

    // AJAX call for calling all strategy Nodes.
    $.ajax({
        datatype: 'json',
        url: 'renderPortfolio.php',
        type: 'get',
        data: {'portfolioID': $("#selection").val()},
        success: function (data, status) {
            //console.log(data);
            for (i = 0; i < data.length; i++) {
                finalNode.children.push(addStrategies(data[i]));
            }

            start();
        },
        error: function (xhr, desc, err) {
            console.log("Not Successful ajax call");
            console.log(err);
        }

    });


    var childrenList;
    // addStrategies function puts together a singular strategy tree just from nodes alone.
    function addStrategies(data) {
        childrenList = data;
        var i;
        for (i = childrenList.length - 1; i > -1; i--) {
            if (childrenList[i].parent === "" || childrenList[i].parent === "null") {
                parent = childrenList[i];
                childrenList.splice(i, 1);
            }
        }
        return getChild(parent);
    }

    // getChild is a recursive function that adds children to their parents.
    function getChild(node) {
        //console.log(node);
        var i;
        if (node === null) {
            return;
        }
        if (node.children === undefined) {
            node.children = [];
        }

        for (i = childrenList.length - 1; i > -1; ) {
            // for each node
            //console.log("Next child " + childrenList[i].id + " for parent " + node.id);
            //console.log(childrenList[i]);
            if (node.id === childrenList[i].parent) {
                var node2 = getChild(childrenList[i]);
                //console.log(node);
                //console.log(node.children);
                //console.log("to be pushed\n");
                //console.log(node2);
                node.children.push(node2);
                childrenList.splice(i, 1);
                //console.log(childrenList[1]);
                i = childrenList.length - 1;

                // remove child from child list.

            }
            else {
                i--;
            }
            //console.log("-----------------new length : " + i);

        }
        //console.log("end");
        return node;



    }



    // Basically a main method.

    function start() {
        var treeJSON = d3.json("./js/new.json", function (error, treeData) {
            treeData = finalNode;

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
            //.center([width / 2, height / 2])



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
                // if (d3.event.defaultPrevented){
                // console.log("suppressed");
                // }
                //return; // click suppressed
                //console.log(d);
                //console.log($(source).attr("id"));
                addNode(root, $(source).attr("id"));


                /*if (!d(function (d) {
                 return d;
                 }).children) {
                 d.children = [{"name": "New Item", "status": "pending"}];
                 }
                 else {
                 d.children.push({"name": "New Item", "status": "pending"});
                 }*/


                //d = toggleChildren(d);
                //update(d);

                d3.selectAll(".custom-tooltip").remove();
                clicked = false;
            }



            function print(d) {
                //console.log(d);
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

                var newHeight = d3.max(levelWidth) * 250; // 25 pixels per line  
                // this line changes the spacing between nodes.

                tree = tree.size([newHeight, viewerWidth]);

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);

                // Set widths between levels based on maxLabelLength.
                nodes.forEach(function (d) {
                    d.y = (d.depth * (maxLabelLength * 20)); //maxLabelLength * 10px
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


                // fix the css to change the styling of the nodes
                // the r attribute is the size of the CIRCLE!!!
                // remember to style the connectors of the circles
                // if you change the size of circle...
                nodeEnter.append("circle")
                        .attr('class', 'node circle')
                        .attr("r", 50)
                        .style("fill", function (d) {
                            return d._children ? "lightsteelblue" : "#fff";
                        });


                /*
                 * This section is for appending text to the nodes. This is important 
                 *  for adding in extra information about these nodes.
                 */
                var titleY = -25;
                var allocY = titleY + 15;
                var amountY = allocY + 15;
                var posY = amountY + 15;
                var driftY = posY + 15;
                var align1 = -12;
                var arrowX = align1 + 60;
                var arrowY = titleY;
                // append Title
                nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? titleY : titleY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? align1 : align1;
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
                            return d.children || d._children ? allocY : allocY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? align1 : align1;
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
                            return "T: " + d.targetpct;
                        })
                        .style("fill-opacity", 1);

                // append % symbol
                nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? allocY : allocY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? 10 : 10;
                        })
                        .attr("id", function (d) {
                            return "percent_symbol";
                        })
                        .attr("dy", ".55em")
                        .attr('class', 'nodeText')
                        /*.attr("text-anchor", function (d) {
                         return d.children || d._children ? "end" : "start";
                         })*/
                        .text(function (d) {
                            return "%";
                        })
                        .style("fill-opacity", 1);

                // append amount
                nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? amountY : amountY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? align1 : align1;
                        })
                        .attr("id", function (d) {
                            return "amount_" + d.id;
                        })
                        .attr("dy", ".55em")
                        .attr('class', 'nodeText')
                        /*.attr("text-anchor", function (d) {
                         return d.children || d._children ? "end" : "start";
                         })*/
                        .text(function (d) {
                            return d.amount;
                        })
                        .style("fill-opacity", 1);

                // append position
                nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? posY : posY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? align1 : align1;
                        })
                        .attr("id", function (d) {
                            return "position_" + d.id;
                        })
                        .attr("dy", ".55em")
                        .attr('class', 'nodeText')
                        /*.attr("text-anchor", function (d) {
                         return d.children || d._children ? "end" : "start";
                         })*/
                        .text(function (d) {
                            return d.position;
                        })
                        .style("fill-opacity", 1);

                // append drift
                nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? driftY : driftY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? align1 : align1;
                        })
                        .attr("id", function (d) {
                            return "drift_" + d.id;
                        })
                        .attr("dy", ".55em")
                        .attr('class', 'nodeText')
                        /*.attr("text-anchor", function (d) {
                         return d.children || d._children ? "end" : "start";
                         })*/
                        .text(function (d) {
                            return "A: " + (d.targetpct + d.drift);
                        })
                        .style("fill-opacity", 1);

                // append arrow up/down
                nodeEnter.append("foreignObject")
                        .attr("y", function (d) {
                            return d.children || d._children ? arrowY : arrowY;
                        })
                        .attr("x", function (d) {
                            return d.children || d._children ? arrowX : arrowX;
                        })
                        .attr("id", function (d) {
                            return "arrow_" + d.id;
                        })
                        .attr("dy", ".55em")
                        .attr('class', 'nodeText')
                        .html(function (d) {
                            return '<i class="fa fa-3x"></i>';
                        })
                        .style("fill-opacity", 1);


                // phantom node to give us mouseover in a radius around it
                nodeEnter.append("circle")
                        .attr('class', 'ghostCircle')
                        .attr("r", 50)
                        .attr("opacity", 0.2) // change this to zero to hide the target area
                        .style("fill", "orange")
                        .attr('pointer-events', 'mouseover')
                        .on("mouseover", function (node) {
                            overCircle(node);
                        })
                        .on("mouseout", function (node) {
                            outCircle(node);
                        });

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
            //print(root);
            //var jsonArray=JSON.parse(root);
            //console.log(jsonArray);



            $(".nodeItem").on("click", function () {
                //alert("hey");
                centerNode(d3.selectAll("#" + $(this).attr("name"))[0][0].__data__);

                return;
            });

            //TJ's UI Merge
            node.on("click", function(){
                console.log(this);
                console.log($("#title_" + this.id));
                console.log($("#title_" + this.id).html()); //assumes this html is the symbol name for lookup
                var instrument_name = $("#title_" + this.id).html(); //short name for lookup
                console.log("Loading: " + instrument_name);
                $("#TickerData").empty();
                $.ajax({
                    url: "http://www.google.com/finance/info?infotype=infoquoteall&q=" + instrument_name,
                    dataType: 'text',
                    success: function (data) {
                        console.log("Successfully loaded symbol");
                        var obj = JSON.parse(data.substring(5, data.length - 2));
                        var items = [];
                        var ticker_name = obj['t'];
                        items.push("<br><b>" + obj['name'] + "</b>");
                        items.push("<br>Ticker Name: " + ticker_name);   
                        items.push("<br>Most Recent Price: $" + obj['l']);
                        var dollar_change = obj['c'];
                        var percent_change = obj['cp'];
                        var negative = dollar_change < 0;
                        var node_percent_display;
                        //no change
                        if (dollar_change === 0.00){
                            node_percent_display = "<br>&#8210; " + dollar_change + "(" + percent_change + "%)";
                        }
                        else if (negative){
                            node_percent_display = "<br><span style=\"color: red;\">&darr; " + dollar_change + " (" + percent_change + "%)</span>";
                        }
                        else if (!negative){
                            node_percent_display = "<br><span style=\"color: green;\">&uarr; " + dollar_change + " (" + percent_change + "%)</span>";
                        }
                        console.log(node_percent_display);
                        items.push(node_percent_display);

                        //more

                        $("#TickerData").append(items);
                    },
                    error: function (data) {
                        //alert("Ticker '" + instrument_name + " not found or is not a stock.");
                        $("#TickerData").append("Ticker '" + instrument_name + "'' not found or is not a stock.");
                    }
                });
            });
            
            $("#resetBtn").on("click", function(){
                $("#TickerData").empty();
            });


            var saveArray = [];
            var saveCounter = 0;

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


            // Ajax call for Getting Actual Allocation values for each Strategy for the Portfolio.

            $.ajax({
                datatype: 'json',
                url: 'getPortStrat.php',
                type: 'get',
                data: {'portfolioID': $("#selection").val()},
                success: function (data, status) {
                    //console.log(data);
                    var obj;
                    for (i = 0; i < data.length; i++) {

                        // for each tree child
                        // if child.strategy=strategy then change its pallocation
                        //obj = d3.select("#" + data[i].sname).data();
                        // obj.targetpct = data[i].pallocation;


                        var j = 0;

                        for (j = 0; j < root.children.length; j++) {
                            //console.log(root.children[j]);
                            //console.log(data[i]);
                            if (root.children[j].strategyID === data[i].sid) {
                                obj = d3.select("#" + root.children[j].id).data();
                                //console.log(obj);
                                obj[0].targetpct = data[i].pallocation;
                                //console.log(obj);
                                d3.select("#title_alloc_" + root.children[j].id).text(function () {
                                    return "T: " + data[i].pallocation;
                                });
                            }
                        }
                    }


                    calc_remaining_cash();
                    update(root);
                    aa_traverse(root, portVal);
                    update(root);

                    centerNode(root);

                },
                error: function (xhr, desc, err) {
                    console.log("Not Successful ajax call");
                    console.log(err);
                }

            });


            $("#rebal_btn").on("click", function () {
                normal_rebalance();
            });




            function aa_traverse(d, balance) {
                var position_sum = 0;
                var pct = parseInt(d.targetpct);
                var amount = parseInt(balance) * pct * .01;
                var randomnumber = Math.floor(Math.random() * 20) - 10;
                if (!d.children && (d.name === 'Cash' || d.name === 'Equity' || d.name === 'Bonds' || d.name === 'Stocks')) {
                    d.amount = amount;
                    d.drift = 0;
                    d.position = amount;
                    $("#drift_" + d.id).text("A: " + (d.targetpct + d.drift));
                    $("#position_" + d.id).text(d.position);
                    $("#amount_" + d.id).text(amount);
                    return d.position;
                }
                else if (!d.children) {
                    d.amount = amount;
                    d.drift = randomnumber;
                    d.position = amount + (amount * randomnumber * .01);
                    $("#drift_" + d.id).text(d.drift);
                    $("#position_" + d.id).text(d.position);
                    $("#amount_" + d.id).text(amount);
                    // if drift is negative
                    // put down arrow and color it red.
                    //return to this. -TJ
                    if (d.drift < 0) {
                        $("#arrow_" + d.id).children().addClass("fa-arrow-down");
                        var currentNodeSource;
                        var currentNode;
                        //console.log(node[0]);
                        for (var i = 0; i < node[0].length; i++){
                            currentNodeSource = node[0][i];
                            currentNode = node[0][i].children[0];
                        }
                        var red_strength = 255;
                        var green_strength = 0;
                        var blue_strength = 0;
                        console.log($("#"+d.id));
                        console.log($("#"+(d.id))[0].children[0]);
                        $($("#"+d.id)[0].children[0]).css({
                            fill: "rgba(" + red_strength + "," + green_strength +"," + blue_strength + "," + 1 + ")"
                        });
                    }
                    else if (d.drift > 0) {
                        $("#arrow_" + d.id).children().addClass("fa-arrow-up");
                        var currentNodeSource;
                        var currentNode;
                        for (var i = 0; i < node[0].length; i++){
                            currentNodeSource = node[0][i];
                            currentNode = node[0][i].children[0];
                        }
                        var red_strength = 0;
                        var green_strength = 255;
                        var blue_strength = 0;
                        $($("#"+d.id)[0].children[0]).css({
                            fill: "rgba(" + red_strength + "," + green_strength +"," + blue_strength + "," + 1 + ")"
                        });
                    }



                    return d.position;
                }
                //console.log(root.children);

                d.children.forEach(function (d) {
                    position_sum += parseInt(aa_traverse(d, amount));
                });

                d.amount = amount;
                d.position = position_sum;
                d.drift = (((d.position - d.amount) / d.amount) * 100).toFixed(2);
                $("#drift_" + d.id).text(d.drift);
                $("#position_" + d.id).text(d.position);
                $("#amount_" + d.id).text(amount);
                if (d.drift < 0) {


                    $("#arrow_" + d.id).children().addClass("fa-arrow-down");
                    var red_strength = 255;
                        var green_strength = 0;
                        var blue_strength = 0;
                        console.log($("#"+d.id));
                        console.log($("#"+(d.id))[0].children[0]);
                        $($("#"+d.id)[0].children[0]).css({
                            fill: "rgba(" + red_strength + "," + green_strength +"," + blue_strength + "," + 1 + ")"
                        });
                }
                else if (d.drift > 0) {
                    $("#arrow_" + d.id).children().addClass("fa-arrow-up");
                    var red_strength = 0;
                        var green_strength = 255;
                        var blue_strength = 0;
                        $($("#"+d.id)[0].children[0]).css({
                            fill: "rgba(" + red_strength + "," + green_strength +"," + blue_strength + "," + 1 + ")"
                        });
                }
                return d.position;
            }

            function calc_remaining_cash() {
                var sum = 0;
                var i = 0;
                for (i = 0; i < root.children.length; i++) {
                    sum += parseInt(root.children[i].targetpct);
                    console.log(sum);
                }
                if (sum < 100) {
                    var rest = 100 - parseInt(sum);
                    var allocation = parseInt(root.amount) * .01 * rest;
                    var cashNode = {
                        "id": "portfolioCash",
                        "name": "Cash",
                        "parent": "",
                        "targetpct": rest,
                        "amount": allocation,
                        "drift": 0,
                        "position": allocation,
                        "portfolioID": portID,
                        "status": "1",
                        "children": [
                        ]
                    };
                    root.children.push(cashNode);


                }
            }


            // for each child or node with no children
            // generate position
            // generate drift

            //rebalance algorithm

            // sell bonds
            // sell stocks

            function normal_rebalance() {
                var neg_bal = find_neg(root);
                console.log("need to rebalance amount: " + neg_bal);
                var amt = find_buys(root, neg_bal);
                if (amt < -(neg_bal)) {
                    console.log("warning need to use remaining portfolio funds");
                }
                // send buys_array to save trades.
                $.ajax({
                    datatype: 'json',
                    url: 'saveTrades.php',
                    type: 'post',
                    data: {'buys_array': buys_array},
                    success: function (data, status) {
                        console.log(data);
                        window.location.href = "../Main/account_summary.php";
                    },
                    error: function (xhr, desc, err) {
                        console.log("Not Successful ajax call");
                        console.log(err);
                    }

                });


            }

            function find_neg(d) {
                var sum = 0;
                if (!d.children) {
                    // sell

                    if (d.drift < 0) {
                        var amt = parseInt(d.position) - parseInt(d.amount);
                        buys_array.push({'asset_id': d.name, 'amount': -(amt), 'pid': portID, 'action': 'buy'});
                        return amt;
                    }
                    return 0;
                }

                d.children.forEach(function (d) {
                    sum += parseInt(find_neg(d));
                });

                return sum;
            }
            var buys_array = [];
            function find_buys(d, bal) {
                var sum = 0;
                if (!d.children) {
                    // sell
                    var amt = 0;
                    if (d.drift > 0) {
                        amt = parseInt(d.position) - parseInt(d.amount);
                        console.log("Execute trades for the amount : " + amt);
                        buys_array.push({'asset_id': d.name, 'amount': amt, 'pid': portID, 'action': 'sell'});
                    }
                    return amt;
                }

                d.children.forEach(function (d) {
                    sum += parseInt(find_buys(d));
                });

                return sum;
            }



        }); // end of d3 json function


    }// end of start function;



}); // end of ready function
