import { useEffect, useState } from "react";
import { fetchUsers, createUser } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "" });

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser(form);
    setUsers([...users, newUser]);
    setForm({ name: "",role: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestion des utilisateurs</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input className="border p-2" placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        {/* <input className="border p-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /> */}
        <input className="border p-2" placeholder="Rôle" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2">Ajouter</button>
      </form>

      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border p-2">
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
