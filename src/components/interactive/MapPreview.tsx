import React from "react";

const MapPreview: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden border border-gray-300 group cursor-pointer transition-all duration-300 hover:shadow-xl">
      {/* Preview Background with Mock Map */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Mock Street Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 400"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Mock Incident Points */}
        <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        <div className="absolute top-32 right-24 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-32 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse delay-200"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>

        {/* Mock Safe Route */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 350 Q 200 300 350 100"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
            className="opacity-60"
          />
        </svg>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
        <div className="text-center text-white p-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Mapa Interactivo de Seguridad
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-md">
            Explora incidentes en tiempo real, rutas seguras y análisis de
            riesgo en Lima
          </p>
          <button
            onClick={() => window.open("/demo", "_blank")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Abrir Demo Interactivo</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-gray-700">9 Incidentes</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-700">3 Rutas Seguras</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-700">Lima, Perú</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;
