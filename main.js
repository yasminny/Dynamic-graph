function initPageByHash() {
  window.addEventListener('hashchange', changeMainView);
  if (window.location.hash === '') {
    window.location.hash = '#home';
    return;
  }

  changeMainView();
}

function changeMainView() {
  const hash = window.location.hash;
  const main = document.querySelector('main');
  const navbar = document.querySelector('.navbar-nav');
  const homeTemplate = `<h1>Please select which stock you wish to view from the navigation bar above</h1>`;
  const graphTemplate = `<div class="chart"></div>`;

  if (hash === '#home') {
    // create home view
    main.innerHTML = homeTemplate;
   return navbar.innerHTML = `<a href="#home" class="active">Home</a>
    <a href="#AAPL">AAPL</a>
    <a href="#MSFT">MSFT</a>
    <a href="#TEVA">TEVA</a>`;
  }
  if (hash === '#AAPL') {
    main.innerHTML = graphTemplate;
    navbar.innerHTML = `<a href="#home">Home</a>
    <a href="#AAPL" class="active">AAPL</a>
    <a href="#MSFT">MSFT</a>
    <a href="#TEVA">TEVA</a>`;
    return createGraph('AAPL');
  }
  if (hash === '#MSFT') {
    main.innerHTML = graphTemplate;
    navbar.innerHTML = `<a href="#home">Home</a>
    <a href="#AAPL">AAPL</a>
    <a href="#MSFT" class="active">MSFT</a>
    <a href="#TEVA">TEVA</a>`;
    return createGraph('MSFT');
  }
  if (hash === '#TEVA') {
    main.innerHTML = graphTemplate;
    navbar.innerHTML = `<a href="#home">Home</a>
    <a href="#AAPL">AAPL</a>
    <a href="#MSFT">MSFT</a>
    <a href="#TEVA" class="active">TEVA</a>`;
   return createGraph('TEVA');
  }
  else{
    main.innerHTML = `<h1>Sorry! didn't recognize the URL address... please use the navigation bar above</h1>`;
  }
}

function createGraph(hash) {
  const dataFile = `assets/${hash}.json`;
  let margin = {top: 20, right: 20, bottom: 30, left: 50};
  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;
  let parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");


  let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  d3.json(dataFile, function (err, data) {
    let validPriceObj = data.prices.filter((i)=> i.price !== "Error!");
    let priceRange = d3.extent(validPriceObj, d => d.price);
    const shortRange = d3.extent(data.shorts, d => d.shorts);
    let dateRange = d3.extent(data.prices, d => parseTime(d.date));
    let pricesExtend = [];
    let shortsExtend = [];

    pricesExtend[0] = Math.floor(priceRange[0]/10)*10;
    pricesExtend[1] = Math.floor(priceRange[1]/10 +1)*10;

    shortsExtend[0] = Math.floor(shortRange[0]/10)*10;
    shortsExtend[1] = Math.floor(shortRange[1]/10 +1)*10;

    validPriceObj.forEach(d => {
        d.date = parseTime(d.date);
        d.price = +d.price;
    });

    let xScale = d3.scaleTime()
      .domain(dateRange)
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(8));

    let yScale = d3.scaleLinear()
      .domain(pricesExtend)
      .range([height, 0]);
    svg
      .append('g')
      .call(d3.axisLeft(yScale).ticks(5));

    let yScaleShorts = d3.scaleLinear()
      .domain(shortsExtend)
      .range([height, 0]);
    svg
      .append('g')
      .call(d3.axisRight(yScaleShorts).ticks(5, 's'));

    let area = d3.area()
      .x(d => xScale(d.date))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.price));

    svg
      .selectAll('.area')
      .data(validPriceObj)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', area(validPriceObj))
      // .style('stroke', '#3796BB')
      .style('stroke-width', 2)
      // .style('fill', 'white')
      // .style('background', 'linear-gradient(to bottom, rgba(103,208,224,1) 0%, rgba(255,255,255,0.38) 100%)')
      // .style('fill-opacity', 0.5);
  });
}

function responsivefy(svg) {
  // get container + svg aspect ratio
  let container = d3.select(svg.node().parentNode),
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

initPageByHash();