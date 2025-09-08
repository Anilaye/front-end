import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("anilaye_user");
    const storedProfile = localStorage.getItem("anilaye_profile");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedProfile) setProfile(JSON.parse(storedProfile));

    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password) 
        .single();

      if (userError || !userData) {
        throw new Error("Email ou mot de passe incorrect.");
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userData.id)
        .single();

      localStorage.setItem("anilaye_user", JSON.stringify(userData));
      if (profileData) {
        localStorage.setItem("anilaye_profile", JSON.stringify(profileData));
      }

      setUser(userData);
      setProfile(profileData || null);

      return { success: true };
    } catch (err) {
      console.error("Erreur signIn:", err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("anilaye_user");
    localStorage.removeItem("anilaye_profile");
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    role: profile?.role || user?.role || null,
    isAdmin:
      (profile?.role?.toLowerCase?.() === "admin") ||
      (user?.role?.toLowerCase?.() === "admin"),
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
