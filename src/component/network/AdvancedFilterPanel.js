// components/AdvancedFilterPanel.js
import React, { useState } from "react";
import { X } from "lucide-react";

export default function AdvancedFilterPanel({
  filters,
  onFilterChange,
  onClose,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  return (
    <div className="filter-panel-overlay">
      <div className="filter-panel">
        <div className="filter-panel-header">
          <h2>Advanced Filters</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-group">
          <label htmlFor="influence">Influence Level</label>
          <select
            name="influence"
            value={localFilters.influence || ""}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="stakeholderType">Stakeholder Type</label>
          <select
            name="stakeholderType"
            value={localFilters.stakeholderType || ""}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="influencer">Influencer</option>
            <option value="bridge-builder">Bridge-Builder</option>
            <option value="emerging-voice">Emerging Voice</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sentiment">Sentiment</label>
          <select
            name="sentiment"
            value={localFilters.sentiment || ""}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="region">Geographic Region</label>
          <input
            type="text"
            name="region"
            placeholder="Enter a region"
            value={localFilters.region || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="filter-actions">
          <button className="apply-button" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
