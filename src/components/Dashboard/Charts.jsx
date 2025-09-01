import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase
        .from("iot_readings")
        .select("created_at, volume_l")
        .order("created_at", { ascending: true })
        .limit(20);
      if (!error) {
        setData(
          data.map((d) => ({
            date: new Date(d.created_at).toLocaleDateString(),
            volume: d.volume_l,
          }))
        );
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Consommation d’eau (L)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="volume" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
