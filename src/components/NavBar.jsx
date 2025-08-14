import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, signout, isAdmin } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="border-b p-4 flex items-center gap-4">
      <Link to="/dashboard" className="font-bold">Anilaye</Link>
      <Link to="/dashboard">Dashboard</Link>
      {isAdmin && <Link to="/users">Utilisateurs</Link>}
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-600">{user.name} ({user.role})</span>
            <button
              onClick={() => { signout(); nav("/login"); }}
              className="text-sm border px-3 py-1 rounded"
            >Se déconnecter</button>
          </>
        ) : (
          <Link to="/login" className="text-sm border px-3 py-1 rounded">Se connecter</Link>
        )}
      </div>
    </nav>
  );
}
