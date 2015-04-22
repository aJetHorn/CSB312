//TJ's notes: I'm going to use script.js for general interactivity
//until we decide on how to split up files

google.load("visualization", "1", {packages: ["orgchart"]});

$(document).ready(function() {
    var data; //Explain please
    var chart; //use?

    var collapseNext = false;
    var highlightNext = false;

    //TJ's zoom hack, draggable is a jquery UI feature
    $("#zoomControl").draggable(); 
    $("#zoomControl").toggle();

    data = new google.visualization.DataTable();
    chart = new google.visualization.OrgChart(document.getElementById('mydiv'));
    google.setOnLoadCallback(drawChart);
    //drawChart();
    // we want to call the drawChart method to draw the actual chart.

    $("#add").on("click", function() {
        console.log("add");
        console.log($("#node").val());
        console.log($("#parent").val());
        add($("#node").val(), $("#parent").val());
        //add("MS","Portfolio");
    });

    $("#highlight").on("click", function(){
        highlightNext = !highlightNext;
    });

    //toggles collapsing of subtree under next node clicked
    $("#collapseTree").on("click", function(){
        collapseNext = !collapseNext;
    });

    $(".node").on("click",function(){
         if (highlightNext){
            $(this).css("background-color", "#f1c40f");
            highlightNext = false;
        }
    });

    // $("li").on("click", function(){
    //     //if the subtree is to be collapsed
    //     console.log(collapseNext);
    //     if (collapseNext){
    //         //$(this).toggle();
    //         //$(this).children().toggle();
    //         //console.log($(this).find(".node"));
    //         $(this).find("li").toggle();
    //     }

    //     // //$("a").on("click"), function(){
    //     //     $(this).parent().children("ul").toggle();
    //     //     console.log("click");
    //     //     //}
    // });

    // $("a").on("click", function(){
    //     if (collapseNext){
    //         $(this).parent().children("ul").toggle();

    //     }
    // });

    //button event listeners for view controls
    //Probably going to remove these: TJ
    $("#toggleController").on("click", function(){
        $("#zoomControl").toggle();
    });
    $("#leftArrow").on("click", function(){

    });
    $("#upArrow").on("click", function(){

    });
    $("#downArrow").on("click", function(){

    });
    $("#rightArrow").on("click", function(){

    });
    //Just refreshes window, should restore "default" position of viewport
    $("#refreshArrow").on("click", function(){
        location.reload();
    });
    $("#plusButton").on("click", function(){
        $(".tree .node").each(function( index ){
            console.log("Test element: " + index);
            //console.log("Font-size:" + $(this).css("font-size"));
            $(this).css("width", "+=15%");
            $(this).css("height", "+=15%");
            $(this).css("font-size", "+=2%");
            $(this).css("text-align", "center");
            $(this).css("margin-top", "auto");
        })
    });
    $("#minusButton").on("click", function(){
        $(".tree .node").each(function( index ){
            $(this).css("width", "-=15%");
            $(this).css("height", "-=15%");
            $(this).css("font-size", "-=2%");
            $(this).css("text-align", "center");
            $(this).css("margin-top", "auto");
            //$(this).css("padding", "-=10%");
        })
    });

function drawChart() {
    data.addColumn('string', 'ID');
    data.addColumn('string', 'title');
    data.addColumn({'type': 'string', 'role': 'tooltip'});
   
    data.addRows([
        // column 0 is te node ID.
        // column 1 is the PARENT NODE
        // column 2 is etc. information.
        [{v: 'Portfolio'}, '', '<div style="color:red;">woosh</div>'],
        [{v: 'Bonds'}, 'Portfolio', '<p></p>'],
        [{v: 'Equity'}, 'Portfolio', '<p></p>'],
        ['Stocks', 'Equity', '<p></p>'],
        ['Cash & Equivalents', 'Portfolio', '<p></p>'],
        ['Treasury', 'Bonds', '<p></p>'],
        ['GS', 'Stocks', '<p></p>'],
        ['MSFT', 'Stocks', '<p></p>'],
        ['IBM', 'Stocks', '<p></p>']
    ]);

    /*
     *   data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
    data.addRows([
        // column 0 is te node ID.
        // column 1 is the PARENT NODE
        // column 2 is etc. information.
        [{v: 'Portfolio'}, '', '','<p>hey</p>'],
        [{v: 'Bonds'}, 'Portfolio', '','<p>hey</p>'],
        [{v: 'Equity'}, 'Portfolio', '','<p>hey</p>'],
        ['Stocks', 'Equity', '','<p>hey</p>'],
        ['Cash & Equivalents', 'Portfolio', '','<p>hey</p>'],
        ['Treasury', 'Bonds', '','<p>hey</p>'],
        ['GS', 'Stocks', '','<p>hey</p>'],
        ['MSFT', 'Stocks', '','<p>hey</p>'],
        ['IBM', 'Stocks', '','<p>hey</p>']
    ]); 
    * 
     * 
     */
    // draw method from API.
    chart.draw(data, {allowHtml: true, allowCollapse: true, focusTarget: "category"});
}
    function add(parent, child) {
        data.addRows([
        // column 0 is te node ID.
        // column 1 is the PARENT NODE
        // column 2 is etc. information.
            [parent, child, '']
        ]);
        draw();
        console.log("done drawing");
    }
    function draw() {
        // we want to place our graph in the specific HTML div.
        // draw method from API.
        chart.draw(data, {allowHtml: true, allowCollapse: true, tooltip:{}});
    }
});
