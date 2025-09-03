import { Home, BarChart2, FileText, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Accueil", icon: <Home size={20} /> },
    { to: "/dashboard/WaterPointsList", label: "État Distributeur", icon: <BarChart2 size={20} /> },
    { to: "/dashboard/PayementService", label: "Transaction", icon: <FileText size={20} /> },
    { to: "/dashboard/Reports", label: "Rapport", icon: <Users size={20} /> },
  ];

  return (
    <aside className="bg-white shadow-lg w-64 h-screen p-4 fixed left-0 top-0">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Anilaye</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 ${
                isActive ? "bg-indigo-200 font-semibold text-indigo-700" : ""
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
