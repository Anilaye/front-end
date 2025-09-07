import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "../../lib/supabaseClient";
import "/src/index.css";

// Fixe le bug des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapView = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaterPoints();
  }, []);

  async function fetchWaterPoints() {
    try {
      let { data, error } = await supabase
        .from("water_points")
        .select(
          `
          id,
          latitude,
          longitude,
          community,
          filter_status,
          iot_readings (
            id,
            created_at,
            volume_l,
            turbidity,
            battery,
            filter_health
          )
        `
        );

      if (error) throw error;

      const enriched = data.map((wp) => {
        const lastReading = wp.iot_readings?.[0] || {};
        return {
          ...wp,
          name: wp.community || `Distributeur ${wp.id}`,
          volume: lastReading.volume_l || 0,
          filter_health: lastReading.filter_health || "N/A",
          turbidity: lastReading.turbidity || null,
          battery: lastReading.battery || null,
          active: lastReading.battery > 20, // actif si batterie OK
        };
      });

      setDistributors(enriched);
    } catch (err) {
      console.error("Erreur récupération MapView:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-500">Chargement de la carte...</p>;
  }

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
              <h2 className="text-xl font-semibold mb-4">Vue Carte des Distributeurs</h2>
              <MapContainer
                  center={[14.6937, -17.4441]} // par défaut Dakar
                  zoom={12}
                  style={{ height: "600px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {distributors.map((d) => (
                    <Marker key={d.id} position={[d.latitude, d.longitude]}>
                      <Popup>
                        <div className="space-y-2">
                          <h3 className="font-bold text-purple-700">{d.name}</h3>
                          <p className="text-sm text-gray-600">Localisation: {d.community}</p>
                          <p
                            className={`text-sm font-medium ${
                              d.active ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            Statut: {d.active ? "Actif" : "Inactif"}
                          </p>
                          <p className="text-sm">
                            Volume: <span className="font-medium">{d.volume} L</span>
                          </p>
                          <p className="text-sm">
                            Turbidité:{" "}
                            <span className="font-medium">
                              {d.turbidity !== null ? d.turbidity : "N/A"}
                            </span>
                          </p>
                          <p className="text-sm">
                            Batterie:{" "}
                            <span
                              className={`font-medium ${
                                d.battery > 30
                                  ? "text-green-600"
                                  : d.battery > 15
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {d.battery !== null ? `${d.battery}%` : "N/A"}
                            </span>
                          </p>
                          <p className="text-sm">
                            État filtre:{" "}
                            <span className="font-medium">{d.filter_status}</span>
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  
  
  );
};

export default MapView;