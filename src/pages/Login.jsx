import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
// import { supabase } from "../../lib/supabaseClient";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) throw loginError;

      alert("Connexion réussie !");
      console.log("User:", data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold text-gray-700">Connexion</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
