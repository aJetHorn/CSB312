//TJ's notes: I'm going to use script.js for general interactivity
//until we decide on how to split up files

google.load("visualization", "1", {packages: ["orgchart"]});

$(document).ready(function() {
    var data; //Explain please
    var chart; //use?

    //TJ's zoom hack, draggable is a jquery UI feature
    $("#zoomControl").draggable(); 

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
        $(".tree *").each(function( index ){
            console.log("Test element: " + index);
            $(this).css("width", "+=15%");
            $(this).css("height", "+=15%");
            $(this).css("font-size", "+=3%");
            //$(this).css("padding", "+=10%");
        })
    });
    $("#minusButton").on("click", function(){
        $(".tree *").each(function( index ){
            $(this).css("width", "-=15%");
            $(this).css("height", "-=15%");
            $(this).css("font-size", "-=3%");
            $(this).css("padding", "-=10%");
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
