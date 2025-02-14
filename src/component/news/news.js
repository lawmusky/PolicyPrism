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
  LayoutList,
  LayoutGrid,
} from "lucide-react";

import mockNews from "./mocknews";

const MagazineView = ({ filteredNews, itemsToShow, onArticleSelect }) => {
  return (
    <div className="news-grid">
      {filteredNews.length > 0 ? (
        <>
          {/* Featured Article */}
          <div
            className="featured-article"
            onClick={() => onArticleSelect(filteredNews[0])}
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
                <span className="category">{filteredNews[0].category}</span>
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
                onClick={() => onArticleSelect(article)}
              >
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

          {/* Feed Articles */}
          <div className="feed-articles">
            {filteredNews.slice(3, itemsToShow + 3).map((article) => (
              <div
                key={article.id}
                className="feed-article"
                onClick={() => onArticleSelect(article)}
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
          </div>
        </>
      ) : (
        <div className="no-results">
          <p>No articles match your search</p>
        </div>
      )}
    </div>
  );
};

const FeedView = ({ news, onArticleSelect }) => {
  const feeds = [
    {
      title: "All News",
      filter: (article) => "all",
    },
    {
      title: "High Impact",
      filter: (article) => article.impact === "High",
    },
    {
      title: "Policy Updates",
      filter: (article) =>
        article.category === "Regulation" || article.tags.includes("Policy"),
    },
    {
      title: "Industry News",
      filter: (article) => article.category === "Industry News",
    },
  ];

  return (
    <div className="feed-view">
      <div className="feed-columns">
        {feeds.map((feed, index) => (
          <div key={index} className="feed-column">
            <div className="feed-column-header">
              <h3>{feed.title}</h3>
            </div>
            <div className="feed-column-content">
              {news.filter(feed.filter).map((article) => (
                <div
                  key={article.id}
                  className="feed-card"
                  onClick={() => onArticleSelect(article)}
                >
                  <div className="feed-card-header">
                    <span className="category">{article.category}</span>
                    <span className={`impact ${article.impact.toLowerCase()}`}>
                      {article.impact} Impact
                    </span>
                  </div>
                  <h4>{article.title}</h4>
                  <p>{article.summary}</p>
                  <div className="feed-card-footer">
                    <div className="source">
                      <span>{article.source}</span>
                      <span className="dot">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="date">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState("magazine");

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + 3;
    setItemsToShow(newItemsToShow);
    // Check if we've reached the end of the remaining articles (excluding featured and trending)
    setHasMore(newItemsToShow + 3 < filteredNews.length);
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

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
            <div className="view-toggle">
              <button
                className={`view-button ${
                  viewMode === "magazine" ? "active" : ""
                }`}
                onClick={() => setViewMode("magazine")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                className={`view-button ${viewMode === "feed" ? "active" : ""}`}
                onClick={() => setViewMode("feed")}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
            {viewMode === "magazine" && (
              <button className="filter-button">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            )}
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
        {viewMode === "magazine" ? (
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
            <MagazineView
              filteredNews={filteredNews}
              itemsToShow={itemsToShow}
              onArticleSelect={setSelectedArticle}
            />
            {hasMore && (
              <button className="load-more" onClick={handleLoadMore}>
                Load More
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <FeedView news={mockNews} onArticleSelect={setSelectedArticle} />
        )}

        {/* Article Preview Sidebar */}
        {selectedArticle && (
          <div
            className="sidebar-overlay"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="sidebar-slide-in open"
              onClick={(e) => e.stopPropagation()}
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
