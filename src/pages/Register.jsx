import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import logoAnilaye from '/src/assets/logoAnilaye.png';
import "/src/index.css";
import { DivIcon } from "leaflet";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
    role: "admin",
  });
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
      const { data: user, error: userError } = await supabase.from('users').insert({
      email: formData.email,
      password: formData.password,
    }).select().single();
    if (userError) throw userError;

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        prenom: formData.prenom,
        nom: formData.nom,
        role: formData.role,
        },
      ]);

      if (profileError) throw profileError;

      setFormData({
        prenom: "",
        nom: "",
        email: "",
        password: "",
        role: "admin",
      });

      alert("Compte créé avec succès !");

      navigate("/login", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l’inscription.");
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
            <h2 className="text-xl font-semibold text-gray-700">Créer un compte</h2>
        </div>

        <div className="anilaye-card border-purple-200 shadow-xl">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white shadow-lg rounded-xl justify-center p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <label htmlFor="prenom">Prénom *</label>
                    <input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="nom">Nom *</label>
                    <input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                    />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email">Adresse email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="password">Mot de passe *</label>
                    <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                    />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                  disabled={loading}
                  className="w-full anilaye-button py-3"
                >
                {loading ? "Création du compte..." : "S’inscrire"}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Déjà un compte ?{' '}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Se connecter
                </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}