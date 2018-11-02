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

    searchDate = d3.select("#date").text();
    searchCity = d3.select("#city").text();
    searchState = d3.select("#state").text();
    searchCountry = d3.select("#country").text();
    searchShape = d3.select("#shape").text();


    
       if (searchDate === "Date") {
        //create variable to select filter button from html
    var fitlerButton = d3.select("#filter-btn");

    //create function to be exectude when filter table button is clicked
    fitlerButton.on("click", function() {
    // avoid page to be refreshed
    d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value");
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
};

        if (searchCity === "City") {

        //create variable to select filter button from html
    var fitlerButton = d3.select("#filter-btn");

    //create function to be exectude when filter table button is clicked
    fitlerButton.on("click", function() {
    // avoid page to be refreshed
    d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value");
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
};
       if (searchState === "State") {
        //create variable to select filter button from html
    var fitlerButton = d3.select("#filter-btn");

    //create function to be exectude when filter table button is clicked
    fitlerButton.on("click", function() {
    // avoid page to be refreshed
    d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value");
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
};
        if (searchCountry === "Country") {
        //create variable to select filter button from html
    var fitlerButton = d3.select("#filter-btn");

    //create function to be exectude when filter table button is clicked
    fitlerButton.on("click", function() {
    // avoid page to be refreshed
    d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value");
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
};
       if (searchShape === "Shape") {
        //create variable to select filter button from html
    var fitlerButton = d3.select("#filter-btn");

    //create function to be exectude when filter table button is clicked
    fitlerButton.on("click", function() {
    // avoid page to be refreshed
    d3.event.preventDefault();
        var inputElement = d3.select("#inputSearch");
        var inputValue = inputElement.property("value");
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
};


