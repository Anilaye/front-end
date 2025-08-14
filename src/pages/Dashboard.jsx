import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <p className="mt-2 text-sm text-gray-600">Bienvenue {user?.name ?? "!"}</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-xl">📊 Stat 1 (à relier)</div>
        <div className="border p-4 rounded-xl">💧 Stat 2 (à relier)</div>
      </div>
    </div>
  );
}