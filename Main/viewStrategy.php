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
        <link href="css/tree.css" rel="stylesheet">
         
         
 
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">

        <!-- <link rel="stylesheet" href="./css/style.css"> -->
        <!-- Bootstrap Core CSS -->
        <!--<link href="./css/bootstrap.min.css" rel="stylesheet">-->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="./css/customNavbar.css">
        <link rel="stylesheet" href="./css/viewStrategy.css">
        
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

                    <li><a class="navbar-a" href="../Main/hub.php">Home</a></li>
                    <li><a class="navbar-a" href="../Main/createStratPage.php">Create New Strategy</a></li>
                    <li><a class="navbar-a" href="../Main/hub.php">Modify Strategy</a></li>
                    <li><a class="navbar-a" href="../Main/hub.php">Delete Strategy</a></li>

                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="navbar-a" href="#contact">
                            <i class="fa fa-user fa-2x fa-fw"></i>
                            Hi, Wellesley Arreza
                        </a>
                    </li>
                    <li><a class="navbar-a" href="../Main/login.html">Logout</a></li>
                </ul>
            </div><!--/.nav-collapse -->

        </nav>
    <center class="pageTitle">Strategy</center>
    <hr>
        
        
        
        <?php
        session_start();
// Set session variables
 //echo $_SESSION["favcolor"];
 //echo       $_SESSION["favanimal"];
 $var= $_POST['list'];
 $_SESSION['listid']=$_POST['list'];
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