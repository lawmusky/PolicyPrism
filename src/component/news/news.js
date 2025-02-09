import { useState } from "react";
import {
  TrendingUp,
  Calendar,
  X,
  ExternalLink,
  Share2,
  BookmarkPlus,
} from "lucide-react";

const mockNews = [
  {
    id: 1,
    title: "Major Tech Coalition Forms to Address AI Governance",
    summary:
      "Leading technology companies join forces to establish comprehensive AI governance framework...",
    content: `A groundbreaking coalition of technology industry leaders has announced the formation of a new alliance focused on developing comprehensive AI governance standards. The initiative aims to address growing concerns about AI safety and ethics while promoting innovation.

The coalition, which includes representatives from major tech companies, research institutions, and policy groups, will work to establish guidelines for responsible AI development and deployment. Key areas of focus include data privacy, algorithmic bias, and transparency in AI decision-making processes.

This development represents a significant shift in how the technology industry approaches AI regulation and governance, with potential implications for future policy decisions and industry standards.`,
    category: "Industry News",
    date: "2025-02-09",
    readTime: "5 min",
    trending: true,
    source: "Tech Policy Review",
    impact: "High",
  },
  {
    id: 2,
    title: "New Data Privacy Framework Proposed",
    summary:
      "Regulatory bodies outline new data protection standards affecting tech sector...",
    content: `A comprehensive new data privacy framework has been proposed by regulatory authorities, setting new standards for data protection and user privacy. The framework introduces stricter requirements for data handling and user consent.`,
    category: "Regulation",
    date: "2025-02-08",
    readTime: "4 min",
    trending: false,
    source: "Policy Insights",
    impact: "Medium",
  },
  {
    id: 3,
    title: "Digital Markets Act Implementation Update",
    summary:
      "Latest developments in the rollout of key digital market regulations...",
    content: `Recent updates to the Digital Markets Act implementation timeline indicate significant changes to compliance requirements. Industry stakeholders are preparing for the new regulatory landscape.`,
    category: "Regulation",
    date: "2025-02-07",
    readTime: "3 min",
    trending: true,
    source: "Digital Policy Weekly",
    impact: "High",
  },
];

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="news-section">
      <div className="section-header">
        <h2>Network Insights</h2>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </button>
        </div>
      </div>

      <div className="news-grid">
        {/* Featured Article */}
        <div
          className="featured-article"
          onClick={() => setSelectedArticle(mockNews[0])}
        >
          <div className="content">
            <div className="meta">
              <span className="category">{mockNews[0].category}</span>
              <span className="impact high">{mockNews[0].impact} Impact</span>
            </div>
            <h3>{mockNews[0].title}</h3>
            <p>{mockNews[0].summary}</p>
            <div className="article-footer">
              <div className="source">
                <span>{mockNews[0].source}</span>
                <span className="dot">•</span>
                <span>{mockNews[0].readTime}</span>
              </div>
              <div className="date">
                <Calendar className="w-4 h-4" />
                {mockNews[0].date}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="secondary-articles">
          {mockNews.slice(1).map((article) => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="meta">
                <span className="category">{article.category}</span>
                <span className={`impact ${article.impact.toLowerCase()}`}>
                  {article.impact} Impact
                </span>
              </div>
              <h4>{article.title}</h4>
              <p>{article.summary}</p>
              <div className="article-footer">
                <div className="source">
                  <span>{article.source}</span>
                  <span className="dot">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="article-preview-overlay">
          <div className="article-preview">
            <div className="preview-header">
              <div className="header-content">
                <div className="meta">
                  <span className="category">{selectedArticle.category}</span>
                  <span
                    className={`impact ${selectedArticle.impact.toLowerCase()}`}
                  >
                    {selectedArticle.impact} Impact
                  </span>
                </div>
                <h2>{selectedArticle.title}</h2>
                <div className="article-meta">
                  <span>{selectedArticle.source}</span>
                  <span className="dot">•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span className="dot">•</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>
              <div className="header-actions">
                <button className="btn btn-icon">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="btn btn-icon">
                  <BookmarkPlus className="w-4 h-4" />
                </button>
                <button className="btn btn-icon">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-icon"
                  onClick={() => setSelectedArticle(null)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="preview-content">{selectedArticle.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
