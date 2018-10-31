// from data.js
var tableData = data;
console.log(data);

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
console.log(tableData);
//create variable to select filter button from html
var dropdown = d3.select("dropdown-menu");
var li = d3.select("li")

//create function to be exectude when filter table button is clicked
fitlerButton.on("click", function() {
	// avoid page to be refreshed
	d3.event.preventDefault();

	// create variable to for input element
	var inputElement = d3.select("#datetime");
	// create variable to hold the value inserted into input elemennt
	var inputValue = inputElement.property("value");
	console.log(inputValue);

	//create variable to hold values of filtered table
	var filteredData = tableData.filter(sight => sight.datetime === inputValue);
	console.log(filteredData);	
	
	// clear tbody to input filtered data
	tbody.html("");
		//loop through filtered data only
		filteredData.forEach(function(ufoSighting){
		// append rows for tr again	
		var row = tbody.append("tr");
		// loop through to get each key an value
		Object.entries(ufoSighting).forEach(function([key, value]){
		// append each value into a cell	
		var cell = tbody.append("td");
		// display each cell content into html tbody
		cell.text(value);
		});
	});
});

