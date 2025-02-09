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
} from "lucide-react";

import "./styles.css";

// Import components
import OverviewTab from "./component/overview/overviewtab";
import PositionsTab from "./component/positions/PositionsTab";
import RelationshipsTab from "./component/relationships/relationshipstab";
import ActivityTab from "./component/activity/activitytab";
import NetworkView from "./component/network/networkview";
import Dashboard from "./component/dashboard/dashboard";
import RelationshipManager from "./component/relationships/relationship-manager";
import NewsSection from "./component/news/news";

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
    { icon: Newspaper, label: "News", view: "news" }, // Add this item
    { icon: Network, label: "Network", view: "network" },
    { icon: Users, label: "Stakeholders", view: "stakeholders" },
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
            <input type="text" placeholder="Search..." />
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
          {currentSection === "network" && <NetworkView />}
          {currentSection === "relationships" && <RelationshipManager />}
          {currentSection === "stakeholders" && (
            <>
              <div className="header">
                <div className="header-top">
                  <div className="title-section">
                    <h1>Tech Industry Association</h1>
                    <Star className="star-icon" />
                  </div>
                  <button className="btn btn-primary">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                <div className="navigation">
                  {[
                    { id: "overview", label: "Overview", icon: Activity },
                    {
                      id: "relationships",
                      label: "Relationships",
                      icon: Users,
                    },
                    { id: "positions", label: "Positions", icon: FileText },
                    { id: "activity", label: "Activity", icon: Calendar },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`btn btn-secondary ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="content-area">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "positions" && <PositionsTab />}
                {activeTab === "relationships" && <RelationshipsTab />}
                {activeTab === "activity" && <ActivityTab />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
