<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is basically the home page. Users can view strategies and portfolios.
 * // to view a strategy just click on the list item on the list.
 * // there is the option to allow the user to delete strategies.
 * - Wellesley Arreza
 */


// get strategies
// get id
// get name
include 'dbmgr.php';

$db = new Dbmgr();
$lst = $db->getStrategyIDs();
$portfolios = $db->getPortfolioIDs();
/*
 * for debugging purposes.
  for($i=0; $i<sizeof($lst); $i++){
  echo "\r\n";
  echo $lst[$i]->name;
  echo "<br/>";
  }
 */
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hub Page</title>

        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>


        <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="./css/menu.css">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="./css/customNavbar.css">
        <style>
            body{
                background-image: url("../Main/img/home_bkg.jpg");
                background-repeat: no-repeat;
                background-position: center center;   
            }
        </style>

        <script>
            $(function () {
                var tabs = $("#tabs").tabs();
                tabs.find(".ui-tabs-nav").sortable({
                    axis: "x",
                    stop: function () {
                        tabs.tabs("refresh");
                    }
                });


                $('.links').on('click', function () {
                    $('#selectedStrategy').attr("value", $(this).parent().children(".linkID").text());

                    $('#selectedName').attr("value", $(this).parent().children(".links").children().text());
                    document.getElementById("form1").submit();
                });

                $('.plinks').on('click', function () {
                    $('#selectedP').attr("value", $(this).parent().children(".linkID").text());

                    $('#selectedPName').attr("value", $(this).parent().children(".links").children().text());
                    document.getElementById("form2").submit();
                });


            });
        </script>

    </head>
    <body>

        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Portfolio App 2.0 </a>
                </div>
                <div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="../Main/hub.php">Home</a></li>
                        <li class=""><a href="../Main/createStratPage.php">Create Strategy</a></li>

                        <li><a href="../Research/portfolioView.html">Portfolio</a></li>
                        <li><a href="../Main/account_summary.php">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="col-md-offset-5 col-md-2" style="text-align:center; color:white;">
            <h1>Home</h1>
        </div>

        <div id="main" class="col-md-offset-3 col-md-6">
            <div id="tabs">
                <ul>
                    <li><a href="#tabs-1">My Strategies</a></li>
                    <li><a href="#tabs-2">Delete Strategies</a></li>
                    <li><a href="#tabs-3">My Portfolios</a></li>
                    <li><a href="#tabs-4">Apply Strategies</a></li>
                </ul>
                <div id="tabs-1">
                    <form id="form1" action="viewStrategy.php" method="post">

                        <table class="table table-striped table-responsive table-hover">
                            <thead>
                                <tr>
                                    <th data-field="id">View/Modify Strategy</th>    
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                // php code to print out the list of strategies.
                                //echo '';

                                for ($i = 0; $i < sizeof($lst); $i++) {
                                    echo "<tr><td class='links'><a href='#'>";
                                    echo $lst[$i]->name;
                                    echo "</a></td> <td class='linkID' style='display:none;'>";
                                    echo $lst[$i]->id;
                                    echo "</td> </tr>";
                                }
                                echo '<input type="hidden" id="selectedName" value="" name="selectedName">';
                                echo '<input type="hidden" id="selectedStrategy" value="" name="selectedStrategy">';
                                ?>


                            </tbody>   
                        </table>
                    </form>

                </div>

                <div id="tabs-2">
                    <h3>Delete Strategy </h3>
                    <?php
                    echo '<form action="deleteStrategy.php" method="post">';
                    echo "<select name='list'>";
                    for ($i = 0; $i < sizeof($lst); $i++) {
                        echo "<option value='" . $lst[$i]->id . "'>" . $lst[$i]->name . "</option>";
                    }
                    echo "</select>";
                    echo ' <input type="submit" value="Submit">';
                    echo '</form>';
                    ?>
                </div>

                <div id="tabs-3">


                    <form action="createPortfolioPage.php" method="post">
                        <h3>Create New Portfolio</h3>                 
                        <input type="text" class="form-control" id="cpText" name="newPortfolio">
                        <input type="submit" id="cpSubmit">
                    </form>

                    <br/>


                    <form id="form2" action="viewPortfolio.php" method="post">
                        <table class="table table-striped table-responsive table-hover">
                            <thead>
                                <tr>
                                    <th data-field="id">My Portfolios</th>    
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                for ($i = 0; $i < sizeof($portfolios); $i++) {
                                    echo "<tr><td class='plinks'><a href='#'>";
                                    echo $portfolios[$i]->name;
                                    echo "</a></td> <td class='linkID' style='display:none;'>";
                                    echo $portfolios[$i]->id;
                                    echo "</td> </tr>";
                                }
                                echo '<input type="hidden" id="selectedPName" value="" name="selectedPName">';
                                echo '<input type="hidden" id="selectedP" value="" name="selectedP">';
                                ?>


                            </tbody>   
                        </table>
                    </form>



                </div>

                <div id="tabs-4">
                    <form action="strat2port.php" method="post">
                        <h4>Apply </h4>
                        <br/>
                        <h5>Strategy</h5>
                        <?php
                        echo "<select name='slist'>";
                        for ($i = 0; $i < sizeof($lst); $i++) {
                            echo "<option value='" . $lst[$i]->id . "'>" . $lst[$i]->name . "</option>";
                        }
                        echo "</select>";
                        ?>
                        <br/>
                        <br/>
                        <h4>To </h4>
                        <br/>
                        <h5>Portfolio </h5>
                        <?php
                        echo "<select name='plist'>";
                        for ($i = 0; $i < sizeof($portfolios); $i++) {
                            echo "<option value='" . $portfolios[$i]->id . "'>" . $portfolios[$i]->name . "</option>";
                        }
                        echo "</select>";
                        ?>
                        <br/>
                        Allocation amount : <input type="number" style="margin-top:60px;" name="quantity" min="0" max="100">
                        <br/>
                        <br/>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>

