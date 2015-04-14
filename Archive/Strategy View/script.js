var data;
    // we want to place our graph in the specific HTML div.
var chart;
$(document).ready(function() {
    data = new google.visualization.DataTable();
    chart = new google.visualization.OrgChart(document.getElementById('mydiv'));
    google.load("visualization", "1", {packages: ["orgchart"]});
    drawChart();
    // we want to call the drawChart method to draw the actual chart.



    $("#add").on("click", function() {
        console.log("add");
        console.log($("#node").val());
        console.log($("#parent").val());
        add($("#node").val(), $("#parent").val());
        //add("MS","Portfolio");
    });



});


function drawChart() {




    data.addColumn('string', 'ID');
    data.addColumn('string', 'title');
    data.addColumn('string', 'value');

    data.addRows([
        // column 0 is te node ID.
        // column 1 is the PARENT NODE
        // column 2 is etc. information.
        [{v: 'Portfolio'}, '', ''],
        [{v: 'Bonds'}, 'Portfolio', ''],
        [{v: 'Equity'}, 'Portfolio', ''],
        ['Stocks', 'Equity', ''],
        ['Cash & Equivalents', 'Portfolio', ''],
        ['Treasury', 'Bonds', ''],
        ['GS', 'Stocks', ''],
        ['MSFT', 'Stocks', ''],
        ['IBM', 'Stocks', '']
    ]);


    // draw method from API.
    chart.draw(data, {allowHtml: true, allowCollapse: true});

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
    chart.draw(data, {allowHtml: true, allowCollapse: true});
}