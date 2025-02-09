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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
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
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 7,
    title: "Tech Industry Forms Cybersecurity Alliance",
    summary:
      "Leading tech companies establish joint taskforce to address emerging cyber threats and share security intelligence...",
    content:
      "Major technology companies have announced the formation of a new cybersecurity alliance aimed at combating sophisticated cyber threats. The initiative will facilitate real-time threat intelligence sharing and establish industry-wide security standards.",
    category: "Industry News",
    date: "2025-02-03",
    readTime: "5 min",
    trending: true,
    source: "Tech Security Weekly",
    impact: "High",
    tags: ["Cybersecurity", "Industry Collaboration", "Security Standards"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 8,
    title: "Cloud Providers Announce Green Computing Initiative",
    summary:
      "Major cloud service providers commit to carbon-neutral data centers by 2030, investing in renewable energy...",
    content:
      "Leading cloud computing providers have jointly announced a comprehensive initiative to achieve carbon neutrality in their data centers. The plan includes massive investments in renewable energy and innovative cooling technologies.",
    category: "Industry News",
    date: "2025-02-02",
    readTime: "4 min",
    trending: false,
    source: "Tech Sustainability Report",
    impact: "High",
    tags: ["Sustainability", "Cloud Computing", "Green Tech"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 9,
    title: "Tech Giants Launch Digital Skills Program",
    summary:
      "Industry-wide initiative aims to upskill 1 million workers in emerging technologies over next five years...",
    content:
      "A consortium of technology companies has unveiled a comprehensive digital skills program targeting workforce development. The initiative will provide free training in AI, cloud computing, and cybersecurity.",
    category: "Industry News",
    date: "2025-02-01",
    readTime: "6 min",
    trending: true,
    source: "Education Tech Review",
    impact: "Medium",
    tags: ["Education", "Workforce Development", "Digital Skills"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 10,
    title: "Industry Leaders Standardize AI Model Documentation",
    summary:
      "Tech companies agree on universal format for AI model documentation to improve transparency and accountability...",
    content:
      "Major AI developers have reached consensus on a standardized format for documenting AI models, aiming to enhance transparency and facilitate better understanding of AI systems across the industry.",
    category: "Industry News",
    date: "2025-01-31",
    readTime: "4 min",
    trending: false,
    source: "AI Industry Journal",
    impact: "Medium",
    tags: ["AI", "Documentation Standards", "Transparency"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 11,
    title: "Tech Industry Launches Cross-Platform Privacy Framework",
    summary:
      "New collaborative initiative aims to standardize privacy controls across different platforms and services...",
    content:
      "Leading technology companies have announced a unified approach to privacy controls, developing a cross-platform framework that will allow users to manage their privacy settings consistently across different services and applications.",
    category: "Industry News",
    date: "2025-01-30",
    readTime: "5 min",
    trending: true,
    source: "Privacy Tech Insider",
    impact: "High",
    tags: ["Privacy", "Standardization", "User Control"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
];
export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(6); // Initial number of items to show
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + 3; // Load 3 more items
    setItemsToShow(newItemsToShow);

    // Check if we've reached the end of the items
    if (newItemsToShow >= filteredNews.length) {
      setHasMore(false);
    }
  };

  const filters = [
    { id: "all", label: "All News" },
    {
      id: "high-impact",
      label: "High Impact",
      filterFn: (article) => article.impact === "High",
    },
    {
      id: "policy",
      label: "Policy Updates",
      filterFn: (article) =>
        article.category === "Regulation" || article.tags.includes("Policy"),
    },
    {
      id: "industry",
      label: "Industry News",
      filterFn: (article) => article.category === "Industry News",
    },
  ];

  const getFilteredNews = () => {
    let filtered = [...mockNews];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== "all") {
      const currentFilter = filters.find((f) => f.id === activeFilter);
      if (currentFilter?.filterFn) {
        filtered = filtered.filter(currentFilter.filterFn);
      }
    }

    return filtered;
  };

  const filteredNews = getFilteredNews();

  return (
    <>
      <div className="tracker-header">
        <span>
          <h1>News Stories</h1>

          <div className="search-filter-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search news..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Track New Story
          </button>
        </div>
      </div>

      <div className="news-section">
        <div className="news-feed-section">
          <div className="feed-header">
            <h3>Featured News</h3>
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

          <div className="news-grid">
            {filteredNews.length > 0 ? (
              <>
                {/* Featured Article */}
                <div
                  className="featured-article"
                  onClick={() => setSelectedArticle(filteredNews[0])}
                >
                  <div className="article-image">
                    <img
                      src={filteredNews[0].image}
                      alt={filteredNews[0].title}
                      className="featured-image"
                    />
                  </div>
                  <div className="content">
                    <div className="meta">
                      <span className="category">
                        {filteredNews[0].category}
                      </span>
                      <span className="impact high">
                        {filteredNews[0].impact} Impact
                      </span>
                    </div>
                    <h3>{filteredNews[0].title}</h3>
                    <p>{filteredNews[0].summary}</p>
                    <div className="article-footer">
                      <div className="source">
                        <span>{filteredNews[0].source}</span>
                        <span className="dot">•</span>
                        <span>{filteredNews[0].readTime}</span>
                      </div>
                      <div className="date">
                        <Calendar className="w-4 h-4" />
                        {filteredNews[0].date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Articles */}
                <div className="secondary-articles">
                  <h3>Trending</h3>
                  {filteredNews.slice(1, 3).map((article) => (
                    <div
                      key={article.id}
                      className="article-card"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="article-content">
                        <div className="meta">
                          <span className="category">{article.category}</span>
                          <span
                            className={`impact ${article.impact.toLowerCase()}`}
                          >
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

                {/* Feed Articles */}
                <div className="feed-articles">
                  {filteredNews.slice(0, itemsToShow).map((article) => (
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
                          <span
                            className={`impact ${article.impact.toLowerCase()}`}
                          >
                            {article.impact} Impact
                          </span>
                        </div>

                        <h4>{article.title}</h4>
                        <p>{article.summary}</p>

                        <div className="article-footer">
                          <div className="source-info">
                            <span className="source">{article.source}</span>
                            <span className="dot">•</span>
                            <span className="read-time">
                              {article.readTime}
                            </span>
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
              </>
            ) : (
              <div className="no-results">
                <p>No articles match your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Article Preview Sidebar */}
        {selectedArticle && (
          <div
            className="sidebar-overlay"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="sidebar-slide-in open"
              onClick={(e) => e.stopPropagation()}
              style={{ width: "60%" }}
            >
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h2>{selectedArticle.title}</h2>
                  <button
                    className="close-button"
                    onClick={() => setSelectedArticle(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="sidebar-navigation">
                  <button className="nav-tab active">Overview</button>
                  <button className="nav-tab">Details</button>
                  <button className="nav-tab">Tags</button>
                </div>

                <div className="sidebar-tabs">
                  <div className="details-section">
                    <h3>Overview</h3>
                    <p>{selectedArticle.summary}</p>
                  </div>
                  <div className="details-section">
                    <h3>Content</h3>
                    <p>{selectedArticle.content}</p>
                  </div>
                  <div className="details-section">
                    <h3>Tags</h3>
                    <div className="tags">
                      {selectedArticle.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
