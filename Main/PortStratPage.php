<?php
/*
 * - Wellesley Arreza
 */

include 'dbmgr.php';

$db = new Dbmgr();
$pID=$POST['portfolioID'];
$lst = $db->getSIDfrom_p($pID);

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

                //store pID,sID,allocation in array
                
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
                        <li><a href="#">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div id="main" class="col-md-offset-3 col-md-6">



           
                    <h4>Apply </h4>
                    <br/>
                    <h5>Strategy</h5>
                    
                    <table>
                        <tr>
                            
                        </tr>
                    </table>
                        
                    <?php 
                    echo "<select name='slist'>";
                    for ($i = 1; $i < sizeof($lst); $i++) {
                        echo "<option value='" . $lst[$i]->id . "'>" . $lst[$i]->name . "</option>";
                    }
                    echo "</select>";
                    ?>
                    <input type="button" style="" value="Add Strategy">
                    <br/>
                    <input type="submit" style="margin-top:60px;" value="Submit">
            

        </div>
    </body>
</html>

