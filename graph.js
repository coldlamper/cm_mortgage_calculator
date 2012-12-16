function plotGraph(data) {


    var ticks = data.date;
    var balance = data.balance;
    var months = data.balance.length;
    var equity = data.equity;
    /*
    var ticks = [
        [1, 'Dec 10'],
        [2, 'Jan 11'],
        [3, 'Feb 11'],
        [4, 'Mar 11'],
        [5, 'Apr 11'],
        [6, 'May 11'],
        [7, 'Jun 11'],
        [8, 'Jul 11'],
        [9, 'Aug 11'],
        [10, 'Sep 11'],
        [11, 'Oct 11'],
        [12, 'Nov 11'],
        [13, 'Dec 11']
    ];
      */

    jQuery('#chart_div').empty();
    var plot = $.jqplot('chart_div', [ equity,balance,equity], {
        stackSeries:false,
        showMarker:false,
        highlighter:{
            show:true,
            showMarker:false,
            showTooltip:false,
            bringSeriesToFront:false
        },
        seriesDefaults:{
            fill:true,
            fillAlpha:0.5
        },
        series:[
            {label:'Date',showLine:false,showLabel:false},
            {label:'Balance',color:'#4bb2c5',shadow:false},
            {label:'Equity',color:'#00ff00',shadow:false},

        ],
        legend:{
            show:true,
            placement:'insideGrid'
        },
        grid:{
            drawBorder:true,
            shadow:false
        },
        axes:{
            xaxis:{
              // ticks:ticks,
               // tickRenderer:$.jqplot.CanvasAxisTickRenderer,
                renderer:$.jqplot.DateAxisRenderer,
                tickOptions:{
                    angle:-40,
                    showLabel:true,
                    formatString:'%b %#m, %Y'

                },

                min:balance[0][0],
                max:balance[months-1][0],
                drawMajorGridlines:false
            },
            yaxis:{
                min: 0,
                tickOptions:{
                    formatString: "$%'d"

                },
}
        },
        cursor: {
            style: "false",
            tooltipOffset:10,
            show: true,
            showTooltipDataPosition:true,
            showVerticalLine:true,
            followMouse:true,
            useAxesFormatters:true,
            tooltipLocation : 'sw',
            formatByLabel:{
                Date:{x:'%s: %s'},
                Equity:{y:'%s: %s'},
                Balance:{y:'%s: %s'}
            }

        }

    });
    }
    // capture the highlighters highlight event and show a custom tooltip.
    /*
     $('#chart2').bind('jqplotHighlighterHighlight',
     function (ev, seriesIndex, pointIndex, data, plot) {
     // create some content for the tooltip.  Here we want the label of the tick,
     // which is not supplied to the highlighters standard tooltip.
     var content = plot.series[seriesIndex].label + ', ' + plot.series[seriesIndex]._xaxis.ticks[pointIndex][1] + ', ' + data[1];
     // get a handle on our custom tooltip element, which was previously created
     // and styled.  Be sure it is initiallly hidden!
     var elem = $('#customTooltipDiv');
     elem.html(content);
     // Figure out where to position the tooltip.
     var h = elem.outerHeight();
     var w = elem.outerWidth();
     var left = ev.pageX - w - 10;
     var top = ev.pageY - h - 10;
     // now stop any currently running animation, position the tooltip, and fade in.
     elem.stop(true, true).css({left:left, top:top}).fadeIn(200);
     }
     );

     // Hide the tooltip when unhighliting.
     $('#chart2').bind('jqplotHighlighterUnhighlight',
     function (ev) {
     $('#customTooltipDiv').fadeOut(300);
     }
     );
     */


function drawTable(data) {
   /*
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time');
    data.addRows(5);
    data.setCell(0, 0, 'John');
    data.setCell(0, 1, 10000, '$10,000');
    data.setCell(0, 2, true);
    data.setCell(1, 0, 'Mary');
    data.setCell(1, 1, 25000, '$25,000');
    data.setCell(1, 2, true);
    data.setCell(2, 0, 'Steve');
    data.setCell(2, 1, 8000, '$8,000');
    data.setCell(2, 2, false);
    data.setCell(3, 0, 'Ellen');
    data.setCell(3, 1, 20000, '$20,000');
    data.setCell(3, 2, true);
    data.setCell(4, 0, 'Mike');
    data.setCell(4, 1, 12000, '$12,000');
    data.setCell(4, 2, false);
     */
    var data = google.visualization.arrayToDataTable(data,false);
    var table = new google.visualization.Table(document.getElementById('schedule_div'));
    table.draw(data, {showRowNumber: false});


}


function drawSummary(data) {
    /*
     var data = new google.visualization.DataTable();
     data.addColumn('string', 'Name');
     data.addColumn('number', 'Salary');
     data.addColumn('boolean', 'Full Time');
     data.addRows(5);
     data.setCell(0, 0, 'John');
     data.setCell(0, 1, 10000, '$10,000');
     data.setCell(0, 2, true);
     data.setCell(1, 0, 'Mary');
     data.setCell(1, 1, 25000, '$25,000');
     data.setCell(1, 2, true);
     data.setCell(2, 0, 'Steve');
     data.setCell(2, 1, 8000, '$8,000');
     data.setCell(2, 2, false);
     data.setCell(3, 0, 'Ellen');
     data.setCell(3, 1, 20000, '$20,000');
     data.setCell(3, 2, true);
     data.setCell(4, 0, 'Mike');
     data.setCell(4, 1, 12000, '$12,000');
     data.setCell(4, 2, false);
     */
    var data = google.visualization.arrayToDataTable(data,false);
    var table = new google.visualization.Table(document.getElementById('summary_div'));
    table.draw(data, {showRowNumber: false});


}
