import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Search, Filter, MapPin, Eye, Wrench, Plus, Minus } from "lucide-react";


const DistributorList = () => {
  const [waterPoints, setWaterPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAllDistributors, setShowAllDistributors] = useState(false);

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
          last_maintenance,
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
          capacity: 100, // valeur fixe pour l'instant (à remplacer si tu ajoutes une colonne en BDD)
          filter_health: lastReading.filter_health || "N/A",
          turbidity: lastReading.turbidity || null,
          battery: lastReading.battery || null,
          active: lastReading.battery > 20, // logique pour considérer actif
        };
      });

      setWaterPoints(enriched);
    } catch (err) {
      console.error("Erreur de connexion:", err);
    } finally {
      setLoading(false);
    }
  }

  const getFilterState = (filterStatus, filterHealth) => {
    if (filterStatus === "REPLACE" || filterHealth < 30) {
      return { label: "À remplacer", className: "bg-red-100 text-red-600" };
    }
    if (filterStatus === "FAILED" || filterHealth < 10) {
      return { label: "Défaillant", className: "bg-red-100 text-red-600" };
    }
    if (filterHealth >= 80 || filterStatus === "OK") {
      return { label: "Bon état", className: "bg-green-100 text-green-600" };
    }
    return { label: "Moyen", className: "bg-yellow-100 text-yellow-600" };
  };

  // Filtrage
  const filteredDistributors = waterPoints.filter((d) => {
    const matchesSearch =
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id?.toString().toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? d.active
        : !d.active;

    return matchesSearch && matchesStatus;
  });

  const displayedDistributors = showAllDistributors
    ? filteredDistributors
    : filteredDistributors.slice(0, 8);

   // Calculs dynamiques des statistiques
  const activeCount = waterPoints.filter(d => d.active === true).length;
  const inactiveCount = waterPoints.filter(d => d.active === false).length;
  const filtersToChange = waterPoints.filter(d => d.filter_state !== 'Bon état').length;
  const averageDaily = waterPoints.length > 0 
    ? Math.round(waterPoints.reduce((acc, d) => acc + (d.daily_average || 0), 0) / waterPoints.length)
    : 0;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Liste des distributeurs - Dakar
        </h1>
        <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <MapPin className="h-4 w-4 mr-2" />
          Vue Carte
        </button>
      </div>

      {/* Recherche et filtre */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher un distributeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs uniquement</option>
                <option value="inactive">Inactifs uniquement</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
          <p className="text-sm text-gray-600 mt-1">Distributeurs actifs</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-red-600">{inactiveCount}</p>
          <p className="text-sm text-gray-600 mt-1">Distributeurs inactifs</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-orange-600">{filtersToChange}</p>
          <p className="text-sm text-gray-600 mt-1">Filtres à changer</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">{averageDaily}L</p>
          <p className="text-sm text-gray-600 mt-1">Moyenne quotidienne</p>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Distributeurs</h2>
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
};

export default DistributorList;