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

const relationshipTypes = [
  "Alliance",
  "Engagement",
  "Research",
  "Opposition",
  "Neutral",
];
const strengthLevels = ["Strong", "Moderate", "Weak"];
const statuses = ["Active", "Inactive", "Pending"];

export default function RelationshipManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  return (
    <div className="relationship-manager">
      <div className="relationship-content">
        {/* Header */}
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

        {/* Rest of the content remains the same */}
        <div className="relationship-list">
          <div className="relationship-table">
            {/* Table Header */}
            <div className="table-header">
              <div>Stakeholder</div>
              <div>Type</div>
              <div>Strength</div>
              <div>Last Interaction</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {/* Table Body */}
            <div>
              {mockRelationships.map((relationship) => (
                <div
                  key={relationship.id}
                  className="table-row"
                  onClick={() => setSelectedRelationship(relationship)}
                >
                  <div className="stakeholder-cell">
                    <div className="stakeholder-name">
                      {relationship.stakeholder}
                    </div>
                    <div className="stakeholder-influence">
                      Influence: {relationship.influence}%
                    </div>
                  </div>
                  <div className="type-badge">{relationship.type}</div>
                  <div className="strength-indicator">
                    <div
                      className={`strength-dot ${relationship.strength.toLowerCase()}`}
                    />
                    {relationship.strength}
                  </div>
                  <div className="last-interaction">
                    <Calendar />
                    {relationship.lastInteraction}
                  </div>
                  <div>
                    <span
                      className={`status-badge ${relationship.status.toLowerCase()}`}
                    >
                      {relationship.status}
                    </span>
                  </div>
                  <div className="actions-cell">
                    <button className="action-button">
                      <Edit />
                    </button>
                    <button className="action-button">
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Sidebar */}
      {selectedRelationship && (
        <div className="details-sidebar">
          <div className="details-header">
            <div className="details-header-top">
              <h2 className="details-title">
                {selectedRelationship.stakeholder}
              </h2>
              <button
                onClick={() => setSelectedRelationship(null)}
                className="close-details"
              >
                <ArrowRight />
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <div className="details-field">
                  <div className="field-label">Relationship Type</div>
                  <div className="field-value">{selectedRelationship.type}</div>
                </div>
                <div className="details-field">
                  <div className="field-label">Strength</div>
                  <div className="field-value">
                    {selectedRelationship.strength}
                  </div>
                </div>
                <div className="details-field">
                  <div className="field-label">Status</div>
                  <div className="field-value">
                    {selectedRelationship.status}
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3 className="details-section-title">Shared Initiatives</h3>
                <div className="details-field">
                  {selectedRelationship.initiatives.map((initiative, index) => (
                    <div key={index} className="field-value">
                      <Link />
                      {initiative}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Relationship Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Relationship</h2>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Stakeholder</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search and select stakeholder..."
                />
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Relationship Type</label>
                  <select className="form-select">
                    {relationshipTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Strength</label>
                  <select className="form-select">
                    {strengthLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Status</label>
                <select className="form-select">
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Initiatives</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add shared initiatives..."
                />
              </div>
              <div className="form-field">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowAddForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button className="submit-button">Add Relationship</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
