import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapProviderInfo from "./MapProviderInfo";

// Create custom icons using simple circle markers for maximum reliability
const createCustomIcon = (severity: string) => {
  // Use simple colored circles that don't depend on external resources
  let color = "#3b82f6"; // blue default
  let borderColor = "#ffffff";
  let emoji = "⚠️";

  if (severity === "high") {
    color = "#dc2626"; // darker red for better visibility
    emoji = "🚨";
  } else if (severity === "medium") {
    color = "#f59e0b"; // amber/orange
    emoji = "⚠️";
  } else if (severity === "low") {
    color = "#eab308"; // yellow
    emoji = "🔸";
  }

  // Create a very simple and reliable marker
  const icon = L.divIcon({
    html: `<div style="
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      background-color: ${color};
      border: 2px solid ${borderColor};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      cursor: pointer;
      z-index: 1000;
    ">
      <span style="color: white; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.5);">${emoji}</span>
    </div>`,
    className: `simple-incident-marker severity-${severity}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  return icon;
};

// Create user location icon
const createUserLocationIcon = () => {
  return L.divIcon({
    html: `<div style="
      background-color: #3b82f6;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.4);
      position: relative;
    "></div>`,
    className: "user-location-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
};

// Realistic mock data for Lima, Peru with accurate and well-distributed coordinates
const limaIncidents = [
  {
    id: 1,
    lat: -12.0464, // Plaza de Armas, Lima Centro
    lng: -77.0428,
    type: "Robo",
    severity: "high",
    time: "Hace 15 min",
    district: "Cercado de Lima",
    address: "Jr. de la Unión 300",
  },
  {
    id: 2,
    lat: -12.1197, // Miraflores - Parque Kennedy (más al sur)
    lng: -77.031,
    type: "Asalto",
    severity: "high",
    time: "Hace 32 min",
    district: "Miraflores",
    address: "Av. Larco 1200",
  },
  {
    id: 3,
    lat: -12.0736, // La Victoria - Gamarra (más al este)
    lng: -77.0194,
    type: "Hurto",
    severity: "medium",
    time: "Hace 1 hora",
    district: "La Victoria",
    address: "Av. Aviación 2500",
  },
  {
    id: 4,
    lat: -12.0278, // Rímac - Cerro San Cristóbal (más al norte)
    lng: -77.0414,
    type: "Vandalismo",
    severity: "low",
    time: "Hace 2 horas",
    district: "Rímac",
    address: "Jr. Trujillo 800",
  },
  {
    id: 5,
    lat: -12.0969, // San Isidro - Distrito Financiero
    lng: -77.0365,
    type: "Robo de vehículo",
    severity: "high",
    time: "Hace 45 min",
    district: "San Isidro",
    address: "Av. Javier Prado 1500",
  },
  {
    id: 6,
    lat: -12.0522, // Breña - Av. Brasil (más al oeste)
    lng: -77.0661,
    type: "Estafa",
    severity: "low",
    time: "Hace 3 horas",
    district: "Breña",
    address: "Av. Brasil 1200",
  },
  {
    id: 7,
    lat: -12.1414, // Barranco - Bajada de Baños (sur de Lima)
    lng: -77.0206,
    type: "Robo",
    severity: "medium",
    time: "Hace 1.5 horas",
    district: "Barranco",
    address: "Bajada de Baños 340",
  },
  {
    id: 8,
    lat: -12.0175, // Independencia - Norte de Lima
    lng: -77.0661,
    type: "Asalto",
    severity: "high",
    time: "Hace 20 min",
    district: "Independencia",
    address: "Av. Túpac Amaru 3500",
  },
  {
    id: 9,
    lat: -12.1681, // Chorrillos - Sur de Lima
    lng: -77.0181,
    type: "Hurto",
    severity: "medium",
    time: "Hace 50 min",
    district: "Chorrillos",
    address: "Av. Huaylas 1200",
  },
];

// Safe routes with real Lima coordinates - better distributed
const safeRoutes = [
  {
    id: 1,
    name: "Centro → Miraflores (Segura)",
    safety: 95,
    time: "25 min",
    coordinates: [
      [-12.0464, -77.0428], // Centro de Lima
      [-12.08, -77.038], // Punto intermedio (San Isidro)
      [-12.1197, -77.031], // Miraflores
    ],
  },
  {
    id: 2,
    name: "San Isidro → Barranco",
    safety: 92,
    time: "15 min",
    coordinates: [
      [-12.0969, -77.0365], // San Isidro
      [-12.118, -77.0285], // Punto intermedio
      [-12.1414, -77.0206], // Barranco
    ],
  },
  {
    id: 3,
    name: "Rímac → La Victoria",
    safety: 78,
    time: "20 min",
    coordinates: [
      [-12.0278, -77.0414], // Rímac
      [-12.052, -77.029], // Punto intermedio
      [-12.0736, -77.0194], // La Victoria
    ],
  },
];

// Map tile providers
const mapProviders = {
  openstreet: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

export const MapDemoFixed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIncidents, setActiveIncidents] = useState(24);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"incidents" | "heatmap" | "routes">(
    "incidents"
  );
  const [mapProvider, setMapProvider] = useState<
    "openstreet" | "satellite" | "dark"
  >("openstreet");
  const [showRealTime, setShowRealTime] = useState(true);
  const [showProviderInfo, setShowProviderInfo] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  // Simulate user location in Lima (Miraflores area for demo)
  const simulateUserLocation = () => {
    const locations = [
      { lat: -12.1167, lng: -77.0347, name: "Miraflores" },
      { lat: -12.0972, lng: -77.0364, name: "Barranco" },
      { lat: -12.1058, lng: -77.0348, name: "San Isidro" },
    ];
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    setUserLocation(randomLocation);
  };

  useEffect(() => {
    // Fix Leaflet default icons for React (only on client)
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    }
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate real-time incident updates
    const incidentTimer = setInterval(() => {
      if (showRealTime) {
        setActiveIncidents((prev) => prev + Math.floor(Math.random() * 3) - 1);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(incidentTimer);
    };
  }, [showRealTime]);

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "Alto";
      case "medium":
        return "Medio";
      case "low":
        return "Bajo";
      default:
        return "Desconocido";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] relative bg-slate-900 rounded-lg overflow-hidden border border-gray-700">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-500 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-white/90 text-lg font-medium">
              Cargando mapa real de Lima...
            </p>
            <p className="text-white/60 text-sm mt-2">
              Conectando con OpenStreetMap
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
      {" "}
      {/* Real Map with React Leaflet */}
      <MapContainer
        center={[-12.0764, -77.0395]} // Centro más ajustado para Lima metropolitana
        zoom={11} // Zoom reducido para ver mejor distribución        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url={mapProviders[mapProvider].url}
          attribution={mapProviders[mapProvider].attribution}
        />{" "}
        {/* Incident markers */}{" "}
        {viewMode === "incidents" &&
          limaIncidents.map((incident, index) => {
            const icon = createCustomIcon(incident.severity);

            return (
              <Marker
                key={`incident-${incident.id}`}
                position={[incident.lat, incident.lng]}
                icon={icon}
                eventHandlers={{
                  click: (e) => {
                    setSelectedIncident(incident);
                  },
                  add: (e) => {
                    // Marker added to map
                  },
                  mouseover: (e) => {
                    // Marker hover event
                  },
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {incident.type}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Zona:</strong> {incident.district}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Dirección:</strong> {incident.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Riesgo:</strong>{" "}
                      <span
                        className={`font-medium ${
                          incident.severity === "high"
                            ? "text-red-600"
                            : incident.severity === "medium"
                              ? "text-yellow-600"
                              : "text-orange-600"
                        }`}
                      >
                        {getSeverityText(incident.severity)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Reportado:</strong> {incident.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Coordenadas:</strong> {incident.lat.toFixed(4)},{" "}
                      {incident.lng.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        {/* Heat map circles */}
        {viewMode === "heatmap" &&
          limaIncidents.map((incident) => (
            <Circle
              key={`heatmap-${incident.id}`}
              center={[incident.lat, incident.lng]}
              radius={
                incident.severity === "high"
                  ? 800
                  : incident.severity === "medium"
                    ? 500
                    : 300
              }
              fillColor={
                incident.severity === "high"
                  ? "#ef4444"
                  : incident.severity === "medium"
                    ? "#f59e0b"
                    : "#f97316"
              }
              fillOpacity={0.4}
              stroke={false}
            />
          ))}
        {/* Safe routes */}
        {viewMode === "routes" &&
          safeRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.coordinates as [number, number][]}
              color={route.safety > 90 ? "#10b981" : "#f59e0b"}
              weight={4}
              opacity={0.8}
              dashArray={route.safety > 90 ? undefined : "10, 5"}
            />
          ))}
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createUserLocationIcon()}
          >
            <Popup>
              <div className="p-2 text-center">
                <h3 className="font-bold text-blue-900 mb-1">Tu ubicación</h3>
                <p className="text-sm text-gray-600">{userLocation.name}</p>
              </div>
            </Popup>
          </Marker>
        )}{" "}
      </MapContainer>
      {/* Map provider selector */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex items-center space-x-1">
            {Object.entries(mapProviders).map(([key, provider]) => (
              <button
                key={key}
                onClick={() => setMapProvider(key as keyof typeof mapProviders)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  mapProvider === key
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {key === "openstreet"
                  ? "Calles"
                  : key === "satellite"
                    ? "Satélite"
                    : "Oscuro"}
              </button>
            ))}
            <div className="border-l border-gray-300 pl-1">
              <button
                onClick={() => setShowProviderInfo(true)}
                className="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all"
                title="Información sobre proveedores de mapas"
              >
                ℹ️
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mode selector */}
      <div className="absolute top-16 left-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex flex-col space-y-1">
            {[
              { mode: "incidents", label: "Incidentes", icon: "🚨" },
              { mode: "heatmap", label: "Mapa de Calor", icon: "🔥" },
              { mode: "routes", label: "Rutas Seguras", icon: "🛣️" },
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode as any)}
                className={`px-3 py-2 rounded text-xs font-medium transition-all text-left ${
                  viewMode === item.mode
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Live stats */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg min-w-[200px] z-[1000]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-gray-800">
            📊 Lima en Tiempo Real
          </h3>
          <button
            onClick={() => setShowRealTime(!showRealTime)}
            className={`w-8 h-4 rounded-full transition-all relative ${
              showRealTime ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 bg-white rounded-full transition-all absolute top-0.5 ${
                showRealTime ? "translate-x-4" : "translate-x-0.5"
              }`}
            ></div>
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
              Incidentes activos
            </span>
            <span className="font-bold text-gray-800">{activeIncidents}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Rutas seguras
            </span>
            <span className="font-bold text-gray-800">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Usuarios en línea
            </span>
            <span className="font-bold text-gray-800">1.2K</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-green-600">
          ✅ OpenStreetMap - Tiempo real
        </div>
      </div>
      {/* Legend */}
      <div className="absolute bottom-20 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]">
        <h4 className="font-bold text-sm mb-3 text-gray-800">🗺️ Leyenda</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-gray-600">Alto riesgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-gray-600">Riesgo medio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-gray-600">Riesgo bajo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-green-500 rounded"></div>
            <span className="text-gray-600">Ruta segura</span>
          </div>
        </div>
      </div>
      {/* Status text */}
      <div className="absolute bottom-4 right-4 z-[1010]">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <p className="text-xs text-gray-600">
            🌍 Datos en tiempo real - Lima, Perú
          </p>
        </div>
      </div>
      {/* Routes panel */}
      {viewMode === "routes" && (
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs z-[1000] mr-40">
          <h4 className="font-bold text-sm mb-3 text-gray-800">
            🛣️ Rutas Disponibles
          </h4>
          <div className="space-y-2">
            {safeRoutes.map((route) => (
              <div key={route.id} className="bg-gray-50 rounded p-2 text-xs">
                <div className="font-medium text-gray-800">{route.name}</div>
                <div className="flex justify-between mt-1 text-gray-600">
                  <span>Seguridad: {route.safety}%</span>
                  <span>{route.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}{" "}
      {/* User location simulator */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <button
          onClick={simulateUserLocation}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all shadow-lg"
        >
          📍 Simular mi ubicación
        </button>
      </div>
      {/* Map Provider Info Modal */}
      <MapProviderInfo
        isOpen={showProviderInfo}
        onClose={() => setShowProviderInfo(false)}
      />
    </div>
  );
};

export default MapDemoFixed;
