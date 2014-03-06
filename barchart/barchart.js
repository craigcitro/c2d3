"use strict";

var totalHeight = 560;
var totalWidth = 960;
var margin = {top: 20, right: 30, bottom: 40, left: 40};
var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0]);
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var xAxis = d3.svg.axis()
    .tickFormat(function(d) { return d.toUpperCase(); })
    .orient("bottom");

var yAxis = d3.svg.axis()
    .orient('left')
    .ticks(10, '%');

function drawChart() {

  var chart = d3.select('.chart')
      .attr('height', totalHeight)
      .attr('width', totalWidth)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv('data-letters.csv', function postprocess(d) {
    d.frequency = parseFloat(d.frequency) / 100;
    return d;
  }, function(e, data) {

    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data.map(function(d) { return d.frequency; }))]);

    xAxis.scale(x);
    yAxis.scale(y);
    
    var bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function(d, i) {
          return 'translate(' + x(d.letter) + ',0)';
        });

    bar.append('rect')
        .attr('height', function(d) { return height - y(d.frequency); })
        .attr('y', function(d) { return y(d.frequency); })
        .attr('width', x.rangeBand());

    bar.append('text')
        .attr('x', x.rangeBand() / 2)
        .attr('y', function(d) { return y(d.frequency) - 10; })
        .attr('dy', '.75em')
        .attr('text-anchor', 'middle')
        .text(function(d) { return (d.frequency * 100).toFixed(2) + '%'; });

    var xAxisMidpoint = (x.rangeExtent()[1] - x.rangeExtent()[0]) / 2;
    
    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      .append('text')
        .attr('transform', 'translate(' + xAxisMidpoint + ',0)')
        .attr('y', 30)
        .attr('dy', '.71em')
        .style('text-anchor', 'middle')
        .text('Letter');
    
    chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Frequency');
  });
}

