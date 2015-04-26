<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// get strategies
// get id
// get name
include 'dbmgr.php';

$db = new Dbmgr();
$lst = $db->getStrategyIDs();

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


        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>


        <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">

        <link rel="stylesheet" href="./css/menu.css">
        <!-- <link rel="stylesheet" href="./css/style.css"> -->
        <!-- Bootstrap Core CSS -->
        <!--<link href="./css/bootstrap.min.css" rel="stylesheet">-->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="./css/customNavbar.css">


        <script>
            $(function() {
                var tabs = $("#tabs").tabs();
                tabs.find(".ui-tabs-nav").sortable({
                    axis: "x",
                    stop: function() {
                        tabs.tabs("refresh");
                    }
                });
            });
        </script>

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

                    <li><a class="navbar-a" href="/SEI/Main/hub.php">Home</a></li>
                    <li><a class="navbar-a" href="/SEI/Main/createStratPage.php">Create New Strategy</a></li>
                    <li><a class="navbar-a" href="/SEI/Main/hub.php">My Portfolios</a></li>

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
    <center class="pageTitle">Home</center>
    <hr>



    <div id="main">
        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Strategies</a></li>
                <li><a href="#tabs-2">Portfolios</a></li>
                <li><a href="#tabs-3">Apply Strategies</a></li>
            </ul>
            <div id="tabs-1">
                <table class="table table-striped table-responsive table-hover">
                    <thead>
                        <tr>
                            <th data-field="id">View Strategy</th>    
                        </tr>
                    </thead>
                    <tbody>
                        <?php
// php code to print out the list of strategies.

                        for ($i = 0; $i < sizeof($lst); $i++) {
                            echo "<tr><td>";
                            echo $lst[$i]->name;
                            echo "</td></tr>";
                        }
                        ?>


                    </tbody>   
                </table>
                <?php
                echo '<form action="viewStrategy.php" method="post">';
                echo "<select name='list'>";
                for ($i = 0; $i < sizeof($lst); $i++) {
                    echo "<option value='" . $lst[$i]->id . "'>" . $lst[$i]->name . "</option>";
                }
                echo "</select>";
                echo ' <input type="submit" value="Submit">';
                echo '</form>';
                ?>
            </div>

            <div id="tabs-2">
                <table class="table table-striped table-responsive table-hover">
                    <thead>
                        <tr>
                            <th data-field="id">View Portfolio </th>
                        </tr>     
                    </thead>
                    <tbody>
                        <tr><td><a href="portfolio.html">Portfolio A</a></td></tr>
                        <tr><td>Portfolio B</td></tr>
                        <tr><td>Portfolio C</td></tr>
                        <tr><td>Portfolio D</td></tr>
                        <tr><td>Portfolio E</td></tr>  
                    </tbody>
                </table>
            </div>

            <div id="tabs-3">
                <h2>Strategy</h2>
                <select>
                    <option value="Tech Strat">Tech Strat</option>
                    <option value="Strat test">Strat test</option>
                    <option value="BioStrategies">BioStrategies</option>
                    <option value="Template1">Template1</option>
                    <option value="Template2">Template2</option>
                    <option value="Template3">Template3</option>
                </select>

                <h2 style="margin-top:60px;">Portfolio</h2>
                <select>
                    <option value="Portfolio A">Portfolio A</option>
                    <option value="Portfolio A">Portfolio B</option>
                    <option value="Portfolio A">Portfolio C</option>
                    <option value="Portfolio A">Portfolio D</option>
                    <option value="Portfolio A">Portfolio E</option>
                </select>
                <p></p>
                <button style="margin-top:60px;">Apply</button>
            </div>
        </div>
        <!--       <div id="footer">
                   <div id="footerBorder"> </div>
                   SEI Investments
               </div> -->
    </div>
</body>
</html>

