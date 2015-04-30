<?php
session_start();
?>

<!--
This is the page that allows users to view and edit current strategies.

- Wellesley Arreza

-->


<!DOCTYPE html> 
<html>
    <head>
        <title>Wellesley Arreza</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
       
        
        
        <!-- Javascript -->
        
        <script type='text/javascript' >
            var nodeSelected = "";
        </script>
        
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        
        <script src='js/saveStrategy.js'></script>
        <script src="js/jquery.ui.touch-punch.min.js"></script>
        <script src="js/strategyMenu.js"></script>
        <script src="js/scroll.js"></script>
        <script src="js/tree.js"></script>
        <script src='js/checkTree.js'></script>
        <script src="js/renderStrategy.js"></script>
        <script>
            function refreshHandlers() {

                console.log("refresh");

                $(".node").on("click", function() {

                    if (nodeSelected !== "") {
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
                        var time = Math.floor(new Date().getMilliseconds());
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

                        $("#parentList").append("<option value='" + ui.draggable.children(".dragtext").text() + "' nodeID='" + id + "'>" + ui.draggable.children(".dragtext").text() + "</option>");

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
        </script>
        <script src="js/dragdrop.js"></script>
        <script src="js/customAdd.js"></script>
        
        <script src='js/deleteButton.js'></script>
        <script src="js/slider.js"></script>
        <script>
            $(function() {
                $("#resizable").resizable();
            });

        </script>
        
        <!-- End of Javascript -->
          
       
        <!-- CSS -->
        
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>
        
        <link href="css/tree.css" rel="stylesheet">
        <link rel="stylesheet" href="./css/menu.css">
        <link rel="stylesheet" href="./css/customNavbar.css">
        <link rel="stylesheet" href="./css/viewStrategy.css">
        <!-- End of CSS   -->
        
        
        
    </head>
    
    <body>
        
        <nav class="navbar navbar-custom">


            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>


            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>   <i id="menuButton" class="fa fa-bars fa-2x fa-fw" style="  margin-right: 16px;padding-top: 10px;"></i> </li>

                    <li><a class="navbar-a" href="../Main/hub.php">Home</a></li>
                    <li><a class="navbar-a" href="../Main/createStratPage.php">Create New Strategy</a></li>

                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="navbar-a" href="#contact">
                            <i class="fa fa-user fa-2x fa-fw"></i>
                            Hi, Wellesley Arreza
                        </a>
                    </li>
                    <li><a class="navbar-a" href="../Main/login.html">Logout</a></li>
                </ul>
            </div><!--/.nav-collapse -->

        </nav>
    <center class="pageTitle"> Edit Strategy</center>
    <hr>
        
    
 <div id="leftmenu">
            
            
        <button type="button" id="customAdd" class="btn btn-primary">
            <i class=" fa fa-plus-circle fa-1x fa-fw margin-bottom"></i> Add Custom Node
        </button>
            
        <div id="customAddDiv" class="popupdiv">
            Parent : 
            <select id="parentList">

            </select>
            <br/>
            <br/>
            Node Name:
            <input type="text" id="inputName" value="name" size="10">
             <br/>
             <br/>
            Allocation:
            
            <input type="text" id="inputAlloc" value="0" size="4">
        </div>
            
            
            <button id='quickEdit' type="button" class="btn btn-primary">
                <i class="fa fa-wrench fa-1x fa-fw margin-bottom"></i> Quick Edit 
            </button> 
            <div id="quickEditDiv" class="popupdiv">
                Edit Name:
                <br/>
                <br/>
                <input type="text" id="currentName" value="name">
                <br/>
                <br/>
                Edit Allocation:
                <div id="red" style='margin-right:10px; margin-top: 20px; margin-bottom: 20px;'></div>
            </div>


            <button id="quickNode" type="button" class="btn btn-primary">
                <i class="fa fa-plus-circle fa-1x fa-fw margin-bottom"></i> Add Quick Node
            </button> 
            <div id="quickNodeDiv" class="popupdiv">
                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Equity</span>
                </div>

                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Cash</span>
                </div>

                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Fixed Income</span>
                </div>

                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>IBM</span>
                </div>

                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>TSLA</span>
                </div>

                <div class='drag' style="padding-bottom: 10px;">
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>JPM</span>
                </div>

            </div>



            <button id='deleteOn' type="button" class="btn btn-primary">
                <i class="fa fa-minus-circle fa-1x fa-fw margin-bottom"></i> Delete Node 
            </button>
            
            <button id="collapseBtn" type="button" class="btn btn-primary">
                <i class="fa fa-search-plus fa-1x fa-fw margin-bottom"></i> Collapse 
            </button>

            <button type="button" class="btn btn-primary">
                <i class="fa fa-search-plus fa-1x fa-fw margin-bottom"></i> Zoom In/Out 
            </button>

            <button type="button" id="stratCheck" class="btn btn-primary">
                <i class="fa fa-check-circle fa-1x fa-fw margin-bottom"></i> Check Balance 
            </button>
            <br/>
            <button type="button" id="stratSubmit" class="btn btn-primary">
                <i class="fa fa-arrow-right fa-1x fa-fw margin-bottom"></i> Submit 
            </button>



        </div>    

    
        
        
        <?php

// Set session variables
 //echo $_SESSION["favcolor"];
 //echo       $_SESSION["favanimal"];
 //$var= $_POST['list'];
 $var2= $_POST['selectedStrategy'];
 //$_SESSION['listid']=$_POST['list'];
 $_SESSION['linkID']=$var2; 
 echo "<input type='hidden' id='selection' value='" . $var2 ."'>";
 
?>
    <div id='main' style="">


        <div id="resizable" class="ui-widget-content">
            <div id="treeDiv" style="overflow: scroll; position:relative;">



                <!-- Tree -->

                <div class="tree">
                    
                    
                    <ul class="showParent"> <!-- Unordered List of Strategy -->

                    </ul>

                </div>
            </div>
        </div>


    </div>
    
    <input type='hidden' id='phase' value='edit'>;
</body>
</html>