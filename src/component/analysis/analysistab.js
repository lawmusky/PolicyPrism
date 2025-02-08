// components/Analysis/AnalysisTab.js
import { TrendingUp, Network, Activity, Users, Download } from "lucide-react";

const mockMetrics = {
  influence: {
    current: 85,
    trend: +5,
    period: "This Quarter",
  },
  alignment: {
    score: 78,
    category: "High",
    topAligned: ["Global Tech Alliance", "Policy Research Institute"],
  },
  activity: {
    level: "Very High",
    percentile: 92,
    trend: "Increasing",
  },
  network: {
    centrality: "High",
    reach: 245,
    keyConnectors: ["Digital Rights Foundation", "Tech Policy Forum"],
  },
};

export default function AnalysisTab() {
  return (
    <div className="analysis-tab">
      <div className="tab-header">
        <h2>Stakeholder Analysis</h2>
        <button className="export-button">
          <Download size={16} />
          Export Analysis
        </button>
      </div>

      <div className="analysis-grid">
        {/* Influence Analysis */}
        <div className="analysis-card">
          <div className="analysis-header">
            <h3>
              <TrendingUp size={16} />
              Influence Analysis
            </h3>
          </div>
          <div className="metric-display">
            <div className="current-value">
              {mockMetrics.influence.current}%
            </div>
            <div className="trend-indicator positive">
              +{mockMetrics.influence.trend}% {mockMetrics.influence.period}
            </div>
          </div>
          <div className="trend-chart">[Influence Trend Chart]</div>
        </div>

        {/* Network Position */}
        <div className="analysis-card">
          <div className="analysis-header">
            <h3>
              <Network size={16} />
              Network Position
            </h3>
          </div>
          <div className="network-metrics">
            <div className="metric">
              <span>Centrality</span>
              <strong>{mockMetrics.network.centrality}</strong>
            </div>
            <div className="metric">
              <span>Network Reach</span>
              <strong>{mockMetrics.network.reach} stakeholders</strong>
            </div>
          </div>
          <div className="key-connectors">
            <h4>Key Network Connectors</h4>
            <ul>
              {mockMetrics.network.keyConnectors.map((connector, index) => (
                <li key={index}>{connector}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alignment Analysis */}
        <div className="analysis-card">
          <div className="analysis-header">
            <h3>
              <Activity size={16} />
              Position Alignment
            </h3>
          </div>
          <div className="alignment-score">
            <div className="score-value">{mockMetrics.alignment.score}</div>
            <div className="score-category">
              {mockMetrics.alignment.category} Alignment
            </div>
          </div>
          <div className="aligned-stakeholders">
            <h4>Top Aligned Stakeholders</h4>
            <ul>
              {mockMetrics.alignment.topAligned.map((stakeholder, index) => (
                <li key={index}>{stakeholder}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Activity Analysis */}
        <div className="analysis-card">
          <div className="analysis-header">
            <h3>
              <Users size={16} />
              Activity Analysis
            </h3>
          </div>
          <div className="activity-metrics">
            <div className="activity-level">
              <span>Activity Level</span>
              <strong>{mockMetrics.activity.level}</strong>
            </div>
            <div className="percentile">
              <span>Percentile</span>
              <strong>{mockMetrics.activity.percentile}th</strong>
            </div>
            <div className="trend">
              <span>Trend</span>
              <strong>{mockMetrics.activity.trend}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
