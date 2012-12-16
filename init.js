var  mortgage_calculator = '';
var corechart_loaded = false;



// Load the Visualization API and the piechart package.
google.load('visualization', '1', {packages: ['table']});

// Set a callback to run when the Google Visualization library is loaded.
google.setOnLoadCallback(coreChartLoaded);

function coreChartLoaded() {

    var vis_loaded = true;
    display_results();
}


function display_results() {
    if (!validate_input())
        return;

    // var w = open ("", "", "width=300,height=100");
    // w . document . open ();
    // w . document . write ("<title>status</title><body bgcolor=black text=yellow><h1 align=center>Please wait...</h1>");
    // w . document . close ();

    mortgage_calculator.Mortgage(this.principle, this.interest, this.term);
    plotGraph(mortgage_calculator.graph_data);
    //output = parent . frames [2] . document;

    drawSummary(mortgage_calculator.MortgageSummary());

   // if ($("#show_schedule:checked").val()) {
       // output2 = '';
       // output2 += "<h3>schedule</h3>";
       // output2 += mortgage_calculator.MortgageWriteSchedule();
       // jQuery("#schedule_div").html(output2);
        drawTable(mortgage_calculator.MortgageSchedule());
   // }
    
    //check if we are in an iframe
    if(top !== self){
        //parent.jQuery('#' + window.frameElement.id).height(jQuery("body").height() + 20);
        
        //change parent iframe height to match content
        parent.document.getElementById(window.frameElement.id).style.height = (jQuery("body").height() + 20) +'px';
    }
    //  if (! w . closed)
    //     w . close ();
}

jQuery(document).ready(function () {
        mortgage_calculator = new mortgage();


})