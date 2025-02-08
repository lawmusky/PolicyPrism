// components/Overview/OverviewTabStyled.js
import {
  User,
  Mail,
  Phone,
  Network,
  TrendingUp,
  Activity,
  Users,
  Globe,
  MapPin,
} from "lucide-react";

const mockStakeholder = {
  contact: {
    primary: "Sarah Chen",
    title: "Director of Policy",
    email: "schen@techassoc.org",
    phone: "+1 (555) 123-4567",
    website: "www.techassoc.org",
    location: "Washington, DC",
  },
};

const mockActivity = [
  {
    id: 1,
    type: "Position Change",
    date: "2025-02-05",
    description: "Shifted stance on data privacy regulation",
    impact: "High",
  },
  {
    id: 2,
    type: "Meeting",
    date: "2025-02-03",
    description: "Quarterly policy roundtable",
    impact: "Medium",
  },
  {
    id: 3,
    type: "Publication",
    date: "2025-02-01",
    description: "Released white paper on AI governance",
    impact: "High",
  },
];

const mockRelationships = [
  { id: 1, name: "Global Tech Alliance", strength: "Strong", type: "Alliance" },
  {
    id: 2,
    name: "Digital Rights Foundation",
    strength: "Moderate",
    type: "Engagement",
  },
  {
    id: 3,
    name: "Policy Research Institute",
    strength: "Strong",
    type: "Collaboration",
  },
];

const mockPositions = [
  { id: 1, issue: "Data Privacy", position: "Supportive", confidence: 85 },
  { id: 2, issue: "AI Regulation", position: "Neutral", confidence: 75 },
  { id: 3, issue: "Platform Liability", position: "Opposed", confidence: 90 },
];

const mockMetrics = {
  influence: { current: 85, trend: +5, period: "This Quarter" },
  alignment: {
    score: 78,
    category: "High",
    topAligned: ["Global Tech Alliance", "Policy Research Institute"],
  },
  activity: { level: "Very High", percentile: 92, trend: "Increasing" },
  network: {
    centrality: "High",
    reach: 245,
    keyConnectors: ["Digital Rights Foundation", "Tech Policy Forum"],
  },
};

export default function OverviewTabStyled() {
  return (
    <div className="overview-tab">
      <div className="main-content">
        <div className="overview-grid">
          {/* Contact Information */}
          <div className="overview-card">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="contact-item">
                <User className="icon" size={16} />
                <div>
                  <div className="contact-name">
                    {mockStakeholder.contact.primary}
                  </div>
                  <div className="contact-title">
                    {mockStakeholder.contact.title}
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="icon" size={16} />
                <span>{mockStakeholder.contact.email}</span>
              </div>
              <div className="contact-item">
                <Phone className="icon" size={16} />
                <span>{mockStakeholder.contact.phone}</span>
              </div>
              <div className="contact-item">
                <Globe className="icon" size={16} />
                <span>{mockStakeholder.contact.website}</span>
              </div>
              <div className="contact-item">
                <MapPin className="icon" size={16} />
                <span>{mockStakeholder.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Key Relationships */}
          <div className="overview-card">
            <h2>Key Relationships</h2>
            <div className="relationship-list">
              {mockRelationships.map((relationship) => (
                <div key={relationship.id} className="relationship-item">
                  <Network className="icon" size={16} />
                  <div>
                    <div className="relationship-name">{relationship.name}</div>
                    <div className="relationship-meta">
                      {relationship.type} • {relationship.strength}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Positions */}
          <div className="overview-card">
            <h2>Policy Positions</h2>
            <div className="position-list">
              {mockPositions.map((position) => (
                <div key={position.id} className="position-item">
                  <div className="position-header">
                    <span>{position.issue}</span>
                    <span
                      className={`position-status ${position.position.toLowerCase()}`}
                    >
                      {position.position}
                    </span>
                  </div>
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{ width: `${position.confidence}%` }}
                    ></div>
                  </div>
                  <div className="position-meta">
                    Confidence: {position.confidence}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholder Analysis */}
          <div className="overview-card">
            <h2>Stakeholder Analysis</h2>
            <div className="metric-display">
              <h3 class="analysis-header">
                {" "}
                <TrendingUp className="icon" size={16} />
                Influence
              </h3>
              <div className="current-value">
                {mockMetrics.influence.current}%
              </div>
              <div className="trend-indicator positive">
                +{mockMetrics.influence.trend}% {mockMetrics.influence.period}
              </div>
            </div>
            <div className="alignment-score">
              <h3 class="analysis-header">
                {" "}
                <Activity className="icon" size={16} />
                Position Alignment
              </h3>
              <div className="score-value">{mockMetrics.alignment.score}</div>
              <div className="score-category">
                {mockMetrics.alignment.category} Alignment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="activity-timeline">
        <h2>Activity Timeline</h2>
        {mockActivity.map((activity) => (
          <div key={activity.id} className="timeline-item">
            <div className="date">{activity.date}</div>
            <div className="description">{activity.description}</div>
            <div className="type">{activity.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
