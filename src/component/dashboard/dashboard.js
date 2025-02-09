import { Users, Network, TrendingUp } from "lucide-react";

const mockInfluenceCenters = [
  { id: 1, name: "Tech Industry Coalition", influence: 85, trend: "up" },
  { id: 2, name: "Consumer Rights Group", influence: 72, trend: "down" },
  { id: 3, name: "Policy Think Tank", influence: 68, trend: "stable" },
];

const mockRecentActivity = [
  { id: 1, event: "New coalition formed", time: "2h ago", type: "coalition" },
  { id: 2, event: "Position shift detected", time: "4h ago", type: "shift" },
  {
    id: 3,
    event: "Emerging pattern identified",
    time: "5h ago",
    type: "pattern",
  },
];

export default function Dashboard() {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  const getActivityEmoji = (type) => {
    switch (type) {
      case "coalition":
        return "👥";
      case "shift":
        return "↔️";
      default:
        return "📈";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Network Overview */}
        <div className="dashboard-card network-overview">
          <h2>Network Overview</h2>
          <div className="network-visualization">
            [Network Visualization Placeholder]
          </div>
        </div>

        {/* Influence Centers */}
        <div className="dashboard-card influence-centers">
          <h2>Influence Changes</h2>
          <div>
            {mockInfluenceCenters.map((center) => (
              <div key={center.id} className="influence-center-item">
                <div className="influence-info">
                  <h3>{center.name}</h3>
                  <span className="influence-score">
                    Influence: {center.influence}%
                  </span>
                </div>
                <span className={`trend-indicator trend-${center.trend}`}>
                  {getTrendIcon(center.trend)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card recent-activity">
          <h2>Recent Activity</h2>
          <div>
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {getActivityEmoji(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-event">{activity.event}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div>
            <button className="action-button">
              <Users className="icon" />
              Add Stakeholder
            </button>
            <button className="action-button">
              <Network className="icon" />
              Map Relationship
            </button>
            <button className="action-button">
              <TrendingUp className="icon" />
              Run Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
