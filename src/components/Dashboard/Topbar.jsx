import { LogOut } from "lucide-react";

export default function Topbar() {
  return (
    <header className="ml-64 bg-gradient-to-r from-indigo-500 to-blue-500 h-16 flex items-center justify-between px-6 text-white shadow">
      <h1 className="text-lg font-semibold">O'SEN-Ndoxmusell</h1>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">Administrateur Anilaye</p>
          <p className="text-sm">Administrateur</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-indigo-600 px-3 py-1 rounded-lg shadow hover:bg-gray-100">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
