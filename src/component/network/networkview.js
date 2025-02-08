import { useState } from "react";
import { Filter, Download, ZoomIn, ZoomOut, Map, Layers } from "lucide-react";

const mockStakeholders = [
  { id: 1, name: "Tech Industry Association", type: "industry", influence: 85 },
  { id: 2, name: "Consumer Rights Group", type: "advocacy", influence: 65 },
  { id: 3, name: "Policy Research Institute", type: "research", influence: 75 },
];

const mockFilters = [
  {
    id: "type",
    label: "Type",
    options: ["All", "Industry", "Advocacy", "Research", "Government"],
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

const mockMetrics = [
  { label: "Influence Score", value: "85%" },
  { label: "Relationships", value: "24" },
  { label: "Activity Level", value: "High" },
  { label: "Position Change", value: "+2.3%" },
];

export default function NetworkView() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`network-view ${!isSidebarVisible ? "sidebar-hidden" : ""}`}
    >
      {/* Network Analysis Sidebar */}
      <div className="network-sidebar">
        <div className="network-sidebar-header">
          <h2>Network Analysis</h2>
          <p>Visualize and analyze stakeholder relationships</p>
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="reset-button">Reset</button>
          </div>

          <div className="space-y-4">
            {mockFilters.map((filter) => (
              <div key={filter.id} className="filter-group">
                <label className="filter-label">{filter.label}</label>
                <select
                  className="filter-select"
                  value={selectedFilters[filter.id] || "All"}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [filter.id]: e.target.value,
                    })
                  }
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Visualization Area */}
      <div className="network-visualization">
        {/* Toolbar */}
        <div className="network-toolbar">
          <div className="toolbar-group">
            <button
              className={`toolbar-button ${!isSidebarVisible ? "active" : ""}`}
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
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
            <button
              className="toolbar-button"
              onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="zoom-level">{zoomLevel}%</span>
            <button
              className="toolbar-button"
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="toolbar-divider" />
            <button className="toolbar-button">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Network Graph */}
        <div className="network-graph">[Network Graph Visualization]</div>

        {/* Details Panel */}
        <div className="details-panel">
          <div className="details-header">
            <h3>Selected Group Details</h3>
            <button className="view-analysis">View Full Analysis</button>
          </div>
          <div className="metrics-grid">
            {mockMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <p className="metric-label">{metric.label}</p>
                <p className="metric-value">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
