// components/MapVisualization.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker icon fix for Leaflet in React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function MapVisualization({ data }) {
  const position = [37.7749, -122.4194]; // Default to San Francisco

  return (
    <MapContainer center={position} zoom={4} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {data.map((stakeholder) => (
        <Marker key={stakeholder.id} position={getCoordinates(stakeholder.region)}>
          <Popup>
            <strong>{stakeholder.name}</strong><br />
            Role: {stakeholder.role}<br />
            Sentiment: {stakeholder.sentiment}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function getCoordinates(region) {
  const coordinates = {
    "Washington, DC": [38.8951, -77.0364],
    "San Francisco, CA": [37.7749, -122.4194],
    "New York, NY": [40.7128, -74.0060]
  };
  return coordinates[region] || [37.7749, -122.4194]; // Default to San Francisco
}
