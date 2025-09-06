import React from "react";

export default function PaymentsTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Aucune transaction trouvée.</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead className="bg-anilaye-blue text-white">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Utilisateur</th>
          <th className="p-2">Opérateur</th>
          <th className="p-2">Montant</th>
          <th className="p-2">Volume</th>
          <th className="p-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tx) => (
          <tr key={tx.id} className="border-b">
            <td className="p-2 font-medium">{tx.id}</td>
            <td className="p-2">{tx.user_id || "—"}</td>
            <td className="p-2">{tx.operator}</td>
            <td className="p-2 text-green-600">{tx.amount} FCFA</td>
            <td className="p-2">{tx.litres} L</td>
            <td className="p-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  tx.status === "SUCCESS"
                    ? "bg-green-100 text-green-600"
                    : tx.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {tx.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
