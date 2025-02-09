import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  AlertCircle,
  Calendar,
  FileText,
  ArrowRight,
  Activity,
  Flag,
  Building2,
  Landmark,
  Tags,
  List,
  Table,
  ChartGantt,
} from "lucide-react";

const mockLegislation = [
  {
    id: 1,
    title: "Digital Markets Competition Act",
    reference: "DMCA-2025-01",
    summary:
      "Comprehensive framework for regulating digital marketplaces and ensuring fair competition",
    status: "In Committee",
    stage: "First Reading",
    type: "Primary Legislation",
    jurisdiction: "Federal",
    priority: "High",
    impact: "High",
    lastUpdated: "2025-02-09",
    keyDates: {
      introduced: "2025-01-15",
      committeeVote: "2025-03-01",
      finalVote: "2025-06-30",
    },
    stakeholders: [
      "Tech Industry Association",
      "Consumer Rights Group",
      "Digital Rights Foundation",
    ],
    tags: ["Digital Markets", "Competition", "Tech Regulation"],
    position: "Support with Amendments",
    engagementLevel: "Active",
    nextSteps: "Committee Hearing",
    nextStepDate: "2025-02-20",
  },
  {
    id: 2,
    title: "AI Safety Standards Regulation",
    reference: "AISR-2025-02",
    summary:
      "Regulatory framework establishing safety and testing standards for AI systems",
    status: "Public Consultation",
    stage: "Draft",
    type: "Regulation",
    jurisdiction: "Federal",
    priority: "High",
    impact: "High",
    lastUpdated: "2025-02-08",
    keyDates: {
      consultation: "2025-02-15",
      implementation: "2025-09-01",
    },
    stakeholders: [
      "AI Research Institute",
      "Tech Industry Association",
      "Ethics Board",
    ],
    tags: ["AI", "Safety Standards", "Regulation"],
    position: "Support",
    engagementLevel: "High",
    nextSteps: "Submit Consultation Response",
    nextStepDate: "2025-02-28",
  },
];

export default function LegislationTracker() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState("list");

  return (
    <>
      <div className="tracker-header">
        <div>
          <h1>Legislation Tracker</h1>
          <div className="search-filter-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search legislation..."
                className="search-input"
              />
              <Search className="search-icon" />
            </div>
            <div className="view-controls">
              <button
                className={`view-btn ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                className={`view-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                className={`view-btn ${view === "timeline" ? "active" : ""}`}
                onClick={() => setView("timeline")}
              >
                <ChartGantt className="w-4 h-4" />
              </button>
            </div>
            <button className="filter-button">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Track New Legislation
          </button>
        </div>
      </div>
      <div className="legislation-tracker">
        <div className="tracker-content">
          {view === "list" && (
            <div className="legislation-list">
              {mockLegislation.map((item) => (
                <div
                  key={item.id}
                  className="legislation-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="item-header">
                    <div className="item-title">
                      <h3>{item.title}</h3>
                      <span className="reference">{item.reference}</span>
                    </div>
                    <div className="item-meta">
                      <span
                        className={`status-badge ${item.status
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        {item.status}
                      </span>
                      <span
                        className={`priority-badge ${item.priority.toLowerCase()}`}
                      >
                        {item.priority} Priority
                      </span>
                      <span
                        className={`impact-badge ${item.impact.toLowerCase()}`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                  </div>

                  <p className="item-summary">{item.summary}</p>

                  <div className="item-footer">
                    <div className="item-details">
                      <span className="stage">
                        <Activity className="w-4 h-4 mr-1" />
                        {item.stage}
                      </span>
                      <span className="jurisdiction">
                        <Landmark className="w-4 h-4 mr-1" />
                        {item.jurisdiction}
                      </span>
                      <span className="next-step">
                        <Flag className="w-4 h-4 mr-1" />
                        {item.nextSteps} ({item.nextStepDate})
                      </span>
                    </div>
                    <div className="tags">
                      <Tags className="w-4 h-4 mr-1" />
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedItem && (
          <div
            className="sidebar-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="sidebar-slide-in open"
              onClick={(e) => e.stopPropagation()}
              style={{ width: "60%" }}
            >
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h2>{selectedItem.title}</h2>
                  <button
                    className="close-button"
                    onClick={() => setSelectedItem(null)}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="sidebar-navigation">
                  <button className="nav-tab active">Overview</button>
                  <button className="nav-tab">Key Info</button>
                  <button className="nav-tab">Dates</button>
                  <button className="nav-tab">Stakeholders</button>
                  <button className="nav-tab">Position</button>
                </div>

                <div className="sidebar-tabs">
                  <div className="details-section">
                    <h3>Overview</h3>
                    <p>{selectedItem.summary}</p>
                  </div>

                  <div className="details-section">
                    <h3>Key Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Status</label>
                        <span>{selectedItem.status}</span>
                      </div>
                      <div className="info-item">
                        <label>Stage</label>
                        <span>{selectedItem.stage}</span>
                      </div>
                      <div className="info-item">
                        <label>Type</label>
                        <span>{selectedItem.type}</span>
                      </div>
                      <div className="info-item">
                        <label>Jurisdiction</label>
                        <span>{selectedItem.jurisdiction}</span>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h3>Key Dates</h3>
                    <div className="dates-timeline">
                      {Object.entries(selectedItem.keyDates).map(
                        ([key, date]) => (
                          <div key={key} className="timeline-item">
                            <div className="date">{date}</div>
                            <div className="event">{key}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="details-section">
                    <h3>Stakeholders</h3>
                    <div className="stakeholders-list">
                      {selectedItem.stakeholders.map((stakeholder) => (
                        <div key={stakeholder} className="stakeholder-item">
                          <Building2 className="w-4 h-4 mr-2" />
                          {stakeholder}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="details-section">
                    <h3>Our Position</h3>
                    <div className="position-details">
                      <div className="position-status">
                        <span className="label">Current Position:</span>
                        <span className="value">{selectedItem.position}</span>
                      </div>
                      <div className="engagement-level">
                        <span className="label">Engagement Level:</span>
                        <span className="value">
                          {selectedItem.engagementLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
