
var height = 900
var width = 1060

var canvas = d3.select("#viz")
	.append("svg")
	.attr("height",height)
	.attr("width",width);

d3.csv("gdpData.csv", function(data){
	data.forEach(function(d){
		d.year= +d.year
		d.gdp= +d.gdp
		d.population= +d.population
	})

var yearMin = d3.min(data,function(d){return d.year});

var yearMax = d3.max(data, function(d){return d.year});

var gdpMin = d3.min(data,function(d){return d.gdp});

var gdpMax = d3.max(data, function(d){return d.gdp});

var popMin = d3.min(data,function(d){return d.population});

var popMax = d3.max(data, function(d){return d.population});

var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

var yearScale = d3.scaleLinear()
	.domain([yearMin,yearMax]).nice()
	.range([0,width-105]);

var gdpScale = d3.scaleLinear()
	.domain([gdpMax*1000000,gdpMin*1000000])
	.range([5,height-100]);

var popScale = d3.scaleLinear()
	.domain([popMax,popMin])
	.range(["red","green"]);

var xAxis = d3.axisBottom()
	.scale(yearScale)
	.ticks(5)
	.tickFormat(d3.format('d'));

var yAxis = d3.axisLeft()
	.scale(gdpScale)
	.ticks(5)
	.tickFormat(d3.formatPrefix(".1", 1e13));

canvas.append("g")
	.call(xAxis)
	.attr("transform","translate(70,800)");

var xLabel = canvas.append("text")
	.text("Year")
	.attr("x",width-30)
	.attr("y",790)
	.attr("font-family","Lucida Console")
	.attr("font-size",12);

canvas.append("g")
	.call(yAxis)
	.attr("transform","translate(70,0)");

var yLabel = canvas.append("text")
	.text("Annual GDP (in Trillions)")
	.attr("x",80)
	.attr("y",15)
	.attr("font-family","Lucida Console")
	.attr("font-size",12);

var valueLine = d3.line()
	.x(function(d){return yearScale(d.year);})
	.y(function(d){return gdpScale(d.gdp*1000000);});

var selector = d3.select("#select")
	.append("select")
		.attr("class","selector")
	.on("change",update);

var options = selector.selectAll("option")
	.data(data)
	.enter()
	.append("option")
		.text(function(d){return d.country;});

function update(){

var country = d3.select(".selector").node().value;

var path = canvas.append("path")
	.data([data.filter(function(d){return d.country === country})])
	.attr("d",valueLine)
	.attr("fill","none")
	.attr("stroke",function() {return "hsl(" + Math.random() * 360 + ",100%,30%)";})
	.attr("stroke-width",2)
	.attr("transform","translate(70,0)")
	.on("mouseover",function(d){
		d3.select("#country").text(country)
		});
}


});










































