import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import groceryList from "../../assets/data/groceries.json";
import ZoomControl from "../ZoomControl";

// Fix the default marker issue in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Groceries: React.FC = () => {
  const [showGroceryMapModal, setShowGroceryMapModal] = useState(false);

  return (
    <div>
      <div
        className="relative flex items-center justify-center flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
        onClick={() => setShowGroceryMapModal(true)} // Open grocery map modal on click
      >
        <img
          className="w-full h-[200px] object-cover rounded-lg cursor-pointer"
          src="/images/grocery.jpg"
          alt="Groceries"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Grocery Stores around Singapore
        </div>
      </div>

      {/* Grocery Map Modal */}
      {showGroceryMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-[90%] md:w-[50%] relative">
            <h3 className="text-xl font-bold mb-4">Grocery Store Location</h3>
            <MapContainer
              center={[1.3521, 103.8198]} // Coordinates of Singapore (example)
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl />
              {groceryList.map((grocery, index) => (
                <Marker key={index} position={[grocery.lat, grocery.lon]}>
                  <Popup>{grocery.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowGroceryMapModal(false)} // Ensure this is set to correct state updater
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groceries;
