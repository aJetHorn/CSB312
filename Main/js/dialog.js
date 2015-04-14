$(document).ready(function() {
    var dialog, form;
 
     
 
    
 
 
    function addInstrument() {

      
      var name=$("#formName").val();
      var alloc=$("#formAllocation").val();
      var parent=$("#formParent").val();
      
      
      var str="";
      str+="<li id='"+name+"'>";
      str+="<a href='#' class='node'>";
      str+="<div class='name'>"+name+"</div>";
      
      str+="<div class='allocation showVal'>";
      str+=alloc;
      str+="</div>";
      str+="<div class='percent showVal'>%</div>";
      str+="</a>";
      str+="<ul>";
      str+="</ul>";
      str+="</li>";
      
      /*<li id="Equity">
       * <a href="#" class="node">
                                <div class="name">Equity</div>
                                <div class="allocation" style='display: none;'>10</div>
                                <div class="percent" style='display:none;'>%</div>
                                </a>
        </li>
       */
      
      alert($("#"+parent).find("ul").length);
      alert(parent);
      $("#"+parent).children(".node").children(".allocation").removeClass("showVal");
      $("#"+parent).children(".node").children(".percent").removeClass("showVal");
      $("#"+parent).children(".node").children(".allocation").addClass("hideVal");
      $("#"+parent).children(".node").children(".percent").addClass("hideVal");
      $("#"+parent).children("ul").append(str);
      setClickHandler(); // i added this because of a stupid jquery glitch.. need to set onclick again after append.
      return true;
    }
 
 
 
 
 
 
    // instantiate dialog.
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Create Instrument": addInstrument, // add addInstrument()
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      
        
        addInstrument(); // call addInstrument()
    
    
    });
 
 
 
 
   // Add button onclick
 
 
    $( "#add" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
    

    
    
    function setHandler(){
    
    // node onclick. To View
    $(".node").on( "click", function() {
        var nodeobj=$(this);
        
        $( "#dialog-node-info" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Save Changes": function(){
           
        }, 
        Cancel: function() {
          $( "#dialog-node-info" ).dialog( "close" );
          
        }
      },
      close: function() {
        
      }
    });
    
    
    // open window
    $( "#dialog-node-info" ).dialog( "open" );
     $( "#dialog-node-info" ).empty(); // empty the html from before.
     var html="";
     var name=nodeobj.children(".name").html();
     var div="<div id='changecontainer'>";
     var plus="<input type='button' class='plus' value='+'>";
     var value="<div class='percentvalue'>"+nodeobj.children(".allocation").html()+"</div>";
     var minus="<input type='button' class='minus' value='-'>";
     var endDiv="</div>";
     html=html+"<h1>"+name+"</h1></br> Adjust Allocation </br>"+div+plus+value+minus+endDiv;
     /*
      * <input type='button' class='plus' value='+'>
                            <div class='percentvalue'>25</div> 
                            <div class='percent'> %</div>
                            <input type='button' class='minus' value='-'>
      */
     value+="%";
     $( "#dialog-node-info" ).append(html);
     increase(nodeobj.children(".allocation")); // these functions should be here to set the handler. Jquery glitch
     decrease(nodeobj.children(".allocation")); // these functions should be here to set the handler. Jquery glitch
    
  });
  
  
  
  
    }
    
    setClickHandler();
     checkBalance();
        saveStrat();
    
    
    function setClickHandler(){
        setHandler();
      
    }
  
    
    function checkBalance(){
        $("#balanceCheck").on("click", function() {
         if(checkSum()){
             alert("Good total");
         }
         else{
             alert("Invalid total");
         }
    });
    }
    
    function saveStrat(){
        checkBalance();
    }
    
    
    
    
    
  function checkSum(){
    // for each node
    // get the sum
    // if it all equals 100% ur good.
    var sum=0;
    $(".allocation.showVal").each( function(){
        console.log("class"+$(this));
        var val=parseInt($(this).html());
        
        console.log("sum"+sum);
        console.log("val"+val);
        if((sum+val)>100){
            return false;
        }
        else{
            sum+=val;
        }
    });
    
    if(sum==100){
    return true;
}
else{
    return false;
}
    
    
    
    
}

function checkBound(){
    // if x<0 or x>100
    
}

function increase(obj){
    var to;
    var int;
   
    // when user holds down
    $(".plus").on("mousedown", function () {
       var htmlnode=$(this).parent().find(".percentvalue");
       var htmlval=htmlnode.html();
       
        var temp=parseInt(htmlval);
        
        temp++;
        htmlnode.html(temp);
        obj.html(temp); //actual tree change
        
        
        to = setTimeout(function () {
            int = setInterval(function () {
                temp++;
                htmlnode.html(temp);
                obj.html(temp); //actual tree change
            }, 75);
        }, 500);
    }).on("mouseup", function () {
        clearTimeout(to);
        clearInterval(int);
    });
}

function decrease(obj){
    
    var to;
    var int;
    
    // when user holds down
    $(".minus").on("mousedown", function () {
       
       var htmlnode=$(this).parent().find(".percentvalue");
       var htmlval=htmlnode.html();
       
        var temp=parseInt(htmlval);
        
        temp--;
        htmlnode.html(temp);
        obj.html(temp); // actual tree change
        
        
        to = setTimeout(function () {
            int = setInterval(function () {
                temp--;
                htmlnode.html(temp);
                obj.html(temp); //actual tree change
            }, 75);
        }, 500);
    }).on("mouseup", function () {
        clearTimeout(to);
        clearInterval(int);
    });


}
  
  
  
  
  

});