import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import churchList from "../assets/data/churches.json";
import ZoomControl from "../components/ZoomControl";

// Define the custom icon for the church
const churchIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Define the custom icon for the range indicator
const rangeIndicatorIcon = L.divIcon({
  className: 'range-indicator-icon',
  html: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="5" stroke="red" stroke-width="2" fill="red"/>
      <path d="M12 14C10.3431 14 9 15.3431 9 17V19H15V17C15 15.3431 13.6569 14 12 14Z" stroke="red" stroke-width="2"/>
      <path d="M12 1C13.6569 1 15 2.34315 15 4C15 5.65685 13.6569 7 12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1Z" fill="red"/>
    </svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DistrictMap: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const district = params.get("district");

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedChurchName, setSelectedChurchName] = useState<string | null>(null);
  const [showAllChurches, setShowAllChurches] = useState<boolean>(false);

  const [mapCenter, setMapCenter] = useState<[number, number]>([1.3521, 103.8198]); // Singapore coordinates
  const [mapZoom, setMapZoom] = useState<number>(13); // Default zoom level

  const districts = Array.from(new Set(churchList.map((church) => church.district)));

  const filteredChurches = district === "All Churches"
    ? churchList
    : churchList.filter((church) => church.district === district);

  const churchesToShow = showAllChurches ? filteredChurches : filteredChurches.filter(church => church.name === selectedChurchName);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (showAllChurches) {
      setMapCenter([1.3521, 103.8198]);
      setMapZoom(13);
    } else {
      setMapZoom(15);
    }
  }, [showAllChurches]);

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = event.target.value;
    navigate(`/district-map?district=${encodeURIComponent(selectedDistrict)}`);
  };

  const handleSelectChurch = (church: typeof churchList[0]) => {
    if (selectedChurchName === church.name) {
      setSelectedChurchName(null);
      setShowAllChurches(true);
      setMapCenter([1.3521, 103.8198]);
      setMapZoom(13);
    } else {
      setSelectedChurchName(church.name);
      setMapCenter([church.lat, church.lon]);
      setMapZoom(15);
      setShowAllChurches(false);
    }
  };

  const handleCheckboxChange = () => {
    if (!showAllChurches) {
      setSelectedChurchName(null); // Deselect the selected church
      setShowAllChurches(true); // Show all churches
      setMapCenter([1.3521, 103.8198]); // Center the map on Singapore
      setMapZoom(13); // Adjust zoom level
    } else {
      setShowAllChurches(false);
    }
  };

  const MapUpdater: React.FC<{ position: [number, number] | null, zoom: number, bounds: L.LatLngBounds | null }> = ({ position, zoom, bounds }) => {
    const map = useMap();

    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds);
      } else if (position) {
        map.setView(position, zoom);
      }
    }, [position, zoom, bounds, map]);

    return null;
  };

  const selectedChurch = filteredChurches.find(church => church.name === selectedChurchName);

  // Create bounds if both user location and selected church exist
  const bounds = selectedChurch && userLocation
    ? L.latLngBounds([userLocation, [selectedChurch.lat, selectedChurch.lon]])
    : null;

  return (
    <div>
      <div className="p-4">
        <label htmlFor="district-select" className="mr-2">Choose a district:</label>
        <select
          id="district-select"
          className="p-2 border rounded"
          value={district || ''}
          onChange={handleDistrictChange}
        >
          <option value="">Select a District</option>
          <option value="All Churches">All Churches</option>
          {districts.map((dist, idx) => (
            <option key={idx} value={dist}>{dist}</option>
          ))}
        </select>
      </div>

      <h1 className="text-center text-2xl font-bold my-4">
        {district === "All Churches" ? "All Churches" : `Churches in ${district}`}
      </h1>

      <div className="map-container">
        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
          className="z-20"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl />
          <MapUpdater position={mapCenter} zoom={mapZoom} bounds={bounds} />
          {churchesToShow.map((church, idx) => (
            <Marker
              key={idx}
              position={[church.lat, church.lon]}
              icon={churchIcon}
              eventHandlers={{
                click: () => handleSelectChurch(church),
              }}
            >
              <Popup>{church.name}</Popup>
            </Marker>
          ))}
          {selectedChurch && userLocation && (
            <Marker
              position={userLocation}
              icon={rangeIndicatorIcon}
            >
              <Popup>
                {/* Implement or remove this line as necessary */}
                Distance to {selectedChurch.name}: {/* Add distance calculation here */}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold mr-4">Churches List:</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAllChurches}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span>Show All</span>
          </label>
        </div>
        <ul>
          {filteredChurches.map((church, idx) => (
            <li
              key={idx}
              className={`my-2 cursor-pointer ${selectedChurchName === church.name ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectChurch(church)}
            >
              <span className="font-semibold">{idx + 1}. {church.name}</span>
              <span className="ml-2 text-sm">{church.address}</span>
              <span className="ml-2 text-sm">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.nearest_mrt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  Nearest MRT: {church.nearest_mrt}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DistrictMap;
