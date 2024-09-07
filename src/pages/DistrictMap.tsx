import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import churchList from "../assets/data/churches.json";
import ZoomControl from "../components/ZoomControl";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DistrictMap: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const district = params.get("district");

  const districts = Array.from(new Set(churchList.map((church) => church.district)));

  const filteredChurches = district === "All Churches"
    ? churchList
    : churchList.filter((church) => church.district === district);

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = event.target.value;
    navigate(`/district-map?district=${encodeURIComponent(selectedDistrict)}`);
  };

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
          {/* Display filtered churches */}
          {filteredChurches.map((church, idx) => (
            <Marker key={idx} position={[church.lat, church.lon]}>
              <Popup>{church.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Display church details below the map */}
      <div className="p-4">
        <h2 className="text-lg font-bold">Churches List:</h2>
        <ul>
          {filteredChurches.map((church, idx) => (
            <li key={idx} className="my-2">
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
