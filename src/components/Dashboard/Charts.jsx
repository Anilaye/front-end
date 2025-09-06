import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
// import { supabase } from "../../lib/supabaseClient";

export default function Charts({ data }) {
  // Transform IoT readings en séries pour graphiques
  const volumeData = data.map((d) => ({
    date: new Date(d.created_at).toLocaleDateString(),
    volume: d.volume_l,
  }));

  const batteryData = data.map((d) => ({
    date: new Date(d.created_at).toLocaleDateString(),
    battery: d.battery,
  }));

  // Exemple camembert (paiements par opérateur)
  const paymentData = [
    { name: "Wave", value: 400 },
    { name: "OM", value: 300 },
    { name: "FreeMoney", value: 200 },
    { name: "Cash", value: 100 },
  ];
  const COLORS = ["#7C3AED", "#3B82F6", "#06B6D4", "#F59E0B"];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Courbe volume distribué */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold mb-2">Volume distribué</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={volumeData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="volume" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Courbe batterie */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold mb-2">État des batteries</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={batteryData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="battery" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Paiements par opérateur */}
      <div className="col-span-2 bg-white p-4 shadow rounded">
        <h2 className="font-bold mb-2">Répartition des paiements</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
