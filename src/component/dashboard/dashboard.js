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

const mockTopNews = [
  {
    id: 1,
    headline: "Major Tech Merger Under Investigation",
    source: "Reuters",
    time: "1h ago",
  },
  {
    id: 2,
    headline: "New Data Privacy Regulations Announced",
    source: "BBC",
    time: "3h ago",
  },
  {
    id: 3,
    headline: "AI Innovations Set to Disrupt Market",
    source: "TechCrunch",
    time: "5h ago",
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
    <>
      <div className="tracker-header">
        <div>
          <h1>Welcome back</h1>
          <p>Here's what you missed...</p>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Recent Activity */}
          <div className="dashboard-card recent-activity">
            <h2>New Updates</h2>
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

          {/* Top News */}
          <div className="dashboard-card top-news">
            <h2>Top News Stories</h2>
            <div>
              {mockTopNews.map((news) => (
                <div key={news.id} className="news-item">
                  <h3>{news.headline}</h3>
                  <p className="news-source">
                    {news.source} - {news.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Network Overview */}
          <div className="dashboard-card network-overview">
            <h2>Your Network Today</h2>
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
        </div>
      </div>
    </>
  );
}
