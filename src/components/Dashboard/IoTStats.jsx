import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function IoTStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from("iot_readings").select("*").limit(10).order("created_at", { ascending: false });
      if (!error) setStats(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Dernières lectures IoT</h2>
      <ul>
        {stats.map((r) => (
          <li key={r.id} className="border-b py-2">
            Volume: {r.volume_l} L | Turbidité: {r.turbidity} | Batterie: {r.battery}%
          </li>
        ))}
      </ul>
    </div>
  );
}
