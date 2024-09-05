import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import moneyImage from "../images/money.jpg";
import churchImage from "../images/church.jpg";
import groceryImage from "../images/grocery.jpg";
import restoImage from "../images/resto.jpg";

// Fix the default marker issue in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ZoomControl: React.FC = () => {
  const map = useMap();

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      map.zoomIn();
    } else {
      map.zoomOut();
    }
  };

  useEffect(() => {
    map.getContainer().addEventListener("wheel", handleWheel);
    return () => {
      map.getContainer().removeEventListener("wheel", handleWheel);
    };
  }, [map]);

  return null;
};

const churchList = [
  { lat: 1.2923774167588613, lon: 103.79640621557269, name: "Blessed Sacrament Church" },
  { lat: 1.2962300619799392, lon: 103.85107740149479, name: "Cathedral of the Good Shepherd" },
  { lat: 1.3619632529992378, lon: 103.85250074397304, name: "Christ the King" },
  { lat: 1.380544285306484, lon: 103.93611550033735, name: "Divine Mercy" },
  { lat: 1.3076969986875737, lon: 103.77072239323924, name: "Holy Cross" },
  { lat: 1.306727964226071, lon: 103.90701778115144, name: "Holy Family" },
  { lat: 1.3545714762552408, lon: 103.83347449811693, name: "Holy Spirit" },
  { lat: 1.3488734760537093, lon: 103.94939599699143, name: "Holy Trinity" },
  { lat: 1.3565182513742635, lon: 103.87762459972596, name: "Immaculate Heart of Mary" },
  { lat: 1.303168846297323, lon: 103.855770139173, name: "Lady of Lourdes" },
  { lat: 1.3735240758809044, lon: 103.89854231339955, name: "Nativity of the Blessed Virgin Mary" },
  { lat: 1.312215183627607, lon: 103.89364672504553, name: "Our Lady Queen of Peace" },
  { lat: 1.437331249477168, lon: 103.837590638539, name: "Our Lady Star of the Sea" },
  { lat: 1.3207219585329832, lon: 103.91872735388095, name: "Our Lady of Perpetual Succour" },
  { lat: 1.3348244171902885, lon: 103.85102857476613, name: "Risen Christ" },
  { lat: 1.2959803414673563, lon: 103.84375896922955, name: "Sacred Heart" },
  { lat: 1.321876623323244, lon: 103.8427681842609, name: "St Alphonsus(Novena Church)" },
  { lat: 1.3916533443499273, lon: 103.90172825242242, name: "St Anne's Church" },
  { lat: 1.4295862341669052, lon: 103.7796816675259, name: "St Anthony" },
  { lat: 1.2951387302225514, lon: 103.83050903476018, name: "St Bernadette" },
  { lat: 1.3610508068247114, lon: 103.86191988635655, name: "St Francis Xavier" },
  { lat: 1.3481437677309307, lon: 103.71114322653843, name: "St Francis of Assisi" },
  { lat: 1.317829944984357,  lon: 103.80569644478362, name: "St Ignatius" },
  { lat: 1.3683631110532846, lon: 103.76745369990567, name: "St Joseph's Church(Bukit Timah)" },
  { lat: 1.2985289377485232, lon: 103.853073153881, name: "St Joseph's Church(Victoria Street)" },
  { lat: 1.3475009160343834, lon: 103.75936936737475, name: "St Mary of the Angels" },
  { lat: 1.3263033687811867, lon: 103.86298932543087, name: "St Michael" },
  { lat: 1.3262072727368979, lon: 103.88334837492168, name: "St Stephen" },
  { lat: 1.2733468430644859, lon: 103.82810055276921, name: "St Teresa" },
  { lat: 1.3824542199269716, lon: 103.87609659535761, name: "St Vincent de Paul" },
  { lat: 1.2988802700160846, lon: 103.85324724290322, name: "Sts Peter and Paul" },
  { lat: 1.4067230522027319, lon: 103.90002734038688, name: "Transfiguration" },
];

const restaurantList = [
  { lat: 1.3216215267617406, lon: 103.84158145087599, name: "Lechon Republic Singapore" },
  // Add more restaurant data here as needed
];

const groceryList = [
  { lat: 1.3216215267617406, lon: 103.84158145087599, name: "Lechon Republic Singapore" },
  // Add more restaurant data here as needed
];

const Gallery: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showRestaurantMapModal, setShowRestaurantMapModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("PHP");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amountSGD, setAmountSGD] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredChurches, setFilteredChurches] = useState<{ lat: number; lon: number; name: string }[]>([]);
  const [showGroceryMapModal, setShowGroceryMapModal] = useState(false);

  
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/SGD");
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const fetchExchangeRate = async (currency: string) => {
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/SGD");
      const data = await response.json();
      const rate = data.rates[currency];
      setExchangeRate(rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const handleCurrencySelection = (currency: string) => {
    setSelectedCurrency(currency);
    fetchExchangeRate(currency);
    setShowCurrencySelector(false);
    setShowModal(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
      setShowCurrencySelector(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSGD(Number(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toUpperCase());
  };

  const filteredCurrencies = currencies.filter((currency) =>
    currency.toUpperCase().includes(searchQuery)
  );

  const convertedAmount = exchangeRate ? (amountSGD * exchangeRate).toFixed(2) : "...";

  return (
    <div className="w-full h-fit bg-[#7c3732] rounded-lg p-4 md:p-8 gap-4">
      <h2 className="text-white text-2xl font-extrabold mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 gap-2">
        {/* Card 1 */}
        <div
          className="relative flex items-center justify-center flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => setShowCurrencySelector(true)}
        >
          <img
            className="w-80 h-80 object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            src={moneyImage}
            alt="Gallery Image 1"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            SGD Coin Converter
          </div>
        </div>
        {/* Card 2 */}
        <div
          className="relative flex items-center justify-center flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => setShowMapModal(true)}
        >
          <img
            className="w-80 h-80 object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            src={churchImage}
            alt="Gallery Image 2"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Catholic Churches around Singapore
          </div>
        </div>
        {/* Card 3 */}
        <div
          className="relative flex items-center justify-center flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => setShowRestaurantMapModal(true)}
        >
          <img
            className="w-80 h-80 object-cover rounded-lg cursor-pointer"
            src={restoImage}
            alt="Gallery Image 3"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Restaurants around Singapore
          </div>
        </div>
        {/* Card 4 */}
        <div
          className="relative flex items-center justify-center flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => setShowGroceryMapModal(true)}
        >
          <img
            className="w-80 h-80 object-cover rounded-lg cursor-pointer"
            src={groceryImage}
            alt="Gallery Image 4"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Grocery Stores around Singapore
          </div>
        </div>
      </div>

      {/* Currency Selection Modal */}
      {showCurrencySelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Select a Currency</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search currencies..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <ul className="max-h-60 overflow-y-auto">
              {filteredCurrencies.map((currency) => (
                <li
                  key={currency}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleCurrencySelection(currency)}
                >
                  {currency}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={() => {
                setShowCurrencySelector(false);
                setSearchQuery("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Exchange Rate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg w-96 relative shadow-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold mb-4">Exchange Rate</h3>
            <div className="mb-4">
              <label className="block text-lg mb-2">Amount in SGD</label>
              <input
                type="number"
                value={amountSGD}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <p className="text-lg mb-6">
              {exchangeRate ? `1 SGD = ${exchangeRate} ${selectedCurrency}` : "Loading exchange rate..."}
            </p>
            <p className="text-lg mb-6">
              {exchangeRate ? `${amountSGD} SGD = ${convertedAmount} ${selectedCurrency}` : ""}
            </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowModal(false);
                setSearchQuery("");
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* OpenStreetMap Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-[90%] md:w-[50%] relative">
            <h3 className="text-xl font-bold mb-4">Church Location</h3>
            <MapContainer
              center={[1.3521, 103.8198]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl />
              {/* Display only churches */}
              {churchList.map((church, idx) => (
                <Marker key={idx} position={[church.lat, church.lon]}>
                  <Popup>{church.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowMapModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Restaurant Map Modal */}
      {showRestaurantMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-[90%] md:w-[50%] relative">
            <h3 className="text-xl font-bold mb-4">Restaurant Location</h3>
            <MapContainer
              center={[1.3521, 103.8198]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl />
              {restaurantList.map((restaurant, index) => (
                <Marker key={index} position={[restaurant.lat, restaurant.lon]}>
                  <Popup>{restaurant.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowRestaurantMapModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Grocery Map Modal */}
      {showGroceryMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-2 rounded-lg w-[90%] md:w-[50%] relative">
            <h3 className="text-xl font-bold mb-4">Grocery Store Location</h3>
            <MapContainer
              center={[1.3521, 103.8198]}
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
              onClick={() => setShowGroceryMapModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
