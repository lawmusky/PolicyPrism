import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Upload,
} from "lucide-react";

//MEP Info Sidebar
const MEPDetailSidebar = ({ mep, onClose }) => {
  if (!mep) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-[600px] bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{mep.stakeholder}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <ArrowRight />
            </button>
          </div>

          {/* Basic Information Section */}
          <div className="details-section">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="basic-info-grid">
              <div className="info-item">
                <span className="info-label">Country</span>
                <span className="info-value">{mep.country}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Party</span>
                <span className="info-value">{mep.party}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Position</span>
                <span className="info-value">{mep.position}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Group</span>
                <span className="info-value">{mep.type}</span>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="details-section">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="contact-grid">
              {mep.contacts.email.map((email, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Email {i + 1}</span>
                    <span className="contact-value">
                      <a href={`mailto:${email}`}>{email}</a>
                    </span>
                  </div>
                </div>
              ))}
              {mep.contacts.phone.map((phone, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Phone {i + 1}</span>
                    <span className="contact-value">{phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="details-section">
            <h3 className="text-lg font-semibold mb-4">Social Media & Web</h3>
            <div className="social-grid">
              {mep.contacts.social.twitter && (
                <a
                  href={mep.contacts.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  data-platform="twitter"
                >
                  <div className="social-icon">
                    <Twitter className="w-6 h-6" />
                  </div>
                  <span className="social-label">Twitter</span>
                </a>
              )}
              {mep.contacts.social.facebook && (
                <a
                  href={mep.contacts.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  data-platform="facebook"
                >
                  <div className="social-icon">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="social-label">Facebook</span>
                </a>
              )}
              {mep.contacts.social.linkedin && (
                <a
                  href={mep.contacts.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  data-platform="linkedin"
                >
                  <div className="social-icon">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <span className="social-label">LinkedIn</span>
                </a>
              )}
              {mep.contacts.social.website && (
                <a
                  href={mep.contacts.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  data-platform="website"
                >
                  <div className="social-icon">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="social-label">Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Committees Section */}
          <div className="details-section">
            <h3 className="text-lg font-semibold mb-4">Committees</h3>
            <div className="space-y-2">
              {mep.committees.map((committee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span>{committee.committee}</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {committee.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses Section */}
          <div className="details-section">
            <h3 className="text-lg font-semibold mb-4">Addresses</h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium mb-1">Brussels Office</p>
                <p className="text-sm">{mep.addresses.brussels}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium mb-1">Strasbourg Office</p>
                <p className="text-sm">{mep.addresses.strasbourg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSV parsing function
const parseCSV = (text) => {
  // Split the text into lines and filter out empty lines
  const lines = text.split("\n").filter((line) => line.trim());

  // Get headers from the first line
  const headers = lines[0].split(";").map((h) => h.trim());

  // Parse each line into an object
  return lines
    .slice(1)
    .map((line) => {
      // Handle cases where fields might contain semicolons within quotes
      const values = [];
      let value = "";
      let inQuotes = false;

      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ";" && !inQuotes) {
          values.push(value.trim());
          value = "";
        } else {
          value += char;
        }
      }
      values.push(value.trim()); // Push the last value

      // Create object from headers and values
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index]
          ? values[index].replace(/^"(.*)"$/, "$1")
          : null;
      });
      return obj;
    })
    .filter((obj) =>
      Object.values(obj).some((val) => val !== null && val !== "")
    );
};

// Helper function to get political group abbreviation
const getGroupInfo = (groupName) => {
  if (!groupName) return { acronym: "NI", fullName: "Non-attached Members" };

  const groupMap = {
    "European People's Party": {
      acronym: "EPP",
      fullName: "European People's Party",
    },
    "Progressive Alliance of Socialists and Democrats": {
      acronym: "S&D",
      fullName: "Progressive Alliance of Socialists and Democrats",
    },
    "Renew Europe": {
      acronym: "Renew",
      fullName: "Renew Europe",
    },
    "Greens/European Free Alliance": {
      acronym: "Greens/EFA",
      fullName: "Greens/European Free Alliance",
    },
    "Identity and Democracy": {
      acronym: "ID",
      fullName: "Identity and Democracy",
    },
    "European Conservatives and Reformists": {
      acronym: "ECR",
      fullName: "European Conservatives and Reformists",
    },
    "The Left": {
      acronym: "LEFT",
      fullName: "The Left",
    },
    "Non-attached Members": {
      acronym: "NI",
      fullName: "Non-attached Members",
    },
  };

  for (const [key, value] of Object.entries(groupMap)) {
    if (groupName.includes(key)) return value;
  }

  return { acronym: "NI", fullName: groupName };
};

// Main MEP Relationship Manager Component
export default function MEPRelationshipManager() {
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMEP, setSelectedMEP] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCommittee, setFilterCommittee] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target.result;
        const parsedData = parseCSV(text);

        const transformedData = parsedData.map((mep, index) => ({
          id: index + 1,
          stakeholder: `${mep["First name"]} ${mep["Last name"]}`,
          type: mep.group,
          position: mep.position,
          country: mep.country,
          party: mep.party,
          contacts: {
            email: [mep.email_1, mep.email_2].filter(Boolean),
            phone: [mep.telephone_1, mep.telephone_2].filter(Boolean),
            social: {
              twitter: mep.tw_link,
              facebook: mep.fb_link,
              instagram: mep.ig_link,
              linkedin: mep.li_link,
              youtube: mep.yt_link,
              website: mep.web_link,
            },
          },
          committees: Object.entries(mep)
            .filter(
              ([key, value]) =>
                value === "Member" ||
                value === "Substitute" ||
                value === "Chair"
            )
            .map(([key, value]) => ({ committee: key, role: value })),
          addresses: {
            brussels: mep.address_brussels,
            strasbourg: mep.address_strassbourg,
          },
          rawData: mep,
        }));

        setRelationships(transformedData);
        setLoading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error loading MEP data:", error);
      setLoading(false);
    }
  };

  // Get unique lists for filters
  const uniqueGroups = [
    ...new Set(relationships.map((rel) => rel.type).filter(Boolean)),
  ].sort();
  const uniqueCountries = [
    ...new Set(relationships.map((rel) => rel.country).filter(Boolean)),
  ].sort();
  const uniqueCommittees = [
    ...new Set(
      relationships.flatMap((rel) =>
        rel.committees.map((committee) => committee.committee)
      )
    ),
  ].sort();

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterGroup("");
    setFilterCountry("");
    setFilterCommittee("");
  };

  // Filter relationships based on all criteria
  const filteredRelationships = relationships.filter((rel) => {
    const matchesSearch =
      rel.stakeholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.party?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup ? rel.type === filterGroup : true;
    const matchesCountry = filterCountry ? rel.country === filterCountry : true;
    const matchesCommittee = filterCommittee
      ? rel.committees.some(
          (committee) => committee.committee === filterCommittee
        )
      : true;

    return matchesSearch && matchesGroup && matchesCountry && matchesCommittee;
  });

  return (
    <div className="w-full h-full bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Relationship Manager</h1>

          {relationships.length === 0 && !loading ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-lg">Upload MEP data CSV file</p>
                  <p className="text-sm text-gray-500">
                    Click to browse or drag and drop
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search MEPs, countries, or parties..."
                  className="w-full p-2 pl-10 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <select
                  className="p-2 border rounded-lg min-w-[120px]"
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                >
                  <option value="">All Groups</option>
                  {uniqueGroups.map((group) => (
                    <option key={group} value={group} title={group}>
                      {getGroupInfo(group).acronym}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border rounded-lg min-w-[150px]"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border rounded-lg min-w-[150px]"
                  value={filterCommittee}
                  onChange={(e) => setFilterCommittee(e.target.value)}
                >
                  <option value="">All Committees</option>
                  {uniqueCommittees.map((committee) => (
                    <option key={committee} value={committee}>
                      {committee}
                    </option>
                  ))}
                </select>
                {filteredRelationships.length < relationships.length && (
                  <button
                    onClick={clearFilters}
                    className="p-2 border rounded-lg text-sm text-blue-600 hover:bg-blue-50"
                  >
                    Clear Filters ({filteredRelationships.length} of{" "}
                    {relationships.length})
                  </button>
                )}
                <label className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-5 h-5" />
                </label>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Loading MEP data...</div>
        ) : relationships.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left">MEP</th>
                  <th className="py-3 px-4 text-left">Group</th>
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Committees</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRelationships.map((mep) => (
                  <tr
                    key={mep.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedMEP(mep)}
                  >
                    <td className="py-3 px-4">{mep.stakeholder}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`type-badge`}
                        data-group={getGroupInfo(mep.type).acronym}
                        title={mep.type}
                      >
                        {getGroupInfo(mep.type).acronym}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="country-badge"
                        data-group={mep.country}
                        title={mep.country}
                      >
                        {mep.country}
                      </span>
                    </td>
                    <td className="py-3 px-4">{mep.position}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {mep.committees.length} committees
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <MEPDetailSidebar
        mep={selectedMEP}
        onClose={() => setSelectedMEP(null)}
      />
    </div>
  );
}
