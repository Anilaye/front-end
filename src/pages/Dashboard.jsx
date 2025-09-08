import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Home, BarChart3, CreditCard, FileText, LogOut, User } from 'lucide-react';
import "/src/index.css";
import logoAnilaye from '/src/assets/logoAnilaye.png';

// Import des composants de pages
import AccueilPage from "../components/Dashboard/AccueilPage";
import EtatDistributeurPage from "../components/Dashboard/EtatDistributeurPage";
import TransactionPage from "../components/Dashboard/TransactionPage";
import RapportPage from "../components/Dashboard/RapportPage";

// Constants
const NAVIGATION_ITEMS = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'etat-distributeur', label: 'État Distributeur', icon: BarChart3 },
  { id: 'transaction', label: 'Transaction', icon: CreditCard },
  { id: 'rapport', label: 'Rapport', icon: FileText }
];

// Custom Hooks
const useDataFetching = () => {
  const [state, setState] = useState({
    waterPoints: [],
    payments: [],
    iotData: [],
    loading: true
  });

  const fetchData = async (table, setter) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setState(prev => ({ ...prev, [setter]: data }));
      } else {
        console.error(`Erreur lors du chargement de ${table}:`, error);
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  };

  const fetchAllData = async () => {
    setState(prev => ({ ...prev, loading: true }));
    await Promise.all([
      fetchData("water_points", "waterPoints"),
      fetchData("payments", "payments"),
      fetchData("iot_readings", "iotData")
    ]);
    setState(prev => ({ ...prev, loading: false }));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { ...state, fetchAllData };
};

// Components
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
      <p className="mt-4 text-purple-600 font-medium">Chargement du tableau de bord...</p>
    </div>
  </div>
);

const Header = ({ currentUser, onLogout }) => (
  <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <img src={logoAnilaye} alt="Anilaye Logo" className="h-12 w-12 rounded-full" />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-white">Anilaye</span>
        <span className="text-xs font-medium text-white">O'SEN-Ndoxmusell</span>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <User className="h-5 w-5" />
        <div className="text-right">
          <p className="text-sm font-medium">{currentUser?.name || 'Administrateur Anilaye'}</p>
          <p className="text-xs opacity-75">Administrateur</p>
        </div>
      </div>
      <button 
        onClick={onLogout}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
        title="Déconnexion"
      >
        <LogOut className="h-4 w-4" />
        <span className="text-sm">Déconnexion</span>
      </button>
    </div>
  </header>
);

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-white border-b border-gray-200 shadow-sm">
    <div className="flex justify-center items-center py-3">
      {NAVIGATION_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex items-center justify-center px-6 py-2 mx-2 rounded-lg transition-colors ${
              isActive 
                ? 'text-purple-600 bg-purple-50 border border-purple-200' 
                : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Icon className={`h-5 w-5 mr-2 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  </nav>
);

// Page Renderer - Fonction pour rendre la page active
const renderCurrentPage = (currentPage, data) => {
  const { waterPoints, payments, iotData, loading, fetchAllData } = data;

  switch (currentPage) {
    case 'accueil':
      return (
        <AccueilPage 
          waterPoints={waterPoints}
          payments={payments}
          iotData={iotData}
          loading={loading}
          onRefresh={fetchAllData}
        />
      );
    case 'etat-distributeur':
      return (
        <EtatDistributeurPage 
          waterPoints={waterPoints}
          iotData={iotData}
          loading={loading}
          onRefresh={fetchAllData}
        />
      );
    case 'transaction':
      return (
        <TransactionPage 
          payments={payments}
          waterPoints={waterPoints}
          loading={loading}
          onRefresh={fetchAllData}
        />
      );
    case 'rapport':
      return (
        <RapportPage 
          waterPoints={waterPoints}
          payments={payments}
          iotData={iotData}
          loading={loading}
          onRefresh={fetchAllData}
        />
      );
    default:
      return (
        <AccueilPage 
          waterPoints={waterPoints}
          payments={payments}
          iotData={iotData}
          loading={loading}
          onRefresh={fetchAllData}
        />
      );
  }
};

// Main Component
export default function Dashboard({ currentUser, onLogout }) {
  const [currentPage, setCurrentPage] = useState('accueil');
  
  const dashboardData = useDataFetching();

  if (dashboardData.loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30">
      {/* Header fixe */}
      <Header currentUser={currentUser} onLogout={onLogout} />
      
      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Contenu dynamique des pages */}
      <div className="p-6">
        {renderCurrentPage(currentPage, dashboardData)}
      </div>
    </div>
  );
}