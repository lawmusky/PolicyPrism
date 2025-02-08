// components/Positions/PositionsTab.js
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

const mockPositions = [
  {
    id: 1,
    issue: "Data Privacy",
    position: "Supportive",
    confidence: 85,
    trend: "up",
    lastUpdated: "2025-02-01",
  },
  {
    id: 2,
    issue: "AI Regulation",
    position: "Neutral",
    confidence: 75,
    trend: "stable",
    lastUpdated: "2025-01-28",
  },
  {
    id: 3,
    issue: "Platform Liability",
    position: "Opposed",
    confidence: 90,
    trend: "down",
    lastUpdated: "2025-01-25",
  },
];

export default function PositionsTab() {
  return (
    <div className="positions-tab">
      <div className="tab-header">
        <h2>Policy Positions</h2>
        <button className="add-button">
          <Plus size={16} />
          Add Position
        </button>
      </div>

      <div className="positions-grid">
        {mockPositions.map((position) => (
          <div key={position.id} className="position-card">
            <div className="position-header">
              <h3>{position.issue}</h3>
              <span
                className={`position-status ${position.position.toLowerCase()}`}
              >
                {position.position}
              </span>
            </div>

            <div className="position-content">
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${position.confidence}%` }}
                />
              </div>
              <div className="position-meta">
                <span>Confidence: {position.confidence}%</span>
                <span className="trend">
                  {position.trend === "up" ? (
                    <TrendingUp size={16} />
                  ) : position.trend === "down" ? (
                    <TrendingDown size={16} />
                  ) : (
                    "→"
                  )}
                </span>
              </div>
              <div className="position-date">
                Last updated: {position.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
