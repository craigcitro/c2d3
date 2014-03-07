
var totalHeight = 500;
var totalWidth = 960;
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

var parseDate = d3.time.format('%Y%m%d');
var printedDate = d3.time.format('%b %d');

var x = d3.time.scale()
    .range([0, width]);
var xAxis = d3.svg.axis()
    .ticks(d3.time.days, 1)
    .tickFormat(printedDate)
    .scale(x)
    .orient('bottom');

var y = d3.scale.linear()
    .range([height, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

function columnAsLine(xIndex, yIndex) {
  return d3.svg.line()
    .x(function(d) { return x(xIndex(d)); })
    .y(function(d) { return y(yIndex(d)); });
}

var myData = null;

function drawChart() {
  var svg = d3.select('#svg-container').append('svg')
      .attr('height', totalHeight)
      .attr('width', totalWidth)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  d3.csv('alldata.csv', function(d) {
    d.Date = parseDate.parse(d.Date);
    return d;
  }, function(e, data) {
    var lineNames = d3.keys(data[0]).slice(1);

    x.domain(d3.extent(data.map(attr('Date'))));
    y.domain([0, d3.max(lineNames, function(c) {
      return d3.max(data.map(attrOrValue(c)));
    })]);

    myData = data;
    
    // make it pretty
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    var gridIndices = d3.range(2, y.ticks().length, 2);
    var yGridlines = svg.selectAll('y gridline')
        .data(gridIndices.map(function(i) { return y.ticks()[i]; }))
      .enter().append('g')
        .attr('class', 'y gridline')
        .attr('transform', function(d) {
          return 'translate(0,' + y(d) + ')';
        });
    yGridlines.append('line')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', width).attr('y2', 0);
    yGridlines.append('text')
        .attr('transform', 'translate(' + (width - 10) + ',0)')
        .attr('y', 3)
        .attr('dy', '.71em')
        .style('text-anchor', 'middle')
        .text(function(d) { return d; });
        
    // add the lines
    lineNames.forEach(function(c, i) {
      var colorClass = 'q' + i;
      var lineGroup = svg.append('g')
          .attr('class', 'linegroup')
          .on('dblclick', function(d, i) {
            // TODO(craigcitro): this is so overkill. also classList
            // isn't always supported.
            var oldClass = d3.set(d3.event.target.classList)
                .values().filter(function(c) {
                  return c[0] === 'q';
                });
            if (oldClass === []) {
              return;
            }
            var classUpdates = {};
            classUpdates[oldClass[0]] = false;
            var target = d3.select(d3.event.target);
            if (target.classed('blank')) {
              return;
            }
            var nextClass = function() {
              return 'q' + Math.floor(Math.random() * 9);
            };
            var newClass = nextClass();
            while (target.classed(newClass)) {
              newClass = nextClass();
            }
            classUpdates[newClass] = true;
            target.classed(classUpdates);
            return;
          });
      lineGroup.append('title').text('Line ' + c);
      var svgLine = columnAsLine(attr('Date'), attr(c));
      // append a bigger mouseover target
      lineGroup.append('path')
          .datum(data)
          .attr('class', 'line blank')
          .attr('d', svgLine);
      // append the real line
      lineGroup.append('path')
          .datum(data)
          .attr('class', 'line ' + colorClass)
          .attr('d', svgLine);
    });

    // svg.append('g')
    //     .attr('class', 'y axis')
    //     .call(yAxis);
  });
}




function id(x) {
  return x;
}

function attrOrValue(attrName) {
  return function(x) {
    if (attrName in x) {
      return x[attrName];
    } else {
      return x;
    };
  };
}

function attr(attrName) {
  return function(x) {
    return x[attrName];
  };
}

function loadData(relPath, callback) {
  relPath = relPath || 'alldata.csv';
  var rows = null;
  d3.csv(relPath, id, function(x) {
    if (callback instanceof Function) {
      callback(x);
    }
  });
}
