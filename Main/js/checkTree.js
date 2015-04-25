


$(document).ready(function() {

    function checkSum(){
    // for each node
    // get the sum
    // if it all equals 100% ur good.
    var sum=0;
    
    $(".allocation.showVal").each( function(){
        console.log("class"+$(this));
        var val=parseInt($(this).text());
        
        console.log("sum"+sum);
        console.log("val"+val);
        if((sum+val)>100){
            console.log("error");
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
        console.log("Only this much"+ sum);
        return false;
    }   
}

    
    
     $("#stratCheck").on("click", function() {
         if(checkSum()){
             alert("Good total");
         }
         else{
             alert("Invalid total");
         }
    });
    
});