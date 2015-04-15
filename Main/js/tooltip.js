/* Wellesley Arreza
* Bootstrap.js for tooltip popups.
* Possibly not used? - TJ
*/ 

$(document).ready(function() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });   

  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  $('.popbutton').on('shown.bs.popover', function () {
  // slider
    $(function() {
      $( ".pslider" ).slider({
        value: 60,
        orientation: "horizontal",
        range: "min",
        animate: true
      });
    });

    $( ".pslider" ).on( "slide", function( event, ui ) {
      console.log(ui.value);
    });
  });
});