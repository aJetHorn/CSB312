<?php
include 'dbmgr.php';
$db = new Dbmgr();
$lst = $db->getTrades();
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



            <h3>Pending Trades</h3>
            <table class="table table-striped table-responsive table-hover">
                <thead>
                    <tr>
                        <th data-field="id">Asset</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    
                    for ($i = 0; $i < sizeof($lst); $i++) {
                        echo "<tr><td class='links'><a href='#'>";
                        echo $lst[$i]->asset_id;
                        echo "</a></td> <td>";
                        echo $lst[$i]->value;
                        echo "</td> <td>";
                        echo $lst[$i]->date;
                        echo "</td> <td>";
                        echo $lst[$i]->action;
                        echo "</td> </tr>";
                    }
                    ?>


                </tbody>   
            </table>


        </div>

    </body>
</html>

