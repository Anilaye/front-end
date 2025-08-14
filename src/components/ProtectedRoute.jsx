import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && !isAdmin) {
    return <div className="p-6 text-red-600">Accès réservé aux administrateurs.</div>;
  }
  return children;
}
