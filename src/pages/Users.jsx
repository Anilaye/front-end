import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers().then(setUsers).catch((e) => setError(e.message));
  }, []);

  if (!isAdmin) return <div className="p-6 text-red-600">Accès réservé aux administrateurs.</div>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Utilisateurs</h1>
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="border p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-500">{u.email} • {u.role}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
