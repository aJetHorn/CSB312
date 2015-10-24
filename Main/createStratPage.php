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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>

        <script>
            $(function () {
                $("#TreeShow").on("click", function () {
                    $("#tableView").hide();
                    $("#treeView").show();
                });
                $("#TableShow").on("click", function () {
                    $("#treeView").hide();
                    $("#tableView").show();

                });
            });
        </script>



        <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <style type="text/css">
            #infoBar{
                width: 200px;
                position: absolute;
                left: 10px;
            }
            #zoomGroup{
                position:absolute;
                right:20px;
                top:40%;
            }
            #finishGroup{
                position:absolute;
                right:20px;
            }

            .twitter-typeahead {
                display:block !important;    
            }


            #scrollable-dropdown-menu .tt-dropdown-menu {
                max-height: 150px;
                overflow-y: auto;
            }
            .tt-menu{
                max-height: 60px;
                overflow-y: scroll;
                width:100%;
            }

            .fa{
                cursor:pointer;
                display: inline;
            }

            ul
            {
                list-style-type: none;
            }
            .my-icon-sm{
                height:100%;
                width:25px;
            }

            input[type="text"].nodeText, textarea {
                color:white;
                background-color : rgba(0, 0, 0, 0);
                border:none;

            }

            #rightpanel{

                position: absolute;
                left: 80%;
                top: 60px;
                z-index: 3;
                height:300px;
                background-color: rgba(7, 7, 223, 0);
            }


            .opblkDiv{
                // remember to change d3.js object width and height, for firefox....
                width: 250px;
                background-color: rgba(0, 0, 0, 0.45);
                color: white;
            }

            .blueDiv{
                cursor: pointer;
                color: white;
                background-color: rgba(255, 255, 255, 0);
                width: 56px;
                text-align:center;
            }

            .node {
                cursor: pointer;
            }

            .overlay{
                background-color:white;
            }

            .node circle {
                fill: #fff;
                stroke: steelblue;
                stroke-width: 1.5px;
            }

            .node circle fix{
                fill: #fff;
                stroke: #FF4000;
                stroke-width: 2.5px;
            }

            .node text {
                font-size:10px; 
                font-family:sans-serif;
            }

            .link {
                fill: none;
                stroke: #ccc;
                stroke-width: 1.5px;

            }

            .templink {
                fill: none;
                stroke: red;
                stroke-width: 3px;
            }

            .ghostCircle.show{
                display:block;
            }

            .ghostCircle, .activeDrag .ghostCircle{
                display: none;
            }

            .nodeItem{
                cursor:pointer;
            }

        </style> 


    </head>

    
    <body>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Portfolio App 2.0 </a>
                </div>
                <div>
                    <ul class="nav navbar-nav">
                        <li class=""><a href="../Main/hub.php">Home</a></li>
                        <li class="active"><a href="../Main/createStratPage.php">Create Strategy</a></li>

                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid">
            <div class="row">

                <div id="infoBar">
                    
                    <button type="button" class="btn btn-primary" id="TreeShow">Tree View</button>
                    <button type="button" class="btn btn-default" id="TableShow">Table View</button>
                    <br/>
                    <br/>
                    <input type="text" class="form-control" id="stratname" value="">
                    <br/>
                    <input id='inputTitle' class="form-control" type="text" placeholder="Allocation">
                    <br/>
                    <div id="the-basics">
                        <input id='alloc'class="form-control typeahead" type="text" placeholder="Node ID">
                    </div>
                    
                </div>

                <div id="zoomGroup">
                  
                    <i data-zoom="+1" class="fa fa-search-plus fa-2x" ></i> <br/><br/>
                    <i data-zoom="-1" class="fa fa-search-minus fa-2x"></i>   <br/><br/>
                    <i id="checkNow" class="fa fa-check fa-2x"></i> <br/><br/>
                    <i id="submit" class="fa fa-floppy-o fa-2x"></i>
                    
                </div>



            </div>
            <div class="row" id="treeView" >

                <div id="tree-container" class="block-center"></div>

            </div>

            <div id="tableView" class='row' style='padding-top:130px;'>
                <div id="col1" class='col-md-offset-3 col-md-2'>
                </div>
                <div id="col2" class='col-md-offset-2 col-md-2'>
                </div>
            </div>




        </div>


        <script src="./js/createStrategy.js"></script>
    </body>

</html>
