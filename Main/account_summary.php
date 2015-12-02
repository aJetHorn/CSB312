<?php
include 'dbmgr.php';
$db = new Dbmgr();
//$buys = $db->getBuys();
//$sells = $db->getSells();
$portfolios = $db->getPortfolioIDs();
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



        <script>
            $(function () {

                $("#submit").on("click", function () {
                  
                    $.ajax({
                        url: 'getTrades.php',
                        type: 'GET',
                        data: {'portfolioID': $("#portID").find(":selected").attr("id")},
                        success: function (data, status) {
                            console.log(data);
                            var buys = data[0];
                            var sells = data[1];
                            var i = 0;
                            var asset_id;
                            var value;
                            var date;
                            var action;
                            var sum = 0;

                            for (i = 0; i < buys.length; i++) {

                                asset_id = "<td>" + buys[i].asset_id + "</td>";
                                value = "<td>" + buys[i].value + "</td>";
                                date = "<td>" + buys[i].date + "</td>";
                                action = "<td>" + buys[i].action + "</td>";
                                $("#buy_body").append("<tr>" + asset_id + value + date + action + "</tr>");
                                sum += parseInt(buys[i].value);
                            }
                            $("#buy_total").append(sum);
                            sum = 0;
                            for (i = 0; i < sells.length; i++) {

                                asset_id = "<td>" + sells[i].asset_id + "</td>";
                                value = "<td>" + sells[i].value + "</td>";
                                date = "<td>" + sells[i].date + "</td>";
                                action = "<td>" + sells[i].action + "</td>";
                                $("#sell_body").append("<tr>" + asset_id + value + date + action + "</tr>");
                                sum += parseInt(sells[i].value);
                            }
                            $("#sell_total").append(sum);

                        },
                        error: function (xhr, desc, err) {
                            console.log("Not Successful ajax call");
                        }

                    });
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
                        <li class=""><a href="../Main/hub.php">Home</a></li>
                        <li class=""><a href="../Main/createStratPage.php">Create Strategy</a></li>

                        <li><a href="../Research/portfolioView.html">Portfolio</a></li>
                        <li class="active"><a href="../Main/account_summary.php">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <?php
                    echo "<select id='portID' style='width:100%'>";
                    for ($i = 0; $i < sizeof($portfolios); $i++) {
                        echo "<option id='" . $portfolios[$i]->id . "'>" . $portfolios[$i]->name . "</option>";
                    }
                    echo "</select>";
                    ?>
                </div>
                <br/>
                <br/>

            </div>
            <div class="row">
                <div class="col-lg-2">
                    <button class="btn btn-success" id="submit" style="width:100%;">View Trades</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">

                    <h3>Pending Buys</h3>
                    <h4 id="buy_total">Total:$ </h4>
                    <br/>
                    <?php
                    /*
                      $sum = 0;
                      for ($i = 0; $i < sizeof($buys); $i++) {
                      $sum+=(double) $buys[$i]->value;
                      }
                      echo "<h4>Total : $" . $sum . "</h4><br/>";
                     * 
                     */
                    ?>
                    <table class="table table-striped table-responsive table-hover">
                        <thead>
                            <tr>
                                <th data-field="id">Asset</th>
                                <th>Amount</th>
                                <th>Trade Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="buy_body">
                            <?php
                            /*
                             * 
                              for ($i = 0; $i < sizeof($buys); $i++) {
                              echo "<tr><td class='links'><a href='#'>";
                              echo $buys[$i]->asset_id;
                              echo "</a></td> <td>";
                              echo $buys[$i]->value;
                              echo "</td> <td>";
                              echo $buys[$i]->date;
                              echo "</td> <td>";
                              echo $buys[$i]->action;
                              echo "</td> </tr>";
                              }
                             * 
                             */
                            ?>


                        </tbody>   
                    </table>



                </div>
                <div class="col-md-6">
                    <h3>Pending Sells</h3>
                    <h4 id="sell_total">Total:$ </h4>
                    <br/>
                    <?php
                    /* $sum = 0;
                      for ($i = 0; $i < sizeof($sells); $i++) {
                      $sum+=(double) $sells[$i]->value;
                      }
                      echo "<h4>Total : $" . $sum . "</h4><br/>";
                     */
                    ?>


                    <table class="table table-striped table-responsive table-hover">
                        <thead>
                            <tr>
                                <th data-field="id">Asset</th>
                                <th>Amount</th>
                                <th>Trade Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="sell_body">
                            <?php
                            /*
                              for ($i = 0; $i < sizeof($sells); $i++) {
                              echo "<tr><td class='links'><a href='#'>";
                              echo $sells[$i]->asset_id;
                              echo "</a></td> <td>";
                              echo $sells[$i]->value;
                              echo "</td> <td>";
                              echo $sells[$i]->date;
                              echo "</td> <td>";
                              echo $sells[$i]->action;
                              echo "</td> </tr>";
                              }
                             * 
                             */
                            ?>


                        </tbody>   
                    </table>

                </div>
            </div>
        </div>
    </body>
</html>

