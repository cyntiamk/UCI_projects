function buildMetadata(sample) {
  
    d3.json(`/metadata/${sample}`).then((Data) => {
        var $data = d3.select("#sample-metadata");   
        $data.html("");  
        Object.entries(Data).forEach(([key, value]) => {
        $data.append("h6").text(`${key}: ${value}`);
     
 });
    // BONUS: Build the Gauge Chart
    //buildGauge(data.WFREQ);
    
    });
  }
  
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  d3.json(`/samples/${sample}`).then((Data) => {
    
    var x = Data.otu_ids.map(row => row);
    //console.log(x);
    var y = Data.sample_values.map(row => row);
    //console.log(y);

    var dict = {},
      i,
      x = Data.otu_ids.map(row => row),
      y = Data.sample_values.map(row => row);
    for (i = 0; i < x.length; i++) {
      dict[x[i]] = y[i];
    }
    console.log(dict);

    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
    items.sort(function(a, b) {
      return b[1] - a[1];
    });
    var slicedArray = items.slice(0,10);
    console.log(slicedArray);
    
    var xPie = [];
    var yPie = [];
    var i = 0;
      for (i=0; i<slicedArray.length; i++){
        if (slicedArray[i][0] && i<slicedArray.length);
        xPie.push(slicedArray[i][0]);
      }
      console.log(xPie);
      
      for (i=0; i<slicedArray.length; i++){
        if (slicedArray[i][1] && i<slicedArray.length);
        yPie.push(slicedArray[i][1]);
      }

      console.log(yPie);

    //Pie chart
    var trace1 = {
      labels: xPie,
      values: yPie,
      type: "pie"
    }
    var pieData = [trace1];
    var layout1 = {
      height: 400,
      width: 500
    };

    Plotly.newPlot("pie", pieData, layout1);

    //Bubble chart
    var trace2  = {
      x: x,
      y: y,
      
      mode: "markers",
      marker: {
        color: x,
        size: y,
        text: Data.otu_labels.map(row => row),
        symbol: ["circle"]
      }
    };
    var layout2 = {
      xaxis: {title:"OTU ID"}
     };

    var data = [trace2];

    Plotly.newPlot("bubble",data, layout2);
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
