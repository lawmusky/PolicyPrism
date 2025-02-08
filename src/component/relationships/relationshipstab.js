// components/Relationships/RelationshipsTab.js
import {
  Plus,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";

const mockRelationships = [
  {
    id: 1,
    name: "Global Tech Alliance",
    type: "Alliance",
    strength: "Strong",
    influence: 85,
    alignment: "High",
    lastInteraction: "2025-02-01",
    shared: ["Data Privacy", "AI Governance"],
  },
  {
    id: 2,
    name: "Digital Rights Foundation",
    type: "Stakeholder",
    strength: "Moderate",
    influence: 65,
    alignment: "Moderate",
    lastInteraction: "2025-01-28",
    shared: ["User Privacy", "Content Moderation"],
  },
  {
    id: 3,
    name: "Policy Research Institute",
    type: "Research",
    strength: "Strong",
    influence: 75,
    alignment: "High",
    lastInteraction: "2025-01-25",
    shared: ["Tech Innovation", "Digital Markets"],
  },
];

export default function RelationshipsTab() {
  return (
    <div className="relationships-tab">
      <div className="tab-header">
        <h2>Key Relationships</h2>
        <button className="add-button">
          <Plus size={16} />
          Add Relationship
        </button>
      </div>

      <div className="relationships-grid">
        {mockRelationships.map((relationship) => (
          <div key={relationship.id} className="relationship-card">
            <div className="relationship-header">
              <div className="relationship-title">
                <h3>{relationship.name}</h3>
                <span
                  className={`relationship-type ${relationship.type.toLowerCase()}`}
                >
                  {relationship.type}
                </span>
              </div>
              <div className="relationship-metrics">
                <div className="metric">
                  <span className="metric-label">Strength</span>
                  <span
                    className={`metric-value ${relationship.strength.toLowerCase()}`}
                  >
                    {relationship.strength}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Influence</span>
                  <span className="metric-value">
                    {relationship.influence}%
                  </span>
                </div>
              </div>
            </div>

            <div className="relationship-content">
              <div className="alignment-indicator">
                <span>Alignment</span>
                <div className="alignment-arrow">
                  {relationship.alignment === "High" ? (
                    <ArrowUpRight size={16} />
                  ) : relationship.alignment === "Low" ? (
                    <ArrowDownRight size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  {relationship.alignment}
                </div>
              </div>

              <div className="shared-interests">
                <span>Shared Interests:</span>
                <div className="interest-tags">
                  {relationship.shared.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relationship-footer">
                <Users size={14} />
                <span>Last interaction: {relationship.lastInteraction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
