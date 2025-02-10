import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {
  Filter,
  Download,
  ZoomIn,
  ZoomOut,
  Map,
  Layers,
  Search,
  Plus,
} from "lucide-react";

import NetworkVisualization from "./graphvisualisation";
import sampleNetworkData from "./sampleNetworkData"; // Make sure this path matches your actual file structure

const mockActiveIssues = [
  "Data Privacy",
  "AI Regulation",
  "Platform Liability",
  "Digital Competition",
  "Content Moderation",
];

const mockFilters = [
  {
    id: "type",
    label: "Type",
    options: [
      "All",
      "Industry",
      "Advocacy",
      "Research",
      "Government",
      "Standards",
      "Professional",
      "Media",
      "International",
      "Academic",
    ],
  },
  {
    id: "influence",
    label: "Influence",
    options: ["All", "High", "Medium", "Low"],
  },
  {
    id: "relationship",
    label: "Relationship",
    options: ["All", "Strong", "Moderate", "Weak"],
  },
];

export default function NetworkView() {
  const [selectedFilters, setSelectedFilters] = useState({
    type: "All",
    influence: "All",
    relationship: "All",
  });
  const visualizationRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [networkData, setNetworkData] = useState(sampleNetworkData);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [transformState, setTransformState] = useState({
    x: 0,
    y: 0,
    k: 0.8 // Zoom scale
  });

  const currentTransform = useRef(transformState);

  const handleTransformChange = (newTransform) => {
    setZoomLevel(Math.round(newTransform.k * 100));  // Update zoom level display
    setTransformState(newTransform);  // Update transform state
    currentTransform.current = newTransform;  // Sync with ref
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const calculateMetrics = (node) => {
    if (!node) return [
      { label: "Influence Score", value: "-" },
      { label: "Relationships", value: "-" },
      { label: "Activity Level", value: "-" },
      { label: "Position Change", value: "-" },
    ];

    return [
      { label: "Influence Score", value: `${node.influence}%` },
      { label: "Relationships", value: node.relationships?.length || "0" },
      { label: "Activity Level", value: node.influence > 75 ? "High" : node.influence > 50 ? "Medium" : "Low" },
      { label: "Position Change", value: node.positionChange || "+0%" },
    ];
  };

  const toggleIssue = (issue) => {
    setSelectedIssues(prev => prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]);
  };

  const handleZoom = (direction) => {
    const zoomStep = 0.1;
    const newZoom = direction === 'in'
      ? Math.min(4, currentTransform.current.k + zoomStep)
      : Math.max(0.5, currentTransform.current.k - zoomStep);

    visualizationRef.current?.smoothZoomTo(newZoom);
  };

  const handleResetFilters = () => {
    setSelectedFilters({ type: "All", influence: "All", relationship: "All" });
    setSelectedIssues([]);
    setSearchQuery("");
    setSelectedNode(null);
  };

  const handleExport = () => {
    const svgElement = document.querySelector(".policy-network-container svg");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "network-visualization.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="tracker-header">
        <div>
          <h1>Issues Map</h1>
          <div className="search-filter-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search stakeholders or issues..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" />
            </div>

            <button className="filter-button" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
              <Filter className="w-4 h-4 mr-2" /> Filters
            </button>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" /> Track New Issue
          </button>
        </div>
      </div>

      <div className={`network-view ${!isSidebarVisible ? "sidebar-hidden" : ""}`}>
        <div className="network-sidebar">
          <div className="network-sidebar-header">
            <h2>Issues Analysis</h2>
            <p>Visualize and analyze emerging issues, based on stakeholder activities</p>
          </div>

          <div className="active-issues-section">
            <h3>Active Issues</h3>
            <div className="active-issues-buttons">
              {mockActiveIssues.map((issue) => (
                <button key={issue} className={`issue-button ${selectedIssues.includes(issue) ? "selected" : ""}`} onClick={() => toggleIssue(issue)}>
                  {issue}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <h3>Filters</h3>
              <button className="reset-button" onClick={handleResetFilters}>Reset</button>
            </div>

            <div className="space-y-4">
              {mockFilters.map((filter) => (
                <div key={filter.id} className="filter-group">
                  <label className="filter-label">{filter.label}</label>
                  <select className="filter-select" value={selectedFilters[filter.id]} onChange={(e) => setSelectedFilters({ ...selectedFilters, [filter.id]: e.target.value })}>
                    {filter.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="network-visualization">
          <div className="network-toolbar">
            <div className="toolbar-group">
              <button className={`toolbar-button ${!isSidebarVisible ? "active" : ""}`} onClick={() => setIsSidebarVisible(!isSidebarVisible)} aria-label="Toggle sidebar">
                <Filter className="w-5 h-5" />
              </button>
              <button className="toolbar-button">
                <Map className="w-5 h-5" />
              </button>
              <button className="toolbar-button">
                <Layers className="w-5 h-5" />
              </button>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-button" onClick={() => handleZoom('out')} aria-label="Zoom out">
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="zoom-level">{zoomLevel}%</span>
              <button className="toolbar-button" onClick={() => handleZoom('in')} aria-label="Zoom in">
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="toolbar-divider" />
              <button className="toolbar-button" onClick={handleExport} aria-label="Download visualization">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="network-graph">
            <NetworkVisualization
              ref={visualizationRef}
              data={networkData}
              selectedIssues={selectedIssues}
              filters={selectedFilters}
              zoomLevel={zoomLevel}
              transform={transformState}
              onTransformChange={handleTransformChange}
              onNodeSelect={handleNodeSelect}
              searchQuery={searchQuery}
            />
          </div>

          <div className="details-panel">
            <div className="details-header">
              <h3>{selectedNode ? selectedNode.name : "Selected Group Details"}</h3>
              {selectedNode && <button className="view-analysis">View Full Analysis</button>}
            </div>
            <div className="metrics-grid">
              {calculateMetrics(selectedNode).map((metric, index) => (
                <div key={index} className="metric-item">
                  <p className="metric-label">{metric.label}</p>
                  <p className="metric-value">{metric.value}</p>
                </div>
              ))}
            </div>
            {selectedNode && selectedIssues.length > 0 && (
              <div className="positions-section">
                <h4>Issue Positions</h4>
                <div className="positions-grid">
                  {selectedIssues.map((issue) => (
                    <div key={issue} className="position-item">
                      <p className="position-label">{issue}</p>
                      <p className="position-value">
                        {selectedNode.positions[issue] ? `${(selectedNode.positions[issue] * 100).toFixed(1)}%` : "No position"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
