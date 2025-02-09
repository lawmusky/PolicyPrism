import { useState } from "react";
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
  Landmark, // Add Landmark icon for Legislation
} from "lucide-react";

import "./styles.css";

// Import components
import NetworkView from "./component/network/networkview";
import Dashboard from "./component/dashboard/dashboard";
import RelationshipManager from "./component/relationships/relationship-manager";
import NewsSection from "./component/news/news";
import LegislationTracker from "./component/legislation/legislation"; // Add this import

// Mock data for the header
const stakeholderInfo = {
  name: "Tech Industry Association",
  type: "Industry Association",
  influence: 85,
  position: "Supportive",
  priority: "High",
};

export default function App() {
  const [selectedView, setSelectedView] = useState("stakeholder");
  const [activeTab, setActiveTab] = useState("overview");
  const [currentSection, setCurrentSection] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const navigationItems = [
    { icon: Activity, label: "Overview", view: "overview" },
    { icon: Newspaper, label: "News", view: "news" },
    { icon: Network, label: "Issues", view: "network" },
    { icon: Landmark, label: "Legislation", view: "legislation" },
    { icon: Users, label: "Relationships", view: "relationships" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div
        className={`dashboard-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}
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
        </div>
      </div>
    </div>
  );
}
