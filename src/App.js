import { useState, useEffect } from "react";
import {
  Menu,
  Star,
  Edit,
  Activity,
  Users,
  FileText,
  Calendar,
  Network,
  Bell,
  Search,
  Settings,
  ChevronLeft,
  Newspaper,
  Landmark,
  BarChart2,
  Sun,
  Moon,
} from "lucide-react";

import "./styles.css";

// Import components
import NetworkView from "./component/network/networkview";
import Dashboard from "./component/dashboard/dashboard";
import RelationshipManager from "./component/relationships/relationship-manager";
import NewsSection from "./component/news/news";
import LegislationTracker from "./component/legislation/legislation";
import InsightsSection from "./component/insights/insights";

const stakeholderInfo = {
  name: "Tech Industry Association",
  type: "Industry Association",
  influence: 85,
  position: "Supportive",
  priority: "High",
};

export default function App() {
  const [selectedView, setSelectedView] = useState("stakeholder");
  const [currentSection, setCurrentSection] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("darkMode", "true");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("darkMode", "false");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const updateBackgroundPosition = () => {
      // Get current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Convert current time to decimal hours (e.g., 6:30 = 6.5)
      const timeInDecimal = hours + minutes / 60;

      // Calculate position based on time
      let position;
      if (timeInDecimal <= 12) {
        // From midnight to noon: 0% to 100%
        position = (timeInDecimal / 12) * 100;
      } else {
        // From noon to midnight: 100% to 0%
        position = ((24 - timeInDecimal) / 12) * 100;
      }

      // Get mouse position
      const mouseX = ((mousePosition.x - 50) / 100) * 50; // -25px to +25px

      // Apply the combined position
      const sidebar = document.querySelector(".dashboard-sidebar");
      if (sidebar) {
        const finalPosition = `${position}% top`;

        sidebar.style.backgroundPosition = finalPosition;
      }
    };

    // Update immediately
    updateBackgroundPosition();

    // Update more frequently for debugging
    const interval = setInterval(updateBackgroundPosition, 1);

    return () => clearInterval(interval);
  }, [mousePosition]); // Include mousePosition in dependencies

  const handleNavigation = (section) => {
    setCurrentSection(section);
    if (section === "network") {
      setSelectedView("network");
    } else if (section === "stakeholders") {
      setSelectedView("stakeholder");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigationItems = [
    { icon: Activity, label: "Overview", view: "overview" },
    { icon: Newspaper, label: "News", view: "news" },
    { icon: Network, label: "Issues", view: "network" },
    { icon: Landmark, label: "Legislation", view: "legislation" },
    { icon: Users, label: "Relationships", view: "relationships" },
    { icon: BarChart2, label: "Insights", view: "insights" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div
        className={`dashboard-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}
        style={{
          transition: "0.3s ease-out",
        }}
      >
        <div className="sidebar-header">
          <div>
            <h1>PolicyPrism</h1>
            <p className="subtitle">Policy Intelligence Platform</p>
          </div>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarCollapsed ? <Menu /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="dashboard-nav">
          {navigationItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigation(item.view)}
              className={`nav-item ${
                currentSection === item.view ? "active" : ""
              }`}
              data-tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode} className="nav-item">
            {isDarkMode ? <Sun /> : <Moon />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarCollapsed ? "expanded" : ""}`}>
        {/* Top Bar */}
        <div className="main-header">
          <div className="search-container">
            <input type="text" placeholder="Ask me anything..." />
            <Search className="search-icon" />
          </div>

          <div className="header-actions">
            <button className="btn btn-icon">
              <Bell />
            </button>
            <button className="btn btn-icon">
              <Calendar />
            </button>
            <button className="btn btn-icon">
              <Settings />
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="h-[calc(100vh-4rem)] overflow-auto">
          {currentSection === "overview" && <Dashboard />}
          {currentSection === "news" && <NewsSection />}
          {currentSection === "legislation" && <LegislationTracker />}
          {currentSection === "network" && <NetworkView />}
          {currentSection === "relationships" && <RelationshipManager />}
          {currentSection === "insights" && <InsightsSection />}
        </div>
      </div>
    </div>
  );
}
