import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

function createChart(dom, props){
    
var diameter = 500,
    format = d3.format(",d");

var svg = d3.select(dom).append('svg');
svg.attr("width", diameter)
               .attr("height", diameter)
svg.append('g').attr("transform", function() { return "translate(1,1)";});            

var format = d3.format(",d");

var color = d3.scaleSequential(d3.interpolateMagma)
    .domain([-4, 4]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var pack = d3.pack()
    .size([diameter - 2, diameter - 2])
    .padding(3);

if(props.model) {
  var data = props.model;  

  var root = stratify(data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });

  pack(root);

  var node = svg.select('g')
    .selectAll("g")
    .data(root.descendants())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
      .each(function(d) { d.node = this; })
      .on("mouseover", hovered(true))
      .on("mouseout", hovered(false));

  node.append("circle")
      .attr("id", function(d) { return "node-" + d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.depth); });
      

  var leaf = node.filter(function(d) { return !d.children; });

  leaf.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#node-" + d.id + ""; });

  leaf.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
    .selectAll("tspan")
    .data(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

  node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });
};

function hovered(hover) {
  return function(d) {

    d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", hover);
  };
}


  
 
};

var BubbleChart = React.createClass({
  propTypes: {
    model: React.PropTypes.array.isRequired,
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <h3> {this.props.title}</h3>        
      </div>
    );
  },
  componentDidMount: function() {
    var dom =  ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
  },
  shouldComponentUpdate: function() {
    var dom =  ReactDOM.findDOMNode(this);
      createChart(dom, this.props);
      return false;
  }
});

export default BubbleChart;