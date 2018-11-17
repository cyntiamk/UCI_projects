var svgWidth = 960;
var svgHeight = 500;


var margin = {
	top: 20,
	right: 40,
	bottom: 80,
	left: 100
}

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

var chartGroup = svg.append("g")
	.attr("transfor", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";

function xScale(censusData, chosenXAxis) {
	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
			d3.max(censusData, d => d[chosenXAxis]) * 1.2
			])
		.range([0, width]);
	return xLinearScale;
}
function yScale(censusData, chosenYAxis) {
	var yLinearScale = d3.scaleLinear()
		.domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
			d3.max(censusData, d => d[chosenYAxis]) * 1.2
			])
		.range([height,0]);
	return yLinearScale;
}

function renderXAxes(newXScale, xAxis) {
	var bottomAxis = d3.axisBottom(newXScale);

	xAxis.transition()
		.durantion(500)
		.call(bottomAxis);
	return xAxis;
}
function renderYAxes(newYScale, yAxis) {
	var leftAxis = d3.axisLeft(newYScale);

	yAxis.transition()
		.durantion(500)
		.call(leftAxis);
	return yAxis;
}
function renderCircles(circleGroup, newXScale, chosenXAxis) {
	circleGroup.transition()
	.durantion(500)
	.attr("cx", d => newXScale(d[chosenXAxis]))
	.attr("cy", d=> newYScale(d[chosenYAxis]))
	return circleGroup;
}
function updateToolTip(chosenXAxis,chosenYAxis, circleGroup) {
	if (chosenXAxis ==="poverty") {
		var label = "In Poverty(%)";
	}
	
	else if (chosenXAxis === "income") {
		var label = "Household Income(Median)";
	}
	else if (chosenYAxis === "obesity") {
		var label = "Obesity(%)";
	}
	else if (chosenYAxis === "smokes") {
		var label = "Smokes(%)";
	}
	else if (chosenYAxis === "healthcare") {
		var label = "Lacks Healthcare(%)";
	}

	else{
		var label = "Age(Median)";
	}

var toolTip = d3.tip()
	.attr("class", "d3-tip")
	.offset([80, -60])
	.html(function(d){
		return (`${d[chosenXAxis]}<br>${d[chosenYAxis]}`);
	});
	circleGroup.call(toolTip);

	circleGroup.on("mouseover", function(data) {
		toolTip.show(data);
	})
	circleGroup.on("mouseout", function(data, index) {
			toolTip.hide(data);
		})
};


d3.csv("assets/data/data.csv", function(err, censusData) {
	if (err) return console.warn(err);
	console.log(censusData);

censusData.forEach(function (data) {
	data.poverty = +data.poverty;
	data.povertyMoe = +data.povertyMoe;
	data.income = +data.income;
	data.incomeMoe = +data.incomeMoe;
	data.age = +data.age;
	data.ageMoe = +data.ageMoe;
	data.state = data.state;
	data.abbr = data.abbr;
	data.povertyMoe = +data.povertyMoe;
	data.healthcare = +data.healthcare;
	data.healthcareLow = +data.healthcareLow;
	data.healthcareHigh = +data.healthcareHigh;
	data.obesity = +data.obesity;
	data.obesityLow = +data.obesityLow;
	data.obesityHigh = +data.obesityHigh;
	data.smokes = +data.smokes;
	data.smokesLow = +data.smokesLow;
	data.smokesHigh = +data.smokesHigh;
	console.log(data.obesity)
});


// var xLinearScale = xScale(censusData, chosenXAxis);
// var yLinearScale = yScale(censusData, chosenYAxis);

// var bottomAxis = d3.axisBottom(xLinearScale);
// var leftAxis = d3.axisLeft(yLinearScale);

// var xAxis = chartGroup.append("g")
// 	.classed("x-axis", true)
// 	.attr("transform", `translate(0, ${height})`)
// 	.call(bottomAxis);
// var yAxis = chartGroup.append("g")
// 	.call(leftAxis);

// var circleGroup = chartGroup.selectAll("circle")
// 	.data(censusData)
// 	.enter()
// 	.append("circle")
// 	.attr("cx", d => xLinearScale(d[chosenXAxis]))
// 	.attr("cy", d => yLinearScale(d[chosenYAxis]))
// 	.attr("r", 20)
// 	.attr("fill", "blue")
// 	.attr("opacity", ".5");

// var labelsGroup = chartGroup.append("g")
// 	.attr("transform", `translate(${width/2}, ${height + 20})`);

//  var povertyLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "poverty") // value to grab for event listener
//     .classed("active", true)
//     .text("In Poverty(%)");

//   var incomeLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "income") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Household Income(Median");

//   var ageLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 60)
//     .attr("value", "age") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Age(Median");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   updateToolTip function above csv import
//   var circleGroup = updateToolTip(chosenXAxis, circleGroup);

//   x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var xValue = d3.select(this).attr("value");
//       if (xValue !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = xValue;

//         console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(censusData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circleGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "poverty") {
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else if (chosenXAxis === "income"){ 
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomeLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomethLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           ageLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
});







