// NetworkVisualization.js
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Sample data structure
const sampleNetworkData = {
  nodes: [
    { 
      id: 1, 
      type: "stakeholder", 
      name: "Tech Industry Association",
      category: "industry",
      influence: 85,
      active: true
    },
    { 
      id: 2, 
      type: "stakeholder", 
      name: "Consumer Rights Group",
      category: "advocacy",
      influence: 65,
      active: true
    },
    { 
      id: 3, 
      type: "issue", 
      name: "Data Privacy",
      importance: 90,
      activity: "high"
    },
    { 
      id: 4, 
      type: "issue", 
      name: "AI Regulation",
      importance: 85,
      activity: "high"
    }
  ],
  links: [
    {
      source: 1,
      target: 2,
      type: "collaboration",
      strength: 0.8
    },
    {
      source: 1,
      target: 3,
      type: "engagement",
      strength: 0.9
    },
    {
      source: 2,
      target: 3,
      type: "engagement",
      strength: 0.7
    }
  ]
};

export default function NetworkVisualization({ 
  width = 800, 
  height = 600,
  data = sampleNetworkData 
}) {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up the SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Create a group for the network
    const g = svg.append("g");

    // Set up the force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links)
        .id(d => d.id)
        .distance(100)
        .strength(d => d.strength))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Draw the links
    const links = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.strength) * 2);

    // Draw the nodes
    const nodes = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation));

    // Add circles for nodes
    nodes.append("circle")
      .attr("r", d => getNodeSize(d))
      .attr("fill", d => getNodeColor(d))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Add labels
    nodes.append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", d => getNodeSize(d) + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .style("font-size", "12px");

    // Set up node dragging
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // Update positions on each tick
    simulation.on("tick", () => {
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodes
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Add interactivity
    nodes
      .on("mouseover", handleNodeHover)
      .on("mouseout", handleNodeUnhover)
      .on("click", handleNodeClick);

    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  // Utility functions
  const getNodeSize = (node) => {
    if (node.type === "stakeholder") {
      return Math.sqrt(node.influence) * 2;
    }
    return Math.sqrt(node.importance) * 1.5;
  };

  const getNodeColor = (node) => {
    const colors = {
      stakeholder: {
        industry: "#4299e1",
        advocacy: "#48bb78",
        research: "#ed8936"
      },
      issue: "#805ad5"
    };
    return node.type === "stakeholder" 
      ? colors.stakeholder[node.category] 
      : colors.issue;
  };

  const handleNodeHover = (event, d) => {
    // Add hover effects
  };

  const handleNodeUnhover = (event, d) => {
    // Remove hover effects
  };

  const handleNodeClick = (event, d) => {
    setSelectedNode(d);
  };

  return (
    <div className="network-visualization-container">
      <svg ref={svgRef}></svg>
      {selectedNode && (
        <div className="node-details-panel">
          <h3>{selectedNode.name}</h3>
          {/* Add more node details here */}
        </div>
      )}
    </div>
  );
}