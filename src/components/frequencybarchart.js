import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

function createChart(dom, data){
	var svgWidth = 960,
		svgHeight = 500;
	var svg = d3.select(dom).append("svg").attr("width", svgWidth).attr("height", svgHeight),
	    margin = {top: 20, right: 20, bottom: 30, left: 80},
	    width = svgWidth - margin.left - margin.right,
	    height = svgHeight - margin.top - margin.bottom;
  	
	var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleBand().range([height, 0]);

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
	if(data) {	  		  
	  	data.sort(function(a, b) { return a.value - b.value; });	  
	  	x.domain([0, d3.max(data, function(d) { return d.value; })]);
	    y.domain(data.map(function(d) { return d.id; })).padding(0.1);

	    g.append("g")
	        .attr("class", "x axis")
	       	.attr("transform", "translate(0," + height + ")")
	      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { console.log('d' + d); return parseInt(d / 1); }).tickSizeInner([-height]));

	    g.append("g")
	        .attr("class", "y axis")
	        .call(d3.axisLeft(y));

	    g.selectAll(".bar")
	        .data(data)
	      .enter().append("rect")
	        .attr("class", "bar")
	        .attr("x", 0)
	        .attr("height", y.bandwidth())
	        .attr("y", function(d) { return y(d.id); })
	        .attr("width", function(d) { return x(d.value); })
	        .on("mousemove", function(d){
	            tooltip
	              .style("left", d3.event.pageX - 50 + "px")
	              .style("top", d3.event.pageY - 70 + "px")
	              .style("display", "inline-block")
	              .html((d.id) + "<br>" + " score is " + (d.value));
	        })
	    		.on("mouseout", function(d){ tooltip.style("display", "none");});
	}
};



var FrequencyChart = React.createClass({
  propTypes: {
    model: React.PropTypes.array.isRequired,
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <h3>{this.props.title}</h3>        
      </div>
    );
  },
  componentDidMount: function() {
    var dom =  ReactDOM.findDOMNode(this);
    createChart(dom, this.props.model);
  },
  shouldComponentUpdate: function() {
    var dom =  ReactDOM.findDOMNode(this);
      createChart(dom, this.props.model);
      return false;
  }
});

export default FrequencyChart;