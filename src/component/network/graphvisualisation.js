import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import * as d3 from "d3";

import sampleNetworkData from "./sampleNetworkData"

const NetworkVisualization = forwardRef(({
  width = 800,
  height = 600,
  data = sampleNetworkData,
  selectedIssues = [],
  filters = {},
  zoomLevel = 80,
  transform = null, // Make sure this is included
  onTransformChange = () => {},
  onNodeSelect = () => {},
}, ref) => {
  const transformRef = useRef(d3.zoomIdentity);
  const isInitialMount = useRef(true);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const issueColors = {
    "Data Privacy": {
      support: "#4299e1",
      oppose: "#f6ad55"
    },
    "AI Regulation": {
      support: "#48bb78",
      oppose: "#f56565"
    },
    "Platform Liability": {
      support: "#9f7aea",
      oppose: "#ecc94b"
    },
    "Digital Competition": {
      support: "#ed8936",
      oppose: "#4299e1"
    },
    "Content Moderation": {
      support: "#38b2ac",
      oppose: "#ed64a6"
    }
  };

  const categoryColors = {
    "industry": "#4299e1",
    "advocacy": "#48bb78",
    "research": "#ed8936",
    "government": "#805ad5",
    "standards": "#667eea",
    "professional": "#f687b3",
    "media": "#f6ad55",
    "international": "#9f7aea",
    "academic": "#4fd1c5"
  };

  // Expose smooth zoom method for external control
  useImperativeHandle(ref, () => ({
    smoothZoomTo: (newScale) => {
      if (!svgRef.current || !zoomRef.current) return;
      
      const svg = d3.select(svgRef.current);
      const current = transformRef.current;
  
      const updatedTransform = d3.zoomIdentity
        .translate(current.x, current.y)
        .scale(newScale);
  
      svg.transition()
        .duration(300)
        .call(zoomRef.current.transform, updatedTransform);
    }
  }));

  const getFilteredData = () => {
    let filteredNodes = [...data.nodes];

    if (filters.type && filters.type !== "All") {
      filteredNodes = filteredNodes.filter(
        (node) => node.category.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.influence && filters.influence !== "All") {
      const influenceRanges = {
        High: [75, 100],
        Medium: [50, 74],
        Low: [0, 49],
      };
      const range = influenceRanges[filters.influence];
      filteredNodes = filteredNodes.filter(
        (node) => node.influence >= range[0] && node.influence <= range[1]
      );
    }

    const filteredNodeIds = new Set(filteredNodes.map((node) => node.id));
    let filteredLinks = data.links.filter(
      (link) =>
        filteredNodeIds.has(link.source.id || link.source) &&
        filteredNodeIds.has(link.target.id || link.target)
    );

    if (filters.relationship && filters.relationship !== "All") {
      const strengthRanges = {
        Strong: 0.7,
        Moderate: 0.4,
        Weak: 0,
      };
      const minStrength = strengthRanges[filters.relationship];
      filteredLinks = filteredLinks.filter(
        (link) => link.strength >= minStrength
      );
    }

    return { nodes: filteredNodes, links: filteredLinks };
  };


  // Update dimensions when container size changes
  useEffect(() => {
    if (!svgRef.current) return;

    const filteredData = getFilteredData();

    // Clear existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const defs = svg.append("defs");
    const gradientContainer = svg.append("g")
      .attr("class", "gradient-container")
      .style("pointer-events", "none");  // Disable pointer events for the gradient

    const g = svg.append("g");

    // Create node gradients
    const createNodeGradients = () => {
      defs.selectAll("*").remove();
        
      if (selectedIssues.length > 0) {
        filteredData.nodes.forEach(node => {
          const gradientId = `node-${node.id}`;
          const gradient = defs.append("linearGradient")
            .attr("id", gradientId)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%")
            .attr("x2", "100%");

          selectedIssues.forEach((issue, i) => {
            const position = node.positions[issue] || 0;
            const colors = issueColors[issue];
            const color = position >= 0 ? colors.support : colors.oppose;
            const offset = (i / selectedIssues.length) * 100;
              
            gradient.append("stop")
              .attr("offset", `${offset}%`)
              .attr("stop-color", color)
              .attr("stop-opacity", Math.abs(position));
          });
        });
      }
    };

    // Keep track of current transform
    let currentTransform = d3.zoomIdentity;  // Initialize to default zoom and pan

    const zoom = d3.zoom()
      .scaleExtent([0.5, 4])
      .wheelDelta((event) => -event.deltaY * 0.002)
      .on("zoom", (event) => {
        transformRef.current = event.transform;
        g.attr("transform", transformRef.current);
        gradientContainer.attr("transform", transformRef.current);
        onTransformChange(transformRef.current);
      });

    // Apply the zoom behavior to the SVG
    svg.call(zoom)
      .attr("touch-action", "none");  // Disable default browser touch handling to ensure D3 handles it
      zoomRef.current = zoom;

    // Use provided transform state or default to identity transform
    const initialTransform = transform 
      ? d3.zoomIdentity.translate(transform.x, transform.y).scale(transform.k)
      : d3.zoomIdentity;

    if (isInitialMount.current) {
      svg.call(zoom.transform, initialTransform);
      isInitialMount.current = false;
    }

    // Create force simulation
    const simulation = d3
      .forceSimulation(filteredData.nodes)
      .force(
        "link",
        d3
          .forceLink(filteredData.links)
          .id((d) => d.id)
          .distance((d) => (d.type === "opposition" ? 200 : 100))
          .strength((d) => (d.type === "opposition" ? 0.3 : d.strength))
      )
      .force("charge", d3.forceManyBody().strength(d => -50 * Math.sqrt(d.influence)))  // Increase repulsion
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.5))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))
      .force(
        "collision",
        d3.forceCollide().radius((d) => Math.sqrt(d.influence) * 3 + 10).strength(0.8)
      );

      if (!isInitialMount.current && transform) {
        const updatedTransform = d3.zoomIdentity
          .translate(transform.x, transform.y)
          .scale(transform.k);
        svg.call(zoom.transform, updatedTransform);
      }

   // Add boundary force with zoom scaling
  simulation.force("boundary", () => {
  const currentTransform = transformRef.current;
  // Base padding that will be scaled
  const basePadding = 5;
  
  // Scale padding inversely with zoom level
  // As we zoom out (transform.k < 1), the padding increases
  const scaledPadding = basePadding / currentTransform.k;
  
  // Scale the containment area with zoom
  const effectiveWidth = width / currentTransform.k;
  const effectiveHeight = height / currentTransform.k;
  
  // Calculate boundaries in screen coordinates
  const bounds = {
    left: -currentTransform.x / currentTransform.k + scaledPadding,
    right: (-currentTransform.x + width) / currentTransform.k - scaledPadding,
    top: -currentTransform.y / currentTransform.k + scaledPadding,
    bottom: (-currentTransform.y + height) / currentTransform.k - scaledPadding
  };

  filteredData.nodes.forEach(node => {
    const r = Math.sqrt(node.influence) * 3 + 10;
    
    // Apply containment with scaled boundaries
    if (node.x < bounds.left + r) {
      node.x = bounds.left + r;
      node.vx = Math.abs(node.vx) * 0.5;
    }
    if (node.x > bounds.right - r) {
      node.x = bounds.right - r;
      node.vx = -Math.abs(node.vx) * 0.5;
    }
    
    if (node.y < bounds.top + r) {
      node.y = bounds.top + r;
      node.vy = Math.abs(node.vy) * 0.5;
    }
    if (node.y > bounds.bottom - r) {
      node.y = bounds.bottom - r;
      node.vy = -Math.abs(node.vy) * 0.5;
    }
  });
});

    // Position forces for selected issues
    selectedIssues.forEach((issue) => {
      simulation.force(`position-${issue}`, (alpha) => {
        filteredData.nodes.forEach((node) => {
          if (node.positions && node.positions[issue] !== undefined) {
            const targetX = width / 2 + (node.positions[issue] * width) / 4;
            const targetY = height / 2;
            node.vx += (targetX - node.x) * alpha * 0.05;
            node.vy += (targetY - node.y) * alpha * 0.05;
          }
        });
      });
    });

     // Create initial node gradients
     createNodeGradients();

    const updatePositionGradients = () => {
      gradientContainer.selectAll("*").remove();

      if (selectedIssues.length === 0) return;

      data.nodes.forEach((node, nodeIndex) => {
        selectedIssues.forEach((issue, issueIndex) => {
          if (!node.positions || node.positions[issue] === undefined) return;

          const position = node.positions[issue];
          const absPosition = Math.abs(position);
          if (absPosition < 0.1) return;

          const colors = issueColors[issue];
          const color = position >= 0 ? colors.support : colors.oppose;
          const influenceRadius = Math.sqrt(node.influence) * 30;
          const baseOpacity = 0.2;

          const gradientId = `position-gradient-${nodeIndex}-${issueIndex}`;
          const gradient = defs.append("radialGradient")
            .attr("id", gradientId)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("cx", node.x)
            .attr("cy", node.y)
            .attr("r", influenceRadius)
            .attr("fx", node.x)
            .attr("fy", node.y);

          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", color)
            .attr("stop-opacity", absPosition * baseOpacity);

          gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", color)
            .attr("stop-opacity", absPosition * baseOpacity * 0.5);

          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", color)
            .attr("stop-opacity", 0);

          gradientContainer.append("circle")
            .attr("cx", node.x)
            .attr("cy", node.y)
            .attr("r", influenceRadius)
            .attr("fill", `url(#${gradientId})`);
        });
      });
    };


    // Draw links
    const links = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", d => d.type === "opposition" ? "#ff4444" : "#666")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.strength) * 2);

    // Draw nodes
    const nodes = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g");

    nodes.append("circle")
      .attr("r", d => Math.sqrt(d.influence) * 3)
      .attr("fill", d => {
        if (selectedIssues.length === 0) {
          return categoryColors[d.category.toLowerCase()] || "#666";
        }
        return `url(#node-${d.id})`;
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    // Add labels
    nodes.append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", d => Math.sqrt(d.influence) * 3 + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    // Add hover effects and click handling
    nodes
      .on("mouseover", (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .select("circle")
          .attr("stroke", "#000")
          .attr("stroke-width", 3);
      })
      .on("mouseout", (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .select("circle")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2);
      })
      .on("click", (event, d) => {
        onNodeSelect(d);
      })
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Update on simulation tick
    simulation.on("tick", () => {
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodes.attr("transform", d => `translate(${d.x},${d.y})`);
      
      updatePositionGradients();
    });

    return () => {
      simulation.stop();
    };

  }, [data, dimensions, selectedIssues, filters, zoomLevel]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg 
        ref={svgRef} 
        className="w-full h-full"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          cursor: 'grab',
          pointerEvents: 'all'
        }}
      />
      {hoveredNode && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded shadow max-w-md">
          <h3 className="text-lg font-semibold mb-2">{hoveredNode.name}</h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Influence:</span> {hoveredNode.influence}%
            </div>
            <div>
              <span className="font-medium">Category:</span> {hoveredNode.category}
            </div>
            {selectedIssues.length > 0 && (
              <div>
                <span className="font-medium">Positions:</span>
                <div className="ml-2">
                  {selectedIssues.map(issue => (
                    <div key={issue} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" 
                           style={{backgroundColor: hoveredNode.positions[issue] >= 0 ? 
                                 issueColors[issue].support : issueColors[issue].oppose}}></div>
                      {issue}: {(hoveredNode.positions[issue] * 100).toFixed(1)}%
                      {hoveredNode.positions[issue] >= 0 ? " (Support)" : " (Oppose)"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default NetworkVisualization;