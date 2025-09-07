import { useState, useEffect } from "react";
import { Activity, AlertTriangle, DollarSign, MapPin, Search, Eye, Wrench, Plus, Minus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "../../lib/supabaseClient";

// Fixe le bug des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Constants pour la page d'accueil
const MAP_POSITIONS = [
  { x: "45%", y: "40%" }, { x: "52%", y: "55%" }, { x: "38%", y: "48%" },
  { x: "58%", y: "42%" }, { x: "30%", y: "70%" }, { x: "65%", y: "60%" },
  { x: "70%", y: "35%" }, { x: "75%", y: "65%" }, { x: "25%", y: "35%" },
  { x: "60%", y: "25%" }
];

const DISTRICTS = [
  { name: "Yoff", style: { left: "20%", top: "30%" } },
  { name: "Parcelles Assainies", style: { left: "35%", top: "25%" } },
  { name: "Centre-ville", style: { left: "45%", top: "50%" } },
  { name: "Médina", style: { left: "60%", top: "70%" } },
  { name: "Plateau", style: { left: "75%", top: "45%" } },
  { name: "Grand Yoff", style: { left: "65%", top: "25%" } }
];

// Utility Functions
const getFilterState = (filterStatus, filterHealth) => {
  if (filterStatus === "REPLACE" || filterHealth < 30) {
    return { label: "À remplacer", className: "bg-red-100 text-red-600" };
  }
  if (filterStatus === "FAILED" || filterHealth < 10) {
    return { label: "Défaillant", className: "bg-red-100 text-red-600" };
  }
  if (filterHealth >= 80) {
    return { label: "Bon état", className: "bg-green-100 text-green-600" };
  }
  return { label: "Moyen", className: "bg-yellow-100 text-yellow-600" };
};

const getMarkerPosition = (index) => MAP_POSITIONS[index % MAP_POSITIONS.length] || { x: "50%", y: "50%" };

const isToday = (date) => {
  if (!date) return false;
  const today = new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0] === today;
};

const filterDistributors = (distributors, searchTerm) => {
  if (!searchTerm) return distributors;
  return distributors.filter(d =>
    [d.name, d.location, d.code].some(field => 
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

// Components
const KPICard = ({ title, value, subtitle, icon: Icon, gradient, borderColor }) => (
  <div className={`bg-white rounded-lg shadow-lg border-l-4 ${borderColor} p-6`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-3xl font-bold ${value.color}`}>{value.main}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
        {value.secondary && (
          <>
            <p className={`text-xl font-bold ${value.color} mt-2`}>{value.secondary}</p>
            <p className="text-xs text-gray-500">{value.secondaryLabel}</p>
          </>
        )}
      </div>
      <div className={`${gradient} p-3 rounded-full`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
    </div>
  </div>
);

const DistributorRow = ({ distributor }) => {
  const isActive = distributor.active || distributor.status === "active";
  const volumePercentage = distributor.capacity > 0 ? 
    Math.min(((distributor.volume || 0) / distributor.capacity) * 100, 100) : 0;
  const filterState = getFilterState(distributor.filter_status, distributor.filter_health);

  return (
    <tr className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
      <td className="py-4 px-6">
        <span className="font-mono text-purple-600 font-medium">
          {distributor.code || `D-${String(distributor.id).padStart(3, '0')}`}
        </span>
      </td>
      <td className="py-4 px-6">
        <div>
          <p className="font-medium text-gray-900">{distributor.name}</p>
          <p className="text-sm text-gray-500">{distributor.location}</p>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}>
          {isActive ? "Actif" : "Inactif"}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${
              volumePercentage > 70 ? "text-green-600" : 
              volumePercentage > 30 ? "text-yellow-600" : "text-red-600"
            }`}>
              {distributor.volume || 0}L / {distributor.capacity || 0}L
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${volumePercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right">
            {volumePercentage.toFixed(0)}%
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${filterState.className}`}>
          {filterState.label}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-purple-100 rounded transition-colors" title="Voir les détails">
            <Eye size={18} className="text-gray-600" />
          </button>
          <button className="p-1 hover:bg-purple-100 rounded transition-colors" title="Maintenance">
            <Wrench size={18} className="text-gray-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Page principale Accueil
export default function AccueilPage({ waterPoints, payments, iotData, loading, onRefresh }) {
  const [showAllDistributors, setShowAllDistributors] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [distributors, setDistributors] = useState([]);

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
          )
          .order("created_at", { ascending: false, foreignTable: "iot_readings" });
  
        if (error) throw error;
  
        const enriched = data.map((wp) => {
          const lastReading = wp.iot_readings?.[0] || {};
          return {
            ...wp,
            name: wp.community || `Distributeur ${wp.id}`,
            location: wp.community,
            volume: lastReading.volume_l || 0,
            capacity: 100, // valeur fixe pour l'instant
            filter_health: lastReading.filter_health || "N/A",
            turbidity: lastReading.turbidity || null,
            battery: lastReading.battery || null,
            active: lastReading.battery > 20, // actif si batterie OK
          };
        });
  
        setDistributors(enriched);
      } catch (err) {
        console.error("Erreur récupération MapView:", err);
      }
    }
  
    if (loading) {
      return <p className="p-6 text-gray-500">Chargement de la carte...</p>;
    }

  // Calculs des KPI - CORRIGÉ : utilise distributors au lieu de waterPoints
  const kpiData = {
    filtersToReplace: distributors.filter(w => 
      w.filter_status === "REPLACE" || (w.filter_health && w.filter_health < 30)
    ).length,
    totalVolumeDistributed: iotData.reduce((acc, r) => acc + (r.volume_l || 0), 0),
    todayPayments: payments.filter(p => isToday(p.created_at || p.date)).length,
    totalRevenue: payments.reduce((acc, p) => acc + (p.amount || 0), 0)
  };

  // CORRIGÉ : utilise distributors au lieu de waterPoints
  const filteredDistributors = filterDistributors(distributors, searchTerm);
  const displayedDistributors = showAllDistributors ? filteredDistributors : filteredDistributors.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">O'SEN-Ndoxmusell</h2>
        <div className="w-24 h-1 bg-white/30 mx-auto"></div>
      </div>

      {/* KPI Cards - CORRIGÉ : utilise distributors.length */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Distributeurs Actifs"
          value={{ main: distributors.length, color: "text-green-600" }}
          subtitle={`sur ${distributors.length} total`}
          icon={Activity}
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          borderColor="border-l-green-500"
        />
        <KPICard
          title="Interventions Récentes"
          value={{ 
            main: kpiData.filtersToReplace, 
            color: "text-orange-600",
            secondary: `${kpiData.totalVolumeDistributed} L`,
            secondaryLabel: "volume total distribué"
          }}
          subtitle="filtres à remplacer"
          icon={AlertTriangle}
          gradient="bg-gradient-to-r from-orange-500 to-red-500"
          borderColor="border-l-orange-500"
        />
        <KPICard
          title="Transactions du Jour"
          value={{ main: kpiData.todayPayments, color: "text-blue-600" }}
          subtitle={`${kpiData.totalRevenue.toLocaleString()} FCFA estimés`}
          icon={DollarSign}
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          borderColor="border-l-blue-500"
        />
      </div>

      {/* Section Carte GPS avec MapContainer - CORRIGÉ : utilise distributors.length */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">Réseau de Distribution - Dakar ({distributors.length} points)</span>
          </div>
        </div>
        <div className="p-0">
          <div className="h-96 w-full">
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
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Actifs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Inactifs</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* CORRIGÉ : utilise distributors.length */}
                  <span className="text-purple-600 font-medium">⚡ Total: {distributors.length}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                Cliquez sur un marqueur pour plus d'infos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des Distributeurs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Liste des Distributeurs</h2>
            <button className="flex items-center px-3 py-1.5 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 text-sm transition-colors">
              <MapPin className="h-4 w-4 mr-2" />
              Vue Carte
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un distributeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b border-purple-100">
                <th className="py-3 px-6 font-medium text-gray-700">ID</th>
                <th className="py-3 px-6 font-medium text-gray-700">
                  Nom & Localisation
                </th>
                <th className="py-3 px-6 font-medium text-gray-700">Statut</th>
                <th className="py-3 px-6 font-medium text-gray-700">Volume</th>
                <th className="py-3 px-6 font-medium text-gray-700">
                  État Filtre
                </th>
                <th className="py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedDistributors.length > 0 ? (
                displayedDistributors.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-purple-600 font-medium">
                        D-{String(d.id).slice(0, 8)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{d.name}</p>
                        <p className="text-sm text-gray-500">{d.location}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          d.active
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {d.active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span
                          className={`text-sm font-medium ${
                            d.capacity > 0 && d.volume / d.capacity > 0.7
                              ? "text-green-600"
                              : d.capacity > 0 && d.volume / d.capacity > 0.3
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {d.volume}L / {d.capacity}L
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all"
                            style={{
                              width: `${
                                d.capacity > 0
                                  ? Math.min((d.volume / d.capacity) * 100, 100)
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          {d.capacity > 0
                            ? ((d.volume / d.capacity) * 100).toFixed(0)
                            : 0}
                          %
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {(() => {
                        const filter = getFilterState(
                          d.filter_status,
                          d.filter_health
                        );
                        return (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${filter.className}`}
                          >
                            {filter.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 hover:bg-purple-100 rounded transition-colors"
                          title="Voir les détails"
                        >
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-purple-100 rounded transition-colors"
                          title="Maintenance"
                        >
                          <Wrench size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 px-6 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "Aucun distributeur trouvé"
                      : "Aucun distributeur disponible"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredDistributors.length > 8 && (
          <div className="p-6 border-t border-gray-200 text-center">
            <button
              onClick={() => setShowAllDistributors(!showAllDistributors)}
              className="px-4 py-2 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors flex items-center mx-auto"
            >
            {showAllDistributors ? (
              <>
                <Minus className="h-4 w-4 mr-2" />
                Afficher moins
              </>
              ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Voir tous les distributeurs ({filteredDistributors.length})
              </>
            )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}