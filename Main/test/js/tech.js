// Wellesley Arreza


function checkSum(){
    // for each node
    // get the sum
    // if it all equals 100% ur good.
    var sum=0;
    $(".node").each( function(){
        console.log("class"+$(this));
        var val=parseInt($(this).find('.weight').find('.percentvalue').html());
        console.log("html"+ $(this).find('.weight').find('.percentvalue').html());
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

function increase(){
    var to;
    var int;
   
    // when user holds down
    $(".plus").on("mousedown", function () {
       var htmlnode=$(this).parent().find(".percentvalue");
       var htmlval=$(this).parent().find(".percentvalue").html();
       
        var temp=parseInt(htmlval);
        
        temp++;
        htmlnode.html(temp);
        to = setTimeout(function () {
            int = setInterval(function () {
                temp++;
                htmlnode.html(temp);
            }, 75);
        }, 500);
    }).on("mouseup", function () {
        clearTimeout(to);
        clearInterval(int);
    });
}

function decrease(){
    
    var to;
    var int;
    
    // when user holds down
    $(".minus").on("mousedown", function () {
       var htmlnode=$(this).parent().find(".percentvalue");
       var htmlval=$(this).parent().find(".percentvalue").html();
       
        var temp=parseInt(htmlval);
        
        temp--;
        htmlnode.html(temp);
        
        
        
        to = setTimeout(function () {
            int = setInterval(function () {
                temp--;
                htmlnode.html(temp);
            }, 75);
        }, 500);
    }).on("mouseup", function () {
        clearTimeout(to);
        clearInterval(int);
    });


}


$(document).ready(function() {
    
     $("#stratSubmit").on("click", function() {
         if(checkSum()){
             alert("Good total");
         }
         else{
             alert("Invalid total");
         }
    });

    
    
    increase();
    decrease();
    
    
    
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Wellesley Arreza