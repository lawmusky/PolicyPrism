import { useState } from "react";
import {
  TrendingUp,
  Calendar,
  X,
  ExternalLink,
  Share2,
  BookmarkPlus,
  Filter,
  ChevronDown,
  Search,
  Plus,
} from "lucide-react";

// Featured news items
const mockNews = [
  {
    id: 1,
    title: "Major Tech Coalition Forms to Address AI Governance",
    summary:
      "Leading technology companies join forces to establish comprehensive AI governance framework...",
    content: `A groundbreaking coalition of technology industry leaders has announced the formation of a new alliance focused on developing comprehensive AI governance standards. The initiative aims to address growing concerns about AI safety and ethics while promoting innovation.

The coalition, which includes representatives from major tech companies, research institutions, and policy groups, will work to establish guidelines for responsible AI development and deployment. Key areas of focus include data privacy, algorithmic bias, and transparency in AI decision-making processes.`,
    category: "Industry News",
    date: "2025-02-09",
    readTime: "5 min",
    trending: true,
    source: "Tech Policy Review",
    impact: "High",
    tags: ["AI Governance", "Industry Coalition", "Policy"],
    image: "/api/placeholder/800/400",
  },
  {
    id: 2,
    title: "New Data Privacy Framework Proposed",
    summary:
      "Regulatory bodies outline new data protection standards affecting tech sector...",
    content: `A comprehensive new data privacy framework has been proposed by regulatory authorities, setting new standards for data protection and user privacy.`,
    category: "Regulation",
    date: "2025-02-08",
    readTime: "4 min",
    trending: false,
    source: "Policy Insights",
    impact: "Medium",
    tags: ["Privacy", "Regulation", "Data Protection"],
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Digital Markets Act Implementation Update",
    summary:
      "Latest developments in the rollout of key digital market regulations...",
    content: `Recent updates to the Digital Markets Act implementation timeline indicate significant changes to compliance requirements.`,
    category: "Regulation",
    date: "2025-02-07",
    readTime: "3 min",
    trending: true,
    source: "Digital Policy Weekly",
    impact: "High",
    tags: ["DMA", "Digital Markets", "Compliance"],
    image: "/api/placeholder/400/300",
  },
];

// Extended feed news items
const mockNewsFeed = [
  {
    id: 4,
    title: "Digital Competition Bill Advances Through Committee",
    summary:
      "Key legislative proposal gains support with new amendments addressing platform competition...",
    content:
      "Detailed coverage of the Digital Competition Bill's progress through committee.",
    category: "Legislation",
    date: "2025-02-06",
    readTime: "6 min",
    source: "Policy Watch",
    impact: "High",
    tags: ["Competition", "Digital Markets", "Regulation"],
    image: "/api/placeholder/600/400",
  },
  {
    id: 5,
    title: "Industry Response to New Privacy Standards",
    summary:
      "Major stakeholders react to proposed privacy framework with mixed feedback...",
    content: "Analysis of industry responses to the new privacy standards.",
    category: "Privacy",
    date: "2025-02-05",
    readTime: "4 min",
    source: "Tech Brief",
    impact: "Medium",
    tags: ["Privacy", "Industry Standards"],
    image: "/api/placeholder/600/400",
  },
  {
    id: 6,
    title: "Global Tech Summit Announces Key Themes",
    summary:
      "Annual technology policy conference to focus on AI governance and digital rights...",
    content: "Preview of the upcoming Global Tech Summit themes and speakers.",
    category: "Events",
    date: "2025-02-04",
    readTime: "3 min",
    source: "Tech Policy Today",
    impact: "Medium",
    tags: ["Events", "AI", "Digital Rights"],
    image: "/api/placeholder/600/400",
  },
];

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All News" },
    { id: "high-impact", label: "High Impact" },
    { id: "policy", label: "Policy Updates" },
    { id: "industry", label: "Industry News" },
  ];

  return (
    <div class="h-[calc(100vh-4rem)] overflow-auto">
      <div className="tracker-header">
        <span>
          <h1>Today's Top Stories</h1>

          <div className="search-filter-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search news..."
                className="search-input"
              />
              <Search className="search-icon" />
            </div>
            <button className="filter-button">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </span>

        <div className="header-actions">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Track New Item
          </button>
        </div>
      </div>
      <div className="news-section">
        <div className="news-grid">
          {/* Featured Article */}
          <div
            className="featured-article"
            onClick={() => setSelectedArticle(mockNews[0])}
          >
            <div className="article-image">
              <img
                src={mockNews[0].image}
                alt={mockNews[0].title}
                className="featured-image"
              />
            </div>
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
                <div className="article-image">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="card-image"
                  />
                </div>
                <div className="article-content">
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
              </div>
            ))}
          </div>
        </div>

        {/* News Feed Section */}
        <div className="news-feed-section">
          <div className="feed-header">
            <h3>Latest Updates</h3>
            <div className="feed-filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${
                    activeFilter === filter.id ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
              <button className="btn btn-icon">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="news-feed">
            {mockNewsFeed.map((article) => (
              <div
                key={article.id}
                className="feed-article"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-image">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="feed-image"
                  />
                </div>
                <div className="feed-article-content">
                  <div className="article-meta">
                    <span className="category">{article.category}</span>
                    <span className={`impact ${article.impact.toLowerCase()}`}>
                      {article.impact} Impact
                    </span>
                  </div>

                  <h4>{article.title}</h4>
                  <p>{article.summary}</p>

                  <div className="article-footer">
                    <div className="source-info">
                      <span className="source">{article.source}</span>
                      <span className="dot">•</span>
                      <span className="read-time">{article.readTime}</span>
                    </div>
                    <div className="article-date">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                  </div>

                  <div className="article-tags">
                    {article.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button className="load-more">
              Load More
              <ChevronDown className="w-4 h-4" />
            </button>
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
                  <div className="preview-image">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="preview-article-image"
                    />
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
    </div>
  );
}
