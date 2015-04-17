

$(document).ready(function() {
$('.directions').on('click', function(event) {

    var target = $( $(this).attr('href') );
    if( target.length ) {
        event.preventDefault();
        var current= $('#treeDiv').scrollLeft();
        console.log(target);
        var targetpos=target.parent().position().left;
        console.log(current);
        console.log(targetpos);
        
        if(current<targetpos) {
        $('#treeDiv').animate({
            scrollLeft: targetpos
        }, 1000);
        }
        else{
            $('#treeDiv').animate({
            scrollLeft: targetpos
        }, 1000);
        }
    }

});
});