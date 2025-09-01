import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h1 className="text-xl font-bold mb-6">Anilaye Admin</h1>
        <nav className="space-y-2 text-sm">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">Overview</Link>
          <Link to="/users" className="block px-3 py-2 rounded hover:bg-gray-100">Utilisateurs</Link>
          <Link to="/iot" className="block px-3 py-2 rounded hover:bg-gray-100">IoT</Link>
          <Link to="/payments" className="block px-3 py-2 rounded hover:bg-gray-100">Paiements</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex justify-end mb-6">
          <button className="bg-black text-white px-3 py-1 rounded" onClick={()=>{
            localStorage.removeItem("token"); window.location.href="/login";
          }}>Logout</button>
        </header>
        {children}
      </main>
    </div>
  );
}