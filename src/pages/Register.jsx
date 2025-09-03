import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import logoAnilaye from "/src/assets/logoAnilaye.png";
import "/src/index.css";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
    role: "admin",
  });
  // const [showPassword, setShowPassword] = useState(false);
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
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert({
          email: formData.email,
          password: formData.password,
        })
        .select()
        .single();
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
    <div className="card min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
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
          <h2 className="text-xl font-semibold text-gray-700">Inscription</h2>
        </div>

        <div className="anilaye-card border-purple-200 shadow-xl">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="text-center flex items-center justify-center space-x-6">
              <User />
              <span>Créer mon compte</span>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email">Adresse email *</label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      name="email"
                      placeholder="email@anilaye.sn"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 pl-8 rounded" 
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password">Mot de passe *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 pl-10 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 anilaye-button"
              >
                {loading ? "Création du compte..." : "S’inscrire"}
              </button>
            
              {/* Bouton Se connecter */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
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
