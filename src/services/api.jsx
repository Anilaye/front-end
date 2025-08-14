const API_URL = "http://localhost:3001";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginRequest(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Identifiants invalides");
  return res.json(); // { token, user: { id, name, email, role } }
}

export async function registerRequest({ name, email, password, role }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!res.ok) throw new Error("Inscription impossible");
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Accès refusé");
  return res.json();
}
