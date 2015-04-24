<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Wellesley Arreza</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">


        <!-- JS -->

        <!--http://stackoverflow.com/questions/21024681/javascript-how-can-you-pass-global-variables-between-js-files -->
        <script type='text/javascript' > 
            var nodeSelected = "";

        </script>

        
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
        <!--<script src='js/saveStrategy.js'></script> -->
        <script src="js/jquery.ui.touch-punch.min.js"></script>
         <script src="js/scroll.js"></script>
         <script src="js/strategyMenu.js"></script>
         <script src="js/tree.js"></script>
         <script src="js/dragdrop.js"></script>
         <script src="js/customAdd.js"></script>
         


         <script src="js/slider.js"> </script>
        
        <style>
            #red .ui-slider-range { background: #ef2929; }
  #red .ui-slider-handle { border-color: #ef2929; }
            </style>

        <!-- CSS -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
        <link href="css/tree.css" rel="stylesheet">
        <link rel="stylesheet" href="./css/menu.css">
        <!-- Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    </head>
    <body>

        <div id='selectionBar'>
           <!-- <i class="fa fa-plus-circle fa-3x fa-fw margin-bottom"></i>
            <i class="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i>
            <i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i> -->

               
        </div>
        
         <div id="leftmenu">
             <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left fa-2x fa-fw margin-bottom"></i> Back to Main Menu </button> 
            <br/>
            <br/>
            
            <div id="red"></div>
            <br/>
            <br/>
            
            <button type="button" class="btn btn-primary"><i class="fa fa-plus-circle fa-2x fa-fw margin-bottom"></i> Add Quick Node</button> 
            <br/>
            <br/>
            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Equity</span>
            </div>
            
            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Cash</span>
            </div>

            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>Fixed Income</span>
            </div>
            
            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>IBM</span>
            </div>
            
            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>TSLA</span>
            </div>
            
            <div class='drag'>
                <i class=" fa fa-circle fa-1x fa-fw margin-bottom"></i> <span class ='dragtext'>JPM</span>
            </div>

            <br/>
            <br/>
            
            <button type="button" id="customAdd" class="btn btn-info"><i class="fa fa-plus-circle fa-2x fa-fw margin-bottom"></i> Add Custom Node</button>
            <br/>
            <br/>
            Parent : 
            <select id="parentList">
           
          </select>
            <input type="text" id="inputName" value="name">
            <input type="text" id="inputAlloc" value="0">%
            <br/>
            <br/>
            <button type="button" class="btn btn-success"><i class="fa fa-minus-circle fa-2x fa-fw margin-bottom"></i> Delete Node </button>
            <br/>
            <br/>
            <button type="button" class="btn btn-warning"><i class="fa fa-search-plus fa-2x fa-fw margin-bottom"></i> Zoom In/Out </button>
            <br/>
            <br/>
            <button type="button" class="btn btn-danger"><i class="fa fa-check-circle fa-2x fa-fw margin-bottom"></i> Check Balance </button>
           
            

        </div>
        
        
        
        
        
        
        
        
        
        
        
        <div id='main' style="">


            
                <div id="treeDiv">
                    
                    
                    
                    <!-- Tree -->

                    <div class="tree">
                                <ul class="showParent"> <!-- Unordered List of Strategy -->

                                    <!-- C -->
                                    <li id="Asia123" class="root" >

                                        <a href="#" class="node drop" id='3'>
                                            <div class="name">Strategy Name</div>
                                            <div class="current hideVal"></div>
                                            <div class="drift hideVal"></div>
                                            <div class="allocation showVal"></div>
                                            <div class="percent showVal" ></div>
                                        </a>


                                        <ul class="showParent">

                                  





                                </ul>

                    </div>  <!-- END OF TREE -->
                </div>
            </div>



        

    </body>
</html>
