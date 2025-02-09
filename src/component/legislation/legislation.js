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

import LegislativeTimeline from "./legislative-timeline";

const legislativeStages = [
  {
    id: "draft",
    name: "Draft",
    duration: "30d",
    activities: ["Initial Draft", "Stakeholder Review", "Final Draft"],
  },
  {
    id: "committee",
    name: "Committee",
    duration: "60d",
    activities: ["First Reading", "Public Hearing", "Committee Vote"],
  },
  {
    id: "amendments",
    name: "Amendments",
    duration: "45d",
    activities: ["Amendment Period", "Review", "Final Amendments"],
  },
  {
    id: "vote",
    name: "Final Vote",
    duration: "15d",
    activities: ["Floor Debate", "Final Vote"],
  },
  {
    id: "implementation",
    name: "Implementation",
    duration: "90d",
    activities: ["Signed", "Published", "Effective"],
  },
];

const legislationTimeline = {
  id: "DMCA-2025-01",
  title: "Digital Markets Competition Act",
  currentStage: "committee",
  stages: [
    {
      stage: "draft",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      completed: true,
      milestones: [
        {
          date: "2025-01-15",
          event: "Initial Draft Released",
          completed: true,
        },
        {
          date: "2025-02-01",
          event: "Stakeholder Comments Due",
          completed: true,
        },
      ],
    },
    {
      stage: "committee",
      startDate: "2025-02-16",
      endDate: "2025-04-15",
      completed: false,
      current: true,
      milestones: [
        {
          date: "2025-02-20",
          event: "Committee Hearing",
          completed: false,
        },
      ],
    },
    // ... other stages
  ],
};

const mockLegislation = [
  {
    id: 1,
    title: "AI Act Implementation",
    reference: "EU-AI-2025-01",
    summary:
      "Comprehensive framework for regulating artificial intelligence systems with risk-based approach and specific requirements for high-risk AI applications",
    status: "In Committee",
    stage: "Final Negotiations",
    type: "Regulation",
    jurisdiction: "European Union",
    priority: "High",
    impact: "High",
    lastUpdated: "2025-02-09",
    stakeholders: [
      "Tech Industry Association",
      "AI Ethics Board",
      "Digital Rights Foundation",
      "Research Institutions",
    ],
    tags: ["AI", "Digital Markets", "Tech Regulation", "Data Protection"],
    position: "Support with Amendments",
    engagementLevel: "Active",
    nextSteps: "Implementation Planning",
    nextStepDate: "2025-03-20",
    stages: [
      {
        stage: "draft",
        startDate: "2024-12-08",
        endDate: "2025-01-15",
        completed: true,
        milestones: [
          {
            date: "2024-12-08",
            event: "Provisional Agreement",
            completed: true,
          },
        ],
      },
      {
        stage: "committee",
        startDate: "2025-01-16",
        endDate: "2025-03-15",
        completed: false,
        current: true,
        milestones: [
          {
            date: "2025-03-15",
            event: "Formal Adoption",
            completed: false,
          },
        ],
      },
      {
        stage: "implementation",
        startDate: "2025-03-16",
        endDate: "2025-12-31",
        completed: false,
        milestones: [
          {
            date: "2025-12-31",
            event: "Implementation Deadline",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Data Act Amendments",
    reference: "EU-DA-2025-02",
    summary:
      "Amendments to enhance data sharing, access, and portability across sectors while ensuring data protection and fair competition",
    status: "Public Consultation",
    stage: "Draft Amendments",
    type: "Regulation Amendment",
    jurisdiction: "European Union",
    priority: "High",
    impact: "High",
    lastUpdated: "2025-02-01",
    stakeholders: [
      "Cloud Service Providers",
      "Data Protection Authorities",
      "Industry Representatives",
    ],
    tags: ["Data Sharing", "Cloud Computing", "Digital Markets"],
    position: "Support",
    engagementLevel: "High",
    nextSteps: "Submit Consultation Response",
    nextStepDate: "2025-04-10",
    stages: [
      {
        stage: "consultation",
        startDate: "2025-02-01",
        endDate: "2025-04-15",
        completed: false,
        current: true,
        milestones: [
          {
            date: "2025-04-15",
            event: "Consultation Deadline",
            completed: false,
          },
        ],
      },
      {
        stage: "draft",
        startDate: "2025-04-16",
        endDate: "2025-06-01",
        completed: false,
        milestones: [
          {
            date: "2025-06-01",
            event: "Draft Amendments",
            completed: false,
          },
        ],
      },
      {
        stage: "finalVote",
        startDate: "2025-06-02",
        endDate: "2025-09-30",
        completed: false,
        milestones: [
          {
            date: "2025-09-30",
            event: "Final Vote",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Platform Workers Directive",
    reference: "EU-PWD-2025-03",
    summary:
      "Framework for protecting digital platform workers' rights and ensuring fair working conditions in the gig economy",
    status: "First Reading",
    stage: "Committee Review",
    type: "Directive",
    jurisdiction: "European Union",
    priority: "Medium",
    impact: "High",
    lastUpdated: "2025-01-20",
    stakeholders: [
      "Platform Companies",
      "Labor Unions",
      "Workers' Rights Groups",
    ],
    tags: ["Digital Labor", "Platform Economy", "Workers' Rights"],
    position: "Monitor",
    engagementLevel: "Medium",
    nextSteps: "Committee Hearing",
    nextStepDate: "2025-03-15",
    stages: [
      {
        stage: "committee",
        startDate: "2025-01-20",
        endDate: "2025-05-15",
        completed: false,
        current: true,
        milestones: [
          {
            date: "2025-05-15",
            event: "Committee Vote",
            completed: false,
          },
        ],
      },
      {
        stage: "parliament",
        startDate: "2025-05-16",
        endDate: "2025-07-30",
        completed: false,
        milestones: [
          {
            date: "2025-07-30",
            event: "Parliament Vote",
            completed: false,
          },
        ],
      },
      {
        stage: "implementation",
        startDate: "2025-08-01",
        endDate: "2026-01-01",
        completed: false,
        milestones: [
          {
            date: "2026-01-01",
            event: "Member State Implementation",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Cybersecurity Resilience Act",
    reference: "EU-CRA-2025-04",
    summary:
      "Enhanced cybersecurity requirements for connected devices and critical digital infrastructure",
    status: "Draft",
    stage: "Initial Review",
    type: "Regulation",
    jurisdiction: "European Union",
    priority: "High",
    impact: "High",
    lastUpdated: "2025-01-15",
    stakeholders: [
      "Cybersecurity Companies",
      "Device Manufacturers",
      "Critical Infrastructure Operators",
    ],
    tags: ["Cybersecurity", "IoT", "Digital Infrastructure"],
    position: "Support with Amendments",
    engagementLevel: "High",
    nextSteps: "Stakeholder Consultation",
    nextStepDate: "2025-03-15",
    stages: [
      {
        stage: "consultation",
        startDate: "2025-01-15",
        endDate: "2025-03-30",
        completed: false,
        current: true,
        milestones: [
          {
            date: "2025-03-30",
            event: "Stakeholder Consultation",
            completed: false,
          },
        ],
      },
      {
        stage: "draft",
        startDate: "2025-04-01",
        endDate: "2025-06-15",
        completed: false,
        milestones: [
          {
            date: "2025-06-15",
            event: "Draft Proposal",
            completed: false,
          },
        ],
      },
      {
        stage: "parliament",
        startDate: "2025-06-16",
        endDate: "2025-09-15",
        completed: false,
        milestones: [
          {
            date: "2025-09-15",
            event: "Parliamentary Debate",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Digital Services Act Implementation Guidelines",
    reference: "EU-DSA-2025-05",
    summary:
      "Detailed implementation guidelines for DSA compliance including content moderation and transparency requirements",
    status: "Public Consultation",
    stage: "Draft Guidelines",
    type: "Implementation Guidelines",
    jurisdiction: "European Union",
    priority: "High",
    impact: "Medium",
    lastUpdated: "2025-01-10",
    stakeholders: [
      "Online Platforms",
      "Content Moderators",
      "Digital Rights Groups",
    ],
    tags: ["Content Moderation", "Platform Regulation", "Digital Services"],
    position: "Active Engagement",
    engagementLevel: "High",
    nextSteps: "Submit Feedback",
    nextStepDate: "2025-02-25",
    stages: [
      {
        stage: "consultation",
        startDate: "2025-01-10",
        endDate: "2025-02-28",
        completed: false,
        current: true,
        milestones: [
          {
            date: "2025-02-28",
            event: "Consultation Period End",
            completed: false,
          },
        ],
      },
      {
        stage: "guidelines",
        startDate: "2025-03-01",
        endDate: "2025-05-15",
        completed: false,
        milestones: [
          {
            date: "2025-05-15",
            event: "Final Guidelines",
            completed: false,
          },
        ],
      },
      {
        stage: "enforcement",
        startDate: "2025-05-16",
        endDate: "2025-07-01",
        completed: false,
        milestones: [
          {
            date: "2025-07-01",
            event: "Enforcement Start",
            completed: false,
          },
        ],
      },
    ],
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

          {view === "grid" && (
            <table className="legislation-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Impact</th>
                  <th>Next Steps</th>
                </tr>
              </thead>
              <tbody>
                {mockLegislation.map((item) => (
                  <tr key={item.id} onClick={() => setSelectedItem(item)}>
                    <td>{item.title}</td>
                    <td>{item.reference}</td>
                    <td>{item.status}</td>
                    <td>{item.priority}</td>
                    <td>{item.impact}</td>
                    <td>
                      {item.nextSteps} ({item.nextStepDate})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {view === "timeline" && (
            <div className="timeline-view">
              <LegislativeTimeline legislationList={mockLegislation} />
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
                      <LegislativeTimeline legislation={mockLegislation[0]} />

                      {selectedItem.keyDates &&
                        Object.entries(selectedItem.keyDates).map(
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
