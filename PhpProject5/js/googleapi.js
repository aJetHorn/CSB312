 
 google.load("visualization", "1", {packages:["orgchart"]});
    
    // we want to call the drawChart method to draw the actual chart.
    google.setOnLoadCallback(drawChart);
      
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ID');
        data.addColumn('string', 'title');
        data.addColumn('string', 'value');
         // Use custom HTML content for the domain tooltip.
        data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
        
        
        data.addRows([
       // column 0 is te node ID.
       // column 1 is the PARENT NODE
       // column 2 is etc. information.
          [{v:'Portfolio'}, '', ''],
          [{v:'Bonds'}, 'Portfolio', ''],
          [{v:'Equity'}, 'Portfolio', ''],
          ['Stocks', 'Equity', ''],
          ['Cash & Equivalents', 'Portfolio', ''],
          ['Treasury', 'Bonds', ''],
          ['GS', 'Stocks', ''],
          ['MSFT', 'Stocks', ''],
          ['IBM', 'Stocks', '']
        ]);

        // we want to place our graph in the specific HTML div.
        var chart = new google.visualization.OrgChart(document.getElementById('mydiv'));
       // draw method from API.
        chart.draw(data, {allowHtml:true});
      }


