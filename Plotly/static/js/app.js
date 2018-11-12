function buildMetadata(sample) {
  
    d3.json(`/metadata/${sample}`).then((data) => {
        var $data = d3.select("#sample-metadata");   
        $data.html("");  
        Object.entries(data).forEach(([key, value]) => {
        $data.append("h6").text(`${key}: ${value}`);
     
 });
    // BONUS: Build the Gauge Chart
    //buildGauge(data.WFREQ);
    
    });
  }

  
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  d3.json(`/samples/${sample}`).then((data) => {


    // Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var sampleData = [data];
    var color = "rgb" + "("+sampleData.map(row => row.otu_ids)+")";
    var size = sampleData.map(row => row.sample_values);
    var x = sampleData.map(row => row.otu_ids);
    console.log(x)
    var y = sampleData.map(row => row.sample_values);

    //Bubble chart
    var trace1 = {
      x: x,
      y: y,
      type: "scatter",
      mode: "markers",
      marker: {
        //color: color,
        //size: size,
        //text: sampleData.map(row => row.otu_labels),
        symbol: ["circle"]
      }
    };
    var layout = {
      title: "Bubble Chart",

    };
    var data = [trace1];
    Plotly.newPlot("bubble",data, layout);

  });
}



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
