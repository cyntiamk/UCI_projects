// from data.js
var tableData = data;
//console.log(data);

// create variable for tbody
var tbody = d3.select("tbody");

//loop through data 
tableData.forEach(function(ufoSighting){
	// append table row 'tr' to each ufo sighting object using d3
	var row = tbody.append("tr");
	// use Object.entries to console.log each ufo sighting value
	Object.entries(ufoSighting).forEach(function([key, value]){
	// append a cell to each row for each value in ufo sighting
	var cell = tbody.append("td");
	// update each cell text with ufo sighting values
	cell.text(value);
	});
});

// same results but sing arrow functions
// data.forEach((ufoSighting) => {
// 	var row = tbody.append("tr");
// 	Object.entries(ufoSighting).forEach(([key, value]) =>{
// 	var cell = tbody.append("td");
// 	cell.text(value);
// 	});
// });

var fitlerButton = d3.select("#filter-btn");

fitlerButton.on("click", function() {
	d3.event.preventDefault();

	var inputElement = d3.select("#datetime");

	var inputValue = inputElement.property("value");
	console.log(inputValue);
	console.log(tableData);

	var filteredData = tableData.filter(sight => sight.datetime === inputValue);
	console.log(filteredData);
	});

 
