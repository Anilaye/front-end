export const API_URL = "http://localhost:3001/api";

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
}