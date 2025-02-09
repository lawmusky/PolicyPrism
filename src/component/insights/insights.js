import { useState } from "react";
import {
  TrendingUp,
  Users,
  Target,
  BarChart2,
  Calendar,
  Download,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Zap,
  Award,
  Radio,
  Network,
} from "lucide-react";

// Mock data for insights
const mockMetrics = {
  reach: {
    current: 15420,
    previous: 12800,
    trend: "+20.5%",
    trending: "up",
  },
  influence: {
    score: 85,
    change: "+5",
    trending: "up",
  },
  engagement: {
    rate: "78%",
    previous: "72%",
    trend: "+6%",
    trending: "up",
  },
  policySuccess: {
    rate: "65%",
    previous: "70%",
    trend: "-5%",
    trending: "down",
  },
  networkGrowth: {
    current: 245,
    new: 12,
    trend: "+5.2%",
    trending: "up",
  },
};

const mockStakeholderMetrics = {
  meetings: {
    total: 48,
    completion: 92,
    trend: "+8%",
  },
  responseRate: {
    rate: "85%",
    previous: "78%",
    trend: "+7%",
  },
  sentiment: {
    positive: 65,
    neutral: 25,
    negative: 10,
    trend: "+5%",
  },
};

const mockPolicyMetrics = {
  supported: 24,
  succeeded: 16,
  successRate: "66.7%",
  inProgress: 8,
  alignmentScore: 78,
};

export default function InsightsSection() {
  const [dateRange, setDateRange] = useState("lastQuarter");
  const [activeView, setActiveView] = useState("overview");

  return (
    <>
      {/* Header */}
      <div className="insights-header">
        <div>
          <h1>Insights Dashboard</h1>
          <div className="header-controls">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              <option value="lastQuarter">Last Quarter</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="view-tabs">
          <button
            className={`view-tab ${activeView === "overview" ? "active" : ""}`}
            onClick={() => setActiveView("overview")}
          >
            Overview
          </button>
          <button
            className={`view-tab ${activeView === "media" ? "active" : ""}`}
            onClick={() => setActiveView("media")}
          >
            Media Engagement
          </button>
          <button
            className={`view-tab ${
              activeView === "stakeholders" ? "active" : ""
            }`}
            onClick={() => setActiveView("stakeholders")}
          >
            Stakeholder Influence
          </button>
          <button
            className={`view-tab ${activeView === "policy" ? "active" : ""}`}
            onClick={() => setActiveView("policy")}
          >
            Policy Impact
          </button>
        </div>
      </div>
      <div className="insights-section">
        {/* Main Content */}
        <div className="insights-content">
          {/* Key Metrics Grid */}
          <div className="metrics-grid">
            {/* Reach Metric */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Total Reach</span>
                <Users className="metric-icon" />
              </div>
              <div className="metric-content">
                <div className="metric-value">
                  {mockMetrics.reach.current.toLocaleString()}
                </div>
                <div className={`metric-trend ${mockMetrics.reach.trending}`}>
                  {mockMetrics.reach.trending === "up" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                  {mockMetrics.reach.trend}
                </div>
              </div>
            </div>

            {/* Influence Score */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Influence Score</span>
                <Zap className="metric-icon" />
              </div>
              <div className="metric-content">
                <div className="metric-value">
                  {mockMetrics.influence.score}
                </div>
                <div
                  className={`metric-trend ${mockMetrics.influence.trending}`}
                >
                  {mockMetrics.influence.trending === "up" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                  {mockMetrics.influence.change}
                </div>
              </div>
            </div>

            {/* Engagement Rate */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Engagement Rate</span>
                <Target className="metric-icon" />
              </div>
              <div className="metric-content">
                <div className="metric-value">
                  {mockMetrics.engagement.rate}
                </div>
                <div
                  className={`metric-trend ${mockMetrics.engagement.trending}`}
                >
                  {mockMetrics.engagement.trending === "up" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                  {mockMetrics.engagement.trend}
                </div>
              </div>
            </div>

            {/* Policy Success Rate */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Policy Success Rate</span>
                <Award className="metric-icon" />
              </div>
              <div className="metric-content">
                <div className="metric-value">
                  {mockMetrics.policySuccess.rate}
                </div>
                <div
                  className={`metric-trend ${mockMetrics.policySuccess.trending}`}
                >
                  {mockMetrics.policySuccess.trending === "up" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                  {mockMetrics.policySuccess.trend}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics Sections */}
          {activeView === "overview" && (
            <div className="analytics-grid">
              {/* Network Growth */}
              <div className="analytics-card">
                <div className="card-header">
                  <h3>Network Growth</h3>
                  <Network className="card-icon" />
                </div>
                <div className="card-content">
                  {/* Add network growth chart here */}
                </div>
              </div>

              {/* Engagement Distribution */}
              <div className="analytics-card">
                <div className="card-header">
                  <h3>Engagement Distribution</h3>
                  <BarChart2 className="card-icon" />
                </div>
                <div className="card-content">
                  {/* Add engagement distribution chart here */}
                </div>
              </div>
            </div>
          )}

          {activeView === "stakeholders" && (
            <div className="analytics-grid">
              {/* Stakeholder analysis content */}
            </div>
          )}

          {activeView === "policy" && (
            <div className="analytics-grid">{/* Policy impact content */}</div>
          )}
        </div>
      </div>
    </>
  );
}
