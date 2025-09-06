import React from "react";

export default function WaterPointsTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Aucun distributeur trouvé.</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead className="bg-anilaye-purple text-white">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Nom & Localisation</th>
          <th className="p-2">Statut</th>
          <th className="p-2">Volume</th>
          <th className="p-2">État Filtre</th>
        </tr>
      </thead>
      <tbody>
        {data.map((point) => (
          <tr key={point.id} className="border-b">
            <td className="p-2 font-medium">{point.id.slice(0, 6)}</td>
            <td className="p-2">
              <div className="font-semibold">{point.name}</div>
              <div className="text-xs text-gray-500">{point.community}</div>
            </td>
            <td className="p-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  point.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {point.status || "Inactif"}
              </span>
            </td>
            <td className="p-2 text-blue-600 font-medium">
              {point.current_volume || 0}L
            </td>
            <td className="p-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  point.filter_status === "OK"
                    ? "bg-green-100 text-green-600"
                    : point.filter_status === "WARN"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {point.filter_status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
