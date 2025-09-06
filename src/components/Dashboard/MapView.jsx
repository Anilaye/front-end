import React from "react";
import { Droplets, Activity, AlertTriangle, Filter, Maximize, RefreshCw, Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "/src/index.css";


export default function MapView({ points }) {
  if (!points || points.length === 0) {
    return <p className="text-gray-500">Aucun point d’eau disponible.</p>;
  }

  const DefaultIcon = L.Icon.Default;
  DefaultIcon.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      <div className="anilaye-card border-purple-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Carte Interactive des Distributeurs
              </h1>
              <p className="text-purple-600 font-medium">
                Localisation et surveillance en temps réel - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Vue géographique du réseau de distribution d'eau Anilaye
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                {/* <MapPin className="h-6 w-6 text-white" /> */}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Distributeurs actifs</p>
                {/* <p className="font-semibold text-green-600">{waterPoints.active}/{waterPoints.total}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="anilaye-card border-purple-100">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-medium text-gray-900">Contrôles de la carte</h3>
              <div className="flex items-center space-x-2">
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
        </button>
        <button variant="outline" size="sm">
          <Maximize className="h-4 w-4 mr-2" />
          Plein écran
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="anilaye-card border-purple-200">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <span>Réseau de Distribution - Dakar</span>
              </div>
            </div>
            <div className="p-0">
              <div className="h-[600px]">
                <MapContainer
                  center={[14.6928, -17.4467]} // Dakar par défaut
                  zoom={12}
                  className="h-full w-full rounded"
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {points.map((p) => (
                    <Marker key={p.id} position={[p.latitude, p.longitude]}>
                      <Popup>
                        <div className="font-bold">{p.name}</div>
                        <p>Commune : {p.community}</p>
                        <p>État filtre : {p.filter_status}</p>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                {/* <InteractiveMap
                  distributors={distributors}
                  onDistributorSelect={onDistributorSelect}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
