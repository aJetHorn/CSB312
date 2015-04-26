<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Wellesley Arreza</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">


        <!-- JS -->

        <!--http://stackoverflow.com/questions/21024681/javascript-how-can-you-pass-global-variables-between-js-files -->
        <script type='text/javascript' >
            var nodeSelected = "";

        </script>


        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        <script src='js/saveStrategy.js'></script>
        <script src="js/jquery.ui.touch-punch.min.js"></script>
        <script src="js/scroll.js"></script>
        <script src="js/strategyMenu.js"></script>
        <script src="js/tree.js"></script>
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
        <script src='js/checkTree.js'></script>
        <script src='js/deleteButton.js'></script>


        <script src="js/slider.js"></script>
        

        <script>
            $(function() {
                $("#resizable").resizable();
            });

        </script>

        <style>
            #red .ui-slider-range { background: #ef2929; }
            #red .ui-slider-handle { border-color: #ef2929; }
        </style>

        <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link href="css/tree.css" rel="stylesheet">
        <link rel="stylesheet" href="./css/menu.css">
        <!-- Bootstrap Core CSS -->
        <!--<link href="./css/bootstrap.min.css" rel="stylesheet">-->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        
        <link rel="stylesheet" href="./css/customNavbar.css">
        

    </head>
    <body>

        <div id='selectionBar'>
           <!-- <i class="fa fa-plus-circle fa-3x fa-fw margin-bottom"></i>
            <i class="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i>
            <i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i> -->
            <!--<i id="menuButton" class="fa fa-bars fa-3x fa-fw"></i>-->

        </div>

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
                    <li><a class="navbar-a" href="../Main/hub.php">My Strategies</a></li>
                    <li><a class="navbar-a" href="../Main/hub.php">My Portfolios</a></li>
                    
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="navbar-a" href="#contact">
                            <i class="fa fa-user fa-2x fa-fw"></i>
                            Hi, Wellesley Arreza
                        </a>
                    </li>
                    <li><a class="navbar-a" href="/SEI/Main/login.html">Logout</a></li>
                </ul>
            </div><!--/.nav-collapse -->

        </nav>
    <center class="pageTitle">Create Strategies</center>
        <hr>


        <div id="leftmenu">
            
            
        <button type="button" id="customAdd" class="btn btn-primary">
            <i class="fa fa-plus-circle fa-1x fa-fw margin-bottom"></i> Add Custom Node
        </button>
        <div id="customAddDiv">
            Parent : 
            <select id="parentList">

            </select>
            <input type="text" id="inputName" value="name">
            <input type="text" id="inputAlloc" value="0">%
        </div>
            
            
            <button id='quickEdit' type="button" class="btn btn-primary">
                <i class="fa fa-wrench fa-1x fa-fw margin-bottom"></i> Quick Edit 
            </button> 
            <div id="quickEditDiv">
                <input type="text" id="currentName" value="name">

                <div id="red" style='margin-right:10px'></div>
            </div>


            <button id="quickNode" type="button" class="btn btn-primary">
                <i class="fa fa-plus-circle fa-1x fa-fw margin-bottom"></i> Add Quick Node
            </button> 
            <div id="quickNodeDiv">
                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Equity</span>
                </div>

                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Cash</span>
                </div>

                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Fixed Income</span>
                </div>

                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>IBM</span>
                </div>

                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>TSLA</span>
                </div>

                <div class='drag'>
                    <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>JPM</span>
                </div>

            </div>



            <button id='deleteOn' type="button" class="btn btn-primary">
                <i class="fa fa-minus-circle fa-1x fa-fw margin-bottom"></i> Delete Node 
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











        <div id='main' style="">

            <div id="resizable" class="ui-widget-content" style="height:1000px;">

                <div id="treeDiv">



                    <!-- Tree -->

                    <div class="tree">
                        <ul class="showParent"> <!-- Unordered List of Strategy -->

                            <!-- C -->
                            <li id="Asia123" class="root" >

                                <a href="#" class="node drop" id='3'>
                                  <!--  <button class='deleteButton'><i class="fa fa-times fa-1x fa-fw"></i></button> -->
                                    <div class="name">Strategy Name</div>
                                    <div class="current hideVal"></div>
                                    <div class="drift hideVal"></div>
                                    <div class="allocation hideVal"></div>
                                    <div class="percent hideVal" ></div>
                                </a>


                                <ul class="showParent">






                                </ul>

                                </div>  <!-- END OF TREE -->
                                </div>
                                </div>

                                </div>

                                </body>
                                </html>
