import React, { useState } from "react";

interface MapProviderInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const mapProviderDetails = {
  openstreet: {
    name: "OpenStreetMap",
    description:
      "Mapas colaborativos de código abierto con datos actualizados por la comunidad global",
    features: [
      "Datos de calles actualizados por usuarios",
      "Información detallada de Lima y Perú",
      "Gratuito y de código abierto",
      "Actualizaciones constantes de la comunidad",
    ],
    coverage: "100% Lima metropolitana",
    updateFrequency: "Tiempo real",
  },
  satellite: {
    name: "Imágenes Satelitales",
    description:
      "Vista satelital de alta resolución para mejor contexto geográfico",
    features: [
      "Imágenes de alta resolución",
      "Vista aérea real de Lima",
      "Identificación de edificios y estructuras",
      "Contexto geográfico completo",
    ],
    coverage: "Global - resolución 1m",
    updateFrequency: "Mensual",
  },
  dark: {
    name: "Modo Oscuro",
    description:
      "Diseño elegante que resalta los datos de seguridad con mejor contraste",
    features: [
      "Mejor contraste para datos",
      "Reduce fatiga visual nocturna",
      "Resalta marcadores de incidentes",
      "Diseño moderno y profesional",
    ],
    coverage: "100% cobertura global",
    updateFrequency: "Tiempo real",
  },
};

const MapProviderInfo: React.FC<MapProviderInfoProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedProvider, setSelectedProvider] =
    useState<keyof typeof mapProviderDetails>("openstreet");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            🗺️ Proveedores de Mapas
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            SafeMap utiliza múltiples proveedores de mapas para ofrecerte la
            mejor experiencia:
          </p>
        </div>

        <div className="flex space-x-2 mb-4">
          {Object.entries(mapProviderDetails).map(([key, provider]) => (
            <button
              key={key}
              onClick={() =>
                setSelectedProvider(key as keyof typeof mapProviderDetails)
              }
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                selectedProvider === key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {provider.name}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2">
            {mapProviderDetails[selectedProvider].name}
          </h3>
          <p className="text-gray-600 mb-4">
            {mapProviderDetails[selectedProvider].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                ✅ Características:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {mapProviderDetails[selectedProvider].features.map(
                  (feature, index) => (
                    <li key={index}>• {feature}</li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                📊 Detalles Técnicos:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Cobertura:</strong>{" "}
                  {mapProviderDetails[selectedProvider].coverage}
                </p>
                <p>
                  <strong>Actualización:</strong>{" "}
                  {mapProviderDetails[selectedProvider].updateFrequency}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-700 text-sm">
              💡 <strong>Tip:</strong> Cambia entre proveedores según tus
              necesidades - usa calles para navegación, satélite para contexto y
              modo oscuro para análisis nocturno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapProviderInfo;
