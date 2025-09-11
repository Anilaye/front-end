import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Search, Filter, MapPin, Eye, Wrench, Plus, Minus } from "lucide-react";
// import { useDistributors } from "../../hooks/useDistributors";

/**
 * DistributorList
 * - récupère water_points et iot_readings (toutes les lectures)
 * - construit la dernière lecture par point (latestReadingByPoint)
 * - enrichit les water_points
 * - calcule active basé d'abord sur filter_status/filter_health puis fallback battery
 */
export default function DistributorList() {
  //  const { distributors } = useDistributors();
  const [waterPoints, setWaterPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAllDistributors, setShowAllDistributors] = useState(false);

  useEffect(() => {
    fetchAndEnrich();
  }, []);

  async function fetchAndEnrich() {
    setLoading(true);
    try {
      const [{ data: wps, error: e1 }, { data: readings, error: e2 }] =
        await Promise.all([
          supabase.from("water_points").select("*"),
          supabase
            .from("iot_readings")
            .select("id, point_id, created_at, volume_l, turbidity, battery, filter_health")
            .order("created_at", { ascending: false }),
        ]);

      if (e1) throw e1;
      if (e2) throw e2;

      const latestReadingByPoint = {};
      if (readings && readings.length) {
        for (const r of readings) {
          const pid = String(r.point_id);
          if (!latestReadingByPoint[pid]) {
            latestReadingByPoint[pid] = r;
          }
        }
      }

      // 3) Enrichir les water points
      const enriched = (wps || []).map((wp) => {
        const pid = String(wp.id);
        const last = latestReadingByPoint[pid] || null;

        // normalize filter_status (souvent 'OK', 'REPLACE', 'FAILED' etc.)
        const fs = (wp.filter_status || (last && last.filter_status) || "")
          .toString()
          .trim()
          .toLowerCase();

        const filterHealth = last ? Number(last.filter_health) : null;
        const battery = last ? Number(last.battery) : null;
        const volume = last ? Number(last.volume_l || 0) : 0;

        const capacity = wp.capacity || 100;

        // Règle pour l'activation :
        // -> si filter_status indique remplacement ou défaillance => INACTIF
        // -> sinon si filter_health < 30 => INACTIF
        // -> sinon si battery est très faible (< 5) => INACTIF
        // -> sinon ACTIF
        const inactiveBecauseFilter =
          fs === "replace" || fs === "replaced" || fs === "failed";
        const inactiveBecauseHealth =
          filterHealth !== null && !Number.isNaN(filterHealth) && filterHealth < 30;
        const inactiveBecauseBattery =
          battery !== null && !Number.isNaN(battery) && battery < 5;

        const active = !(inactiveBecauseFilter || inactiveBecauseHealth || inactiveBecauseBattery);

        return {
          ...wp,
          name: wp.name || wp.community || `Distributeur ${pid}`,
          location: wp.community || wp.location || "",
          lastReading: last,
          volume,
          capacity,
          turbidity: last ? last.turbidity : null,
          battery,
          filter_health: filterHealth,
          active,
          filter_status_normalized: fs,
        };
      });

      setWaterPoints(enriched);
    } catch (err) {
      console.error("Erreur fetchAndEnrich DistributorList:", err);
    } finally {
      setLoading(false);
    }
  }

  // Détermine l'état du filtre pour affichage
  // basé sur filter_status et filter_health
  // Retourne { label, className }
  const getFilterState = (filterStatus, filterHealth) => {
    const fs = (filterStatus || "").toString().toLowerCase();

    if (fs === "replace" || fs === "replaced" || (filterHealth !== null && filterHealth < 30)) {
      return { label: "À remplacer", className: "bg-red-100 text-red-600" };
    }
    if (fs === "failed") {
      return { label: "Défaillant", className: "bg-red-100 text-red-600" };
    }
    if (fs === "ok" || (filterHealth !== null && filterHealth >= 80)) {
      return { label: "Bon état", className: "bg-green-100 text-green-600" };
    }
    return { label: "Moyen", className: "bg-yellow-100 text-yellow-600" };
  };

  // Filtrage
  const filteredDistributors = waterPoints.filter((d) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (d.name || "").toLowerCase().includes(q) ||
      (d.location || "").toLowerCase().includes(q) ||
      (String(d.id) || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ? true : statusFilter === "active" ? !!d.active : !d.active;

    return matchesSearch && matchesStatus;
  });

  const displayedDistributors = showAllDistributors ? filteredDistributors : filteredDistributors.slice(0, 8);

  // Stats rapides
  const activeCount = waterPoints.filter((d) => d.active === true).length;
  const inactiveCount = waterPoints.filter((d) => d.active === false).length;
  const filtersToChange = waterPoints.filter((d) => {
    const fs = d.filter_status_normalized || "";
    const fh = d.filter_health;
    return fs === "replace" || fs === "replaced" || fs === "failed" || (fh !== null && fh < 30);
  }).length;
  const averageDaily = 0; // calculer depuis lectures / payments

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
        <h1 className="text-2xl font-semibold text-gray-900">Liste des distributeurs - Dakar</h1>
        <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <MapPin className="h-4 w-4 mr-2" />
          Vue Carte
        </button>
      </div>

      {/* Recherche / filtre */}
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

      {/* KPI */}
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
                <th className="py-3 px-6 font-medium text-gray-700">Nom & Localisation</th>
                <th className="py-3 px-6 font-medium text-gray-700">Statut</th>
                <th className="py-3 px-6 font-medium text-gray-700">Volume</th>
                <th className="py-3 px-6 font-medium text-gray-700">État Filtre</th>
                <th className="py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedDistributors.length > 0 ? (
                displayedDistributors.map((d) => {
                  const filter = getFilterState(d.filter_status_normalized, d.filter_health);
                  const percent = d.capacity > 0 ? Math.min(Math.round((d.volume / d.capacity) * 100), 100) : 0;
                  return (
                    <tr key={d.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-purple-600 font-medium">D-{String(d.id).slice(0, 8)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{d.name}</p>
                          <p className="text-sm text-gray-500">{d.location}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          {d.active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className={`text-sm font-medium ${percent > 70 ? "text-green-600" : percent > 30 ? "text-yellow-600" : "text-red-600"}`}>
                            {d.volume}L / {d.capacity}L
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${percent}%` }} />
                          </div>
                          <div className="text-xs text-gray-500 text-right">{percent}%</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${filter.className}`}>
                          {filter.label}
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
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 px-6 text-center text-gray-500">{searchTerm ? "Aucun distributeur trouvé" : "Aucun distributeur disponible"}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredDistributors.length > 8 && (
          <div className="p-6 border-t border-gray-200 text-center">
            <button onClick={() => setShowAllDistributors(!showAllDistributors)} className="px-4 py-2 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors flex items-center mx-auto">
              {showAllDistributors ? (<><Minus className="h-4 w-4 mr-2" />Afficher moins</>) : (<><Plus className="h-4 w-4 mr-2" />Voir tous les distributeurs ({filteredDistributors.length})</>)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
