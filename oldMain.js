// let svg = d3.select("svg"),
//   margin = {top: 20, right: 20, bottom: 30, left: 40},
//   width = +svg.attr("width") - margin.left - margin.right,
//   height = +svg.attr("height") - margin.top - margin.bottom;
//
// let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//   y = d3.scaleLinear().rangeRound([height, 0]);
//
// let g = svg.append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// d3.json("assets/TEVA.json", function(d) {
//   d = d.prices;
//   console.log(d);
//   d.frequency = +d.frequency;
//   return d;
// }, function(error, data) {
//   if (error) throw error;
//
//   x.domain(data.map(function(d) { return d.letter; }));
//   y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
//
//   g.append("g")
//     .attr("class", "axis axis--x")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));
//
//   g.append("g")
//     .attr("class", "axis axis--y")
//     .call(d3.axisLeft(y).ticks(10, "%"))
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", "0.71em")
//     .attr("text-anchor", "end")
//     .text("Frequency");
//
//   g.selectAll(".bar")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", function(d) { return x(d.letter); })
//     .attr("y", function(d) { return y(d.frequency); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.frequency); });
// });
// let d3 = require('d3');

// let svg = d3.select("svg"),
//   margin = {top: 20, right: 20, bottom: 30, left: 50},
//   width = +svg.attr("width") - margin.left - margin.right,
//   height = +svg.attr("height") - margin.top - margin.bottom,
//   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// let parseTime = d3.timeParse("%d-%b-%y");
//
// let x = d3.scaleTime()
//   .rangeRound([0, width]);
//
// let y = d3.scaleLinear()
//   .rangeRound([height, 0]);
//
// let line = d3.line()
//   .x(function(d) { return x(d.date); })
//   .y(function(d) { return y(d.price); });
//
// d3.json("assets/TEVA.json", function(d) {
//   d = d.prices;
//   d = d.filter((i)=>{
//     return i.price !== "Error!"
//     });
//   console.log(d);
//
//   d.date = d.map((item)=>{return parseTime(item.date);});
//   d.price = d.map((item)=>{return item.price;});
//     // +d[ind].price;
//   console.log(d);
//   return d;
// }, function(error, data) {
//   if (error) throw error;
//
//   x.domain(d3.extent(data, function(d) { d.forEach((item)=> {return item.date;}); }));
//   y.domain(d3.extent(data, function(d) { d.forEach((item)=> {return item.price;}); }));
//
//   g.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .select(".domain")
//     .remove();
//
//   g.append("g")
//     .call(d3.axisLeft(y))
//     .append("text")
//     .attr("fill", "#000")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", "0.71em")
//     .attr("text-anchor", "end")
//     .text("Price ($)");
//
//   g.append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("stroke-width", 1.5)
//     .attr("d", line);
// });
//
// // set the dimensions and margins of the graph
// let margin = {top: 20, right: 20, bottom: 30, left: 50},
//   width = 960 - margin.left - margin.right,
//   height = 500 - margin.top - margin.bottom;
//
// // parse the date / time
// let parseTime = d3.timeParse("%Y");
// // let parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
//
// // set the ranges
// let x = d3.scaleTime().range([0, width]);
// let y = d3.scaleLinear().range([height, 0]);
//
// // define the line
// let valueline = d3.line()
//   .x(function(d) { return x(d.Date); })
//   .y(function(d) { return y(d.Imports); });
// // define the line
// let valueline2 = d3.line()
//   .x(function(d) { return x(d.Date); })
//   .y(function(d) { return y(d.Exports); });
//
// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// let svg = d3.select("body").append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform",
//     "translate(" + margin.left + "," + margin.top + ")");
//
// function draw(data, country) {
//
//   let data = data[country];
//
//   // format the data
//   data.forEach(function(d) {
//     d.Date = parseTime(d.Date);
//     d.Imports = +d.Imports;
//     d.Exports = +d.Exports;
//   });
//
//   // sort years ascending
//   data.sort(function(a, b){
//     return a["Date"]-b["Date"];
//   })
//
//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.Date; }));
//   y.domain([0, d3.max(data, function(d) {
//     return Math.max(d.Imports, d.Exports); })]);
//
//   // Add the valueline path.
//   svg.append("path")
//     .data([data])
//     .attr("class", "line")
//     .attr("d", valueline);
//   // Add the valueline path.
//   svg.append("path")
//     .data([data])
//     .attr("class", "line")
//     .attr("d", valueline2);
//   // Add the X Axis
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));
//
//   // Add the Y Axis
//   svg.append("g")
//     .call(d3.axisLeft(y));
// }
// // Get the data
// d3.json("data.json", function(error, data) {
//   if (error) throw error;
//
//   // trigger render
//   draw(data, "Afghanistan");
// });


// set the dimensions and margins of the graph
let margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// parse the date / time "%Y"
let parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");

// set the ranges
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// define the line
let valueline = d3.line()
  .x(function(d) { return x(d.date); })
  // .y(function(d) { return y(d.Imports); });
.y(function(d) { return y(d.price); });
// define the line
// let valueline2 = d3.line()
//   .x(function(d) { return x(d.Date); })
//   .y(function(d) { return y(d.Exports); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

function draw(info, country) {
  let data = info[country];

  // format the data
  data.forEach(function(d) {
    if(d.price !== "Error!"){
      d.date = parseTime(d.date);
      d.price = +d.price;
      // console.log(d.price, d.date);
    }
    // d.Imports = +d.Imports;
    // d.Exports = +d.Exports;
  });

  // sort years ascending
  data.sort(function(a, b){
    return a["date"]-b["date"];
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  // y.domain([0, d3.max(data, function(d) {
  y.domain(d3.extent(data, function(d) {
    // return Math.max(d.Imports, d.Exports); })]);
  return d.price; }));


  // Add the valueline path.
  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);
  // // Add the valueline path.
  // svg.append("path")
  //   .data([data])
  //   .attr("class", "line")
  //   .attr("d", valueline2);
  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
// Get the data
d3.json("assets/TEVA.json", function(error, data) {
// d3.json("data.json", function(error, data) {
  if (error) throw error;
  let validPriceObj = data.prices.filter((i)=> i.price !== "Error!");
  let priceRange = d3.extent(validPriceObj, function (d) {
    console.log(d.price);
    // if(typeof d.price === "Number") {
      return d.price;
    // }
  });
  let dateRange = d3.extent(data.prices, function (d) {
    return d.date;
  });

  console.log(dateRange, Math.floor(priceRange[0]/10)*10, Math.floor(priceRange[1]/10 +1)*10, priceRange, Math.floor(priceRange[0]).toString().length);
  // trigger render
  // draw(data, "Afghanistan");

  draw(data, "prices");
});


