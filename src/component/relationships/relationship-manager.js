import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash,
  ChevronDown,
  Link,
  Calendar,
  AlertCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import RelationshipsTab from "./relationshipstab";
import OverviewTabStyled from "../overview/overviewtab";
import PositionsTab from "../positions/PositionsTab";
import ActivityTab from "../activity/activitytab";
import AnalysisTab from "../analysis/analysistab";

const mockRelationships = [
  {
    id: 1,
    stakeholder: "Tech Industry Association",
    type: "Alliance",
    strength: "Strong",
    lastInteraction: "2025-02-01",
    initiatives: ["Data Privacy", "AI Governance"],
    status: "Active",
    influence: 85,
  },
  {
    id: 2,
    stakeholder: "Digital Rights Foundation",
    type: "Engagement",
    strength: "Moderate",
    lastInteraction: "2025-01-28",
    initiatives: ["User Privacy", "Content Moderation"],
    status: "Active",
    influence: 65,
  },
  {
    id: 3,
    stakeholder: "Policy Research Institute",
    type: "Research",
    strength: "Strong",
    lastInteraction: "2025-01-25",
    initiatives: ["Tech Innovation", "Digital Markets"],
    status: "Active",
    influence: 75,
  },
];

export default function RelationshipManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleStakeholderClick = (relationship) => {
    setSelectedRelationship(relationship);
    setActiveTab("overview");
  };

  return (
    <div className="relationship-manager">
      <div className="relationship-content">
        <div className="relationship-header">
          <div>
            <h1>Relationship Management</h1>
            <div className="search-filter-bar">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search relationships..."
                  className="search-input"
                />
                <Search className="search-icon" />
              </div>
              <button className="filter-button">
                <Filter />
                Filters
              </button>
            </div>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowAddForm(true)}
              className="add-relationship-btn"
            >
              <Plus />
              Add Relationship
            </button>
          </div>
        </div>

        <div className="relationship-list">
          <div className="relationship-table">
            <div className="table-header">
              <div>Stakeholder</div>
              <div>Type</div>
              <div>Strength</div>
              <div>Last Interaction</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            <div className="table-body">
              {mockRelationships.map((relationship) => (
                <div
                  key={relationship.id}
                  className="stakeholder-row"
                  onClick={() => handleStakeholderClick(relationship)}
                >
                  <div className="stakeholder-cell">
                    <div className="stakeholder-name">
                      {relationship.stakeholder}
                      <div className="stakeholder-influence">
                        Influence: {relationship.influence}%
                      </div>
                    </div>
                  </div>

                  <div className="type-cell">
                    <span className="type-badge">{relationship.type}</span>
                  </div>

                  <div className="strength-cell">
                    <div className="strength-indicator">
                      <div
                        className={`strength-dot ${relationship.strength.toLowerCase()}`}
                      />
                      {relationship.strength}
                    </div>
                  </div>

                  <div className="last-interaction">
                    <Calendar className="w-4 h-4 mr-2" />
                    {relationship.lastInteraction}
                  </div>

                  <div className="status-cell">
                    <span
                      className={`status-badge ${relationship.status.toLowerCase()}`}
                    >
                      {relationship.status}
                    </span>
                  </div>

                  <div className="actions-cell">
                    <button className="action-button">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="action-button">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedRelationship && (
        <div
          className="sidebar-overlay"
          onClick={() => setSelectedRelationship(null)}
        >
          <div
            className={`sidebar-slide-in ${selectedRelationship ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the overlay
          >
            <div className="sidebar-content">
              <div className="sidebar-header">
                <h2>{selectedRelationship.stakeholder}</h2>
                <button
                  onClick={() => setSelectedRelationship(null)}
                  className="close-button"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="sidebar-navigation">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "relationships", label: "Relationships" },
                  { id: "positions", label: "Positions" },
                  { id: "activities", label: "Activities" },
                  { id: "analysis", label: "Analysis" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-tab ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="sidebar-tabs">
                {activeTab === "overview" && <OverviewTabStyled />}
                {activeTab === "relationships" && <RelationshipsTab />}
                {activeTab === "positions" && <PositionsTab />}
                {activeTab === "activities" && <ActivityTab />}
                {activeTab === "analysis" && <AnalysisTab />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
