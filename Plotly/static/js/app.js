function buildMetadata(sample) {
  
    d3.json(`/metadata/${sample}`).then((Data) => {
        var $data = d3.select("#sample-metadata");   
        $data.html("");  
        Object.entries(Data).forEach(([key, value]) => {
        $data.append("h6").text(`${key}: ${value}`);
     
 });
      // BONUS: Build the Gauge Chart
    //buildGauge(data.WFREQ);

var frequency =  Data.WFREQ;
console.log(frequency);

// Trig to calc meter point
var degrees = 180 - (20*frequency),
     radius = .6;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'WFREQ',
    text: frequency,
    hoverinfo: 'text+name'},
  { values: [10/9, 10/9, 10/9, 10/9, 10/9, 10/9, 10/9,10/9,10/9,10],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2','0-1'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(58, 95, 89, 1)','rgba(69, 126, 115, 1)',
  				   'rgba(84, 135, 126, 1)','rgba(94, 151, 140, 1)',
  				   'rgba(120, 177, 166, 1)','rgba(145, 202, 191, .5)',
  				   'rgba(171, 228, 217, .5)','rgba(212, 252, 248, 1)',
  				   'rgba(221, 255, 255, 1)','rgba(0,0,0,0)']},
  labels: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2','0-1'],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false 
}];
var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washing Frequency',
  height: 450,
  width: 450,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
    
    });
  }
  
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  d3.json(`/samples/${sample}`).then((Data) => {

console.log(Data.otu_ids);
    
    var x = Data.otu_ids
    //console.log(x);
    var y = Data.sample_values
    //console.log(y);
    //Bubble chart
    var trace2  = {
      x: x,
      y: y,
      
      mode: "markers",
      marker: {
        color: x,
        size: y,
        text: Data.otu_labels,
        symbol: ["circle"]
      }
    };
    var layout2 = {
      xaxis: {title:"OTU ID"}
     };

    var data = [trace2];

    Plotly.newPlot("bubble",data, layout2);



    var items = []
      // i,
      // x = Data.otu_ids,
      // y = Data.sample_values;
    for (i = 0; i < x.length; i++) {
      items[i] = [x[i], y[i]];
    }
    console.log(items);

    //var items = Object.keys(dict).map(function(key) {
    //  return [key, dict[key]];
    //});
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
      type: "pie",
      text: Data.otu_labels.map(row => row)
    }
    var pieData = [trace1];
    var layout1 = {
      height: 500,
      width: 500
    };

    Plotly.newPlot("pie", pieData, layout1);

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
