<!DOCTYPE html>
<!--
This php file is used for creating strategies in general's
- Wellesley Arreza
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
                
                // first unbind click handlers
                $(".node").unbind('click');
                // then update
                $(".node").on("click", function() {

                    //if (nodeSelected !== "") {
                        $(nodeSelected).removeClass('colored');
                    //}
                    nodeSelected = $(this);
                    $(nodeSelected).addClass('colored');
                    console.log("new node selected " + $(nodeSelected).children('.name').text());
                    console.log(nodeSelected);
                    console.log("hi");
                });
                
                   $("a").on("click",function(){
        
                        if(collapseTrue){
                            $(this).parent().children("ul").toggle();
                            console.log("collapse");
                        }
                        console.log("finish collapse");
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
                        /*
                        // set the handler to change the currently selected node.
                        $("#" + id).on("click", function() {
                            //console.log("clickity click");
                            nodeSelected = $(this).children('.node');
                            //console.log("new node selected "+ nodeSelected );
                        });
                        */
                        //console.log(ui.draggable.text());
                        
                        console.log("called refresh");
                        refreshHandlers();
                        console.log("called refresh");
                      
                    }
                });

            }
        </script>
        
        
        
        <!--TJ's zoom functionality -->
        
        <script>
            $(document).ready(function() {
            $("#zoomControl").draggable(); 
            $("#zoomControl").toggle();
            $("#toggleController").on("click", function(){
            $("#zoomControl").toggle();
    });
    //Just refreshes window, should restore "default" position of viewport
    $("#refreshArrow").on("click", function(){
        location.reload();
    });
    $("#plusButton").on("click", function(){
        $(".tree .node").each(function( index ){
            console.log("Test element: " + index);
            //console.log("Font-size:" + $(this).css("font-size"));
            $(this).css("width", "+=15%");
            $(this).css("height", "+=15%");
            $(this).css("font-size", "+=2%");
            $(this).css("text-align", "center");
            $(this).css("margin-top", "auto");
        })
    });
    $("#minusButton").on("click", function(){
        $(".tree .node").each(function( index ){
            $(this).css("width", "-=15%");
            $(this).css("height", "-=15%");
            $(this).css("font-size", "-=2%");
            $(this).css("text-align", "center");
            $(this).css("margin-top", "auto");
            //$(this).css("padding", "-=10%");
        })
    });
            });
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
            #zoomControl{
    z-index: 9999;
    position: absolute;
    top: 60px;
    left: 280px;
    width: 300px;
}

#zoomControl h1{
    color: #333;
    font-size: 2.8em;
    margin-bottom: 0px;
    padding-bottom: 0px;
    opacity: .8;
}

#zoomButtons ul li{
    font-size: 3em;
    float: left;
    padding: 5px;
    color: #CCC;
    background-color: #333;
    opacity: .8;
    cursor: pointer;
}

#zoomButtons ul li:hover{
    opacity: .7;
    background-color: #777;
}

#zoomButtons{
    width: 100%;
}

#zoomButtons ul{
    margin-top: -12px;
    list-style: none;
}
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
                    <li><a class="navbar-a" href="../Main/login.html">Logout</a></li>
                    <!--<li><a class="navbar-a" href="#">Logout</a></li>-->
                </ul>
            </div><!--/.nav-collapse -->

        </nav>
    <center class="pageTitle">Create Strategies</center>
        <hr>


        <div id="leftmenu">
            
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
            
            
            
            
        <button type="button" id="customAddShow" class="btn btn-primary">
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
            <br/>
            <br/>
             <button type="button" id="customAdd" class="btn btn-success">
            Add Custom Node
            </button>
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

            <button id='toggleController' type="button" class="btn btn-primary">
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
                            <li id="" class="root" >

                                <a href="#" class="node drop" id=''>
                                  <!--  <button class='deleteButton'><i class="fa fa-times fa-1x fa-fw"></i></button> -->
                                    <div class="name">Strategy Name</div>
                                    <div class="current hideVal"></div>
                                    <div class="drift hideVal"></div>
                                    <div class="allocation hideVal"></div>
                                    <div class="percent hideVal" ></div>
                                </a>


                                <ul class="showParent">






                                </ul>

                            </li>
                        </ul>

                    </div>  <!-- END OF TREE -->
                </div>
            </div>

        </div>
<input type='hidden' id='phase' value='new'>;
<div id="zoomControl" draggable="true">
                <h1> Zoom </h1>
                <div id="zoomButtons">
                    <ul>
                        <!--li id="leftArrow">&#8592;</li>
                        <li id="upArrow">&#8593;</li>
                        <li id="downArrow">&#8595;</li>
                        <li id="rightArrow">&#8594;</li-->
                        <!-- snap to default -->
                        <li id="plusButton">+</li>
                        <li id="minusButton">-</li>
                        <li id="refreshArrow">&#8635;</li>
                    </ul>
                </div>
        </div>
</body>
</html>
