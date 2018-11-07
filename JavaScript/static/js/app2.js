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

    var filterMenu = d3.select("#filterOptions");
    filterMenu.on("change", function (){ 
    var searchFilter = d3.selectAll("#filterOptions");
    var searchSelection = searchFilter.property("value");
    console.log(searchSelection);


switch(searchSelection){
    case "date":

        var fitlerButton = d3.select("#filter-btn");
        //create function to be exectude when filter table button is clicked
        fitlerButton.on("click", function() {
        // avoid page to be refreshed
        d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value").toLowerCase();
        console.log(inputValue);
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
    break;

    case "city":

        //create variable to select filter button from html
        var fitlerButton = d3.select("#filter-btn");

        //create function to be exectude when filter table button is clicked
        fitlerButton.on("click", function() {
        // avoid page to be refreshed
        d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value").toLowerCase();
        var filteredData = tableData.filter(sight => sight.city === inputValue);
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
    break;
        case "state":

        //create variable to select filter button from html
        var fitlerButton = d3.select("#filter-btn");

        //create function to be exectude when filter table button is clicked
        fitlerButton.on("click", function() {
        // avoid page to be refreshed
        d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value").toLowerCase();
        var filteredData = tableData.filter(sight => sight.state === inputValue);
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
    break;
    case "country":

        //create variable to select filter button from html
        var fitlerButton = d3.select("#filter-btn");

        //create function to be exectude when filter table button is clicked
        fitlerButton.on("click", function() {
        // avoid page to be refreshed
        d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value").toLowerCase();
        var filteredData = tableData.filter(sight => sight.country === inputValue);
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
    break;
    case "shape":

        //create variable to select filter button from html
        var fitlerButton = d3.select("#filter-btn");

        //create function to be exectude when filter table button is clicked
        fitlerButton.on("click", function() {
        // avoid page to be refreshed
        d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value").toLowerCase();
        var filteredData = tableData.filter(sight => sight.shape === inputValue);
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
    break;
}

    
 });
