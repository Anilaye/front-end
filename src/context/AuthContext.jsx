import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurer session
  useEffect(() => {
    const tk = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (tk && u) {
      setToken(tk);
      setUser(JSON.parse(u));
    }
    setLoading(false);
  }, []);

  function signin({ token, user }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function signout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = { user, token, loading, signin, signout, isAdmin: user?.role === "admin" };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext);
}


