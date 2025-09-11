import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Utilitaire: état du filtre
const getFilterState = (filterStatus, filterHealth) => {
  const fs = (filterStatus || "").toString().toLowerCase();

  if (fs === "replace" || (filterHealth !== null && filterHealth < 30)) {
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

// Hook principal
export function useDistributors() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistributors();
  }, []);

  async function fetchDistributors() {
    setLoading(true);
    try {
      const { data, error } = await supabase
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

        const filterStatus = (wp.filter_status || lastReading.filter_status || "").toString().trim().toLowerCase();
        const filterHealth = lastReading.filter_health !== undefined ? Number(lastReading.filter_health) : null;
        const battery = lastReading.battery !== undefined ? Number(lastReading.battery) : null;
        const volume = lastReading.volume_l || 0;
        const capacity = wp.capacity || 100;

        // 🔹 Statut actif/inactif
        const inactiveBecauseFilter = filterStatus === "replace" || filterStatus === "failed";
        const inactiveBecauseHealth = filterHealth !== null && filterHealth < 30;
        const inactiveBecauseBattery = battery !== null && battery < 5;

        const active = !(inactiveBecauseFilter || inactiveBecauseHealth || inactiveBecauseBattery);

        return {
          ...wp,
          name: wp.community || `Distributeur ${wp.id}`,
          location: wp.community,
          volume,
          capacity,
          filter_health: filterHealth,
          turbidity: lastReading.turbidity || null,
          battery,
          active,
          filterState: getFilterState(filterStatus, filterHealth),
          code: `D-${String(wp.id).slice(0, 8)}`,
        };
      });

      setDistributors(enriched);
    } catch (err) {
      console.error("Erreur fetch distributors:", err);
    } finally {
      setLoading(false);
    }
  }

  return { distributors, loading, refresh: fetchDistributors };
}
