import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import logoAnilaye from '/src/assets/logoAnilaye.png';
import "/src/index.css";

export default function LoginForm() {
  const navigate = useNavigate();
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
      const {  data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        // .eq("email", formData.email)
        // .eq("password", formData.password)
        // .single();
        console.log("Users table data:", user, userError);

      if (userError || !user) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      setFormData({ email: "", password: "" });

      localStorage.setItem("user", JSON.stringify(user));

      alert("Connexion réussie !");

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl div-logo">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoAnilaye} 
              alt="Anilaye Logo" 
              className="h-20 w-20 rounded-full anilaye-logo"
            />
          </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Anilaye</h1>
            <p className="text-purple-600 font-medium mb-1">O'SEN-Ndoxmusell</p>
        </div>
      </div>

      <div className="anilaye-card border-purple-200 shadow-xl">
        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}
