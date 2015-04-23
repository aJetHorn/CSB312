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
        

         <script src="js/scroll.js"></script>
        
         <script src="js/tree.js"></script>
         
          <script src="js/renderStrategy.js"></script>
          
                  <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link href="css/tree.css" rel="stylesheet">
         <link rel="stylesheet" href="./css/style.css">
         <link rel="stylesheet" href="./css/portfolio.css">
        <!-- Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
    </head>
    
    <body>
        
        <div id="topHeader">
    <!--h1-->
    <span class="h1">View Strategy</span><!--/h1-->
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
        
        
        
        <?php
// Set session variables
 //echo $_SESSION["favcolor"];
 //echo       $_SESSION["favanimal"];
 $var= $_POST['list'];
 echo "<input type='hidden' id='selection' value='" . $var ."'>";
 
?>
        <div id='main' style="">


            <div id="resizable" class="ui-widget-content">
                <div id="treeDiv" style="overflow: scroll; position:relative;">



                    <!-- Tree -->

                    <div class="tree">
                        <ul class="showParent"> <!-- Unordered List of Strategy -->

                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>