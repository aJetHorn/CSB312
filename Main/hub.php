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

$db= new Dbmgr();
$lst=$db->getStrategyIDs();

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
  <link rel="stylesheet" href="./css/style.css">
  <link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <link href="css/bootstrap.min.css" rel="stylesheet">


  <script>
  $(function() {
    var tabs = $( "#tabs" ).tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        tabs.tabs( "refresh" );
      }
    });
  });
  </script>

</head>
<body>
<div id="topHeader">
    <!--h1-->
    <span class="h1">Hub Page</span><!--/h1-->
    <div id="leftLinks">
      <a href="/">Hello, Yifei Gao</a> | <a href="/">Log Out</a>
    </div>
  </div>
  <div id="secondaryHeader">
    <div id ="links"> 
        <a href="hub.html">Hub</a> 
        <a href="newstrategy.html">Strategy</a> 
        <a href="portfolio.html">Portfolio</a> 
        <a href="https://github.com/aJetHorn/CSB312/blob/master/README.md">Help</a>
    </div>
    <!--div id="links"> <a href="/">Wednesday</a> | <a href="/">April 1st 2015</a> | <a href="/"> 3:12PM </a> | <a href="/"> 32°F </a-->
    </div>


    <div id="leftmenu">
          <!--div class="menuItem">
            <a href="hub.html">Hub Page</a></br>
          </div>
          <div class="menuItem">
            <a href="newstrategy.html">Design a Strategy</a> </br>
          </div>
          <div class="menuItem">
            <a href="portfolio.html">Portfolio View</a> </br>
          </div>
          <div class="menuItem">
            <a href="">Settings</a> </br>
          </div>
          <div class="menuItem">
            <a href="">Help</a> </br>
          </div-->
    </div>
    
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
                echo "<option value='" . $lst[$i]->id . "'>" . $lst[$i]->name . "</option>" ;
                
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
      <div id="footer">
        <div id="footerBorder"> </div>
          SEI Investments
      </div>
    </div>
</body>
</html>

