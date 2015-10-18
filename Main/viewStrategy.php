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





        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>

        <script src="js/jquery.ui.touch-punch.min.js"></script>


        <!-- Javascript -->

        <!-- End of Javascript -->


        <!-- CSS -->


        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

        <style type="text/css">

            .fa{
                cursor:pointer;
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


        <!-- End of CSS   -->



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

        <?php
// Set session variables
        $var2 = $_POST['selectedStrategy'];
        $name = $_POST['selectedName'];

        $_SESSION['linkID'] = $var2;
        echo "<input type='hidden' id='selection' value='" . $var2 . "'>";
        echo "<input type='hidden' id='selectionName' value='" . $name . "'>";
        ?>


        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="row">
                        <div class="col-lg-8 col-md-8 col-sm-8">
                            <input type="text" class="form-control" id="stratname" value="" readonly>
                        </div>
                    </div>

                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">

                    <div class="row">
                        <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-lg-8 col-md-8 col-sm-8">
                            <button type="button" class="btn btn-primary" id="TreeShow">Tree View</button>
                            <button type="button" class="btn btn-default" id="TableShow">Table View</button>
                        </div>
                    </div>


                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <i data-zoom="+1" class="fa fa-search-plus fa-2x"></i>
                        </div>
                        
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <i data-zoom="-1" class="fa fa-search-minus fa-2x"></i>
                        </div>
                     
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <i id="checkNow" class="fa fa-check fa-2x"></i>
                        </div>
                        
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <i id="submit" class="fa fa-floppy-o fa-2x"></i>
                        </div>
                        
                    </div>

                </div>

            </div>
            <div class="row" id="treeView" >

                <div id="tree-container" class="block-center"></div>

            </div>

            <div id="tableView" class='row' style='padding-top:130px;'>
                <div class='col-md-offset-3 col-md-2'>
                    <ul>

                        <li>
                            Strategy A
                            <ul>
                                <li>
                                    ABC
                                </li>
                            </ul>
                        </li>
                        <li>
                            XYZ
                        </li>
                        <li>
                            DAS
                        </li>
                    </ul>

                </div>

                <div class='col-md-offset-2 col-md-2'>
                    <ul>
                        <li>
                            100%
                        </li>
                        <li>
                            30%
                        </li>
                        <li>
                            20%
                        </li>
                        <li>
                            10%
                        </li>
                    </ul>
                </div>
            </div>
        </div>






        <script src="./js/renderStrategy2.js"></script>
    </body>

</html>