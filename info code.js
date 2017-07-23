let margin = { top: 10, right: 20, bottom: 60, left: 40 };
let width = 425 - margin.left - margin.right;
let height = 625 - margin.top - margin.bottom;

let svg = d3.select('.chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .call(responsivefy)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green');


let yScale = d3.scaleLinear()
  .domain([])
  .range([height, 0]);

let yAxis = d3.axisLeft(yScale).ticks(5, 's');

svg.call(yAxis);

let xScale = d3.scaleTime()
  .domain([])
  .range([0, width]);

let xAxis = d3.axisBottom(xScale).ticks(d3.timeDays.every(7));

svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis);


function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 400 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .call(responsivefy)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('./data.json', function (err, data) {

  var parseTime = d3.timeParse('%Y/%m/%d');

  data.forEach(company => {
    company.values.forEach(d => {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });
  });

  var xScale = d3.scaleTime()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.date)),
      d3.max(data, co => d3.max(co.values, d => d.date))
    ])
    .range([0, width]);
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  var yScale = d3.scaleLinear()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.close)),
      d3.max(data, co => d3.max(co.values, d => d.close))
    ])
    .range([height, 0]);
  svg
    .append('g')
    .call(d3.axisLeft(yScale));

  var area = d3.area()
    .x(d => xScale(d.date))
    .y0(yScale(yScale.domain()[0]))
    .y1(d => yScale(d.close))
    .curve(d3.curveCatmullRom.alpha(0.5));

  svg
    .selectAll('.area')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('d', d => area(d.values))
    .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
    .style('stroke-width', 2)
    .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
    .style('fill-opacity', 0.5);

});



// var xScale = d3.scaleBand()
//   .padding(0.2)
//   .domain(data.map(d => d.subject))
//   .range([0, width]);
//
// var xAxis = d3.axisBottom(xScale)
//   .ticks(5)
//   .tickSize(10)
//   .tickPadding(5);
// svg
//   .append('g')
//   .attr('transform', `translate(0, ${height})`)
//   .call(xAxis)
//   .selectAll('text')
//   .style('text-anchor', 'end')
//   .attr('transform', 'rotate(-45)');
//
// svg.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .attr('x', d => xScale(d.subject))
//   .attr('y', d => yScale(d.score))
//   .attr('width', d => xScale.bandwidth())
//   .attr('height', d => height - yScale(d.score));var xScale = d3.scaleBand()
//   .padding(0.2)
//   .domain(data.map(d => d.subject))
//   .range([0, width]);
//
// var xAxis = d3.axisBottom(xScale)
//   .ticks(5)
//   .tickSize(10)
//   .tickPadding(5);
// svg
//   .append('g')
//   .attr('transform', `translate(0, ${height})`)
//   .call(xAxis)
//   .selectAll('text')
//   .style('text-anchor', 'end')
//   .attr('transform', 'rotate(-45)');
//
// svg.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .attr('x', d => xScale(d.subject))
//   .attr('y', d => yScale(d.score))
//   .attr('width', d => xScale.bandwidth())
//   .attr('height', d => height - yScale(d.score));