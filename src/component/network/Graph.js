// components/Graph.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Graph({ data, nodeColor, onNodeClick }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f9fafb");

    const simulation = d3
      .forceSimulation(data)
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    svg
      .selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-width", 2);

    const nodes = svg
      .selectAll(".node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .attr("fill", (d) => nodeColor(d.role))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => onNodeClick(d));

    const labels = svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", -15)
      .text((d) => d.name)
      .style("font-size", "0.75rem")
      .style("fill", "#374151");

    simulation.on("tick", () => {
      nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);

      svg
        .selectAll(".link")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => simulation.stop();
  }, [data, nodeColor, onNodeClick]);

  return <svg ref={svgRef}></svg>;
}
