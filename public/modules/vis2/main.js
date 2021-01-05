
// SVG Size

// Use the margin convention
let margin = {top: 30, right: 30, bottom: 30, left:30}
var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load CSV file
d3.csv('/modules/vis2/data/wealth-health-2014.csv').then(function(data) {

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)
	/** Prepare and Sort Data By Population*/
	var preparedData = prepareData(data);
	var preparedData = sortData(preparedData);
	console.log(preparedData);

	/** Scales */
	let incomeScale = d3.scaleLinear()
		.domain([
			d3.min(
			preparedData, function(d) {
				return d.Income;
			}
		)-2000
			, d3.max(
			preparedData, function(d) {
				return d.Income;
		})+2000])
		.range([0, width]);

	// Create logarithmic scale function for income
	let incomeLogScale = d3.scaleLog()
		.base(2)
		.domain([
			d3.min(
				preparedData, function(d) {
					return d.Income;
				}
			)-50
			, d3.max(
				preparedData, function(d) {
					return d.Income;
				})+2000])
		.range([0, width]);


	let expectancyScale = d3.scaleLinear()
		.domain([d3.min(
			preparedData, function(d) {
				return d.LifeExpectancy;
			}
		)-5, d3.max(
			preparedData, function(d) {
				return d.LifeExpectancy;
			})+5])
		.range([height, 0]);

	// Add a scale function for the circle radius
	var radiusScale = d3.scaleLinear()
		.domain([d3.min(
			preparedData, function(d) {
				return d.Population;
			}
		), d3.max(
			preparedData, function(d) {
				return d.Population;
			})])
		.range([4, 30])

	console.log(incomeScale(5000));
	console.log(expectancyScale(68));

	// create a color scale function depending on their regions
	let colorPalette = d3.scaleOrdinal(d3.schemeAccent)
		.domain(data.map(
			function(d) {
				return d.Region;
			}
		));

	/** Circles */
	svg.selectAll("circle")
		.data(preparedData)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return incomeLogScale(d.Income);
		})
		.attr("cy", function(d) {
			return expectancyScale(d.LifeExpectancy);
		})
		.attr("r", function(d) {
			return radiusScale(d.Population);
		})
		.attr("fill", function(d) {
			return colorPalette(d.Region);
		})
		.attr("stroke", "black");

	/** Axes */
	let xAxis = d3.axisBottom(incomeLogScale)
		.tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000]);

	svg.append("g")
		.attr("class", "axis xAxis")
		.attr("transform", "translate(0, "+height+")")
		.call(xAxis)

	svg.append("text")
		.attr("x", 600)
		.attr("y", 430)
		.text("Income")

	let yAxis = d3.axisLeft(expectancyScale)

	svg.append("g")
		.attr("class", "axis yAxis")
		.attr("transform", "translate( 0, 0)")
		.call(yAxis)

	svg.append("text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("transform", "translate(20, 100) rotate(270)")
		.text("Life Expectancy")

});



function prepareData(data) {
	var preparedData = data.map(function(d) {
		d.Income = +d.Income;
		d.LifeExpectancy = +d.LifeExpectancy;
		d.Population = +d.Population;
		return d;
	});
	return preparedData;
}

function sortData(data) {
	var sortedData = data.sort(function(a, b) {
		return a.Population - b.Population;
	})
	return sortedData
}

