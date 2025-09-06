import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import WaterPointsList from "../components/Dashboard/WaterPointsList";
import PaymentService from "../components/Dashboard/PaymentService";
import Charts from "../components/Dashboard/Charts";
import MapView from "../components/Dashboard/MapView";
import Header from "../components/Dashboard/Header";
import { Activity, AlertTriangle, DollarSign, MapPin, Search, Eye, Wrench, Plus, Minus, Home, BarChart3, CreditCard, FileText, LogOut, User, BarChart2 } from 'lucide-react';
import "/src/index.css";
import logoAnilaye from '/src/assets/logoAnilaye.png';


export default function Dashboard({ currentUser, onLogout }) {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [waterPoints, setWaterPoints] = useState([]);
  const [payments, setPayments] = useState([]);
  const [iotData, setIotData] = useState([]);
  const [showAllDistributors, setShowAllDistributors] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  
  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'etat-distributeur', label: 'État Distributeur', icon: BarChart3 },
    { id: 'transaction', label: 'Transaction', icon: CreditCard },
    { id: 'rapport', label: 'Rapport', icon: FileText }
  ];

// Remove unused TopNavigation function

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setLoading(true);
    await Promise.all([
      fetchWaterPoints(),
      fetchPayments(),
      fetchIoT()
    ]);
    setLoading(false);
  }

  async function fetchWaterPoints() {
    try {
      let { data, error } = await supabase
        .from("water_points")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setWaterPoints(data);
      } else {
        console.error("Erreur lors du chargement des points d'eau:", error);
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  }

  async function fetchPayments() {
    try {
      let { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setPayments(data);
      } else {
        console.error("Erreur lors du chargement des paiements:", error);
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  }

  async function fetchIoT() {
    try {
      let { data, error } = await supabase
        .from("iot_readings")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setIotData(data);
      } else {
        console.error("Erreur lors du chargement des données IoT:", error);
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  }

  // Fonctions utilitaires
  const getFilterState = (filterStatus, filterHealth) => {
    if (filterStatus === "REPLACE" || filterHealth < 30) {
      return { label: "À remplacer", className: "bg-red-100 text-red-600" };
    }
    if (filterStatus === "FAILED" || filterHealth < 10) {
      return { label: "Défaillant", className: "bg-red-100 text-red-600" };
    }
    if (filterHealth >= 80) {
      return { label: "Bon état", className: "bg-green-100 text-green-600" };
    }
    return { label: "Moyen", className: "bg-yellow-100 text-yellow-600" };
  };

  // Calculs des KPI
  // const activeDistributors = waterPoints.filter(w => w.active || w.status === "active").length;
  const filtersToReplace = waterPoints.filter(w => 
    w.filter_status === "REPLACE" || (w.filter_health && w.filter_health < 30)
  ).length;
  const totalVolumeDistributed = iotData.reduce((acc, r) => acc + (r.volume_l || 0), 0);
  const todayPayments = payments.filter(p => {
    if (!p.created_at && !p.date) return false;
    const today = new Date().toISOString().split('T')[0];
    const paymentDate = new Date(p.created_at || p.date).toISOString().split('T')[0];
    return paymentDate === today;
  }).length;
  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

  // Filtrage des distributeurs
  const filteredDistributors = waterPoints.filter(d =>
    (d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.code?.toLowerCase().includes(searchTerm.toLowerCase())) ?? true
  );

  const displayedDistributors = showAllDistributors ? filteredDistributors : filteredDistributors.slice(0, 8);

   const getMarkerPosition = (index) => {
    // Positions réparties sur Dakar
    const positions = [
      { x: "45%", y: "40%" }, // Centre-ville
      { x: "52%", y: "55%" }, // Marché  
      { x: "38%", y: "48%" }, // École
      { x: "58%", y: "42%" }, // Hôpital
      { x: "30%", y: "70%" }, // Gare
      { x: "65%", y: "60%" }, // Université
      { x: "70%", y: "35%" }, // Plateau
      { x: "75%", y: "65%" }, // Médina
      { x: "25%", y: "35%" }, // Yoff
      { x: "60%", y: "25%" }  // Grand Yoff
    ];
    return positions[index % positions.length] || { x: "50%", y: "50%" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-purple-600 font-medium">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header avec navigation */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logoAnilaye} 
                alt="Anilaye Logo" 
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 text-white">Anilaye</span>
                <span className="text-xs text-purple-600 font-medium text-white">O'SEN-Ndoxmusell</span>
              </div>
            </div>
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
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-center items-center py-3">
          {navItems.map((item) => {
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
                <span className={`text-sm font-medium ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-6 space-y-6">
        {/* Header Principal */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">O'SEN-Ndoxmusell</h2>
          <div className="w-24 h-1 bg-white/30 mx-auto"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-green-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distributeurs Actifs</p>
                {/* <p className="text-3xl font-bold text-green-600">{activeDistributors}</p> */}
                <p className="text-3xl font-bold text-green-600">{waterPoints.length}</p>
                <p className="text-xs text-gray-500">sur {waterPoints.length} total</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-orange-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interventions Récentes</p>
                <p className="text-3xl font-bold text-orange-600">{filtersToReplace}</p>
                <p className="text-xs text-gray-500">filtres à remplacer</p>
                <p className="text-xl font-bold text-orange-600 mt-2">{totalVolumeDistributed} L</p>
                <p className="text-xs text-gray-500">volume total distribué</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-blue-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions du Jour</p>
                <p className="text-3xl font-bold text-blue-600">{todayPayments}</p>
                <p className="text-xs text-gray-500">{totalRevenue.toLocaleString()} FCFA estimés</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Carte GPS */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Localisation GPS des distributeurs - Dakar, Sénégal</span>
            </div>
          </div>
          <div className="p-0">
            <div className="h-96 w-full relative bg-blue-100">
              {/* Carte interactive avec marqueurs dynamiques */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-200 rounded-lg overflow-hidden">
                {/* Titre de la carte */}
                <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium z-10">
                  Réseau de Distribution - Dakar ({waterPoints.length} points)
                </div>
                
                {/* Contrôles zoom */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded shadow-lg z-10">
                  <button className="block w-10 h-10 border-b flex items-center justify-center hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="block w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                    <Minus className="h-4 w-4" />
                  </button>
                </div>

                {/* Coordonnées Dakar */}
                <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded shadow text-xs text-gray-600 z-10">
                  14.7167°N, 17.4677°W
                </div>

                {/* Fond de carte stylisé */}
                <div className="w-full h-full relative">
                  <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                    {/* Tracés de routes principales */}
                    <path d="M50,150 Q200,100 350,150" stroke="#cbd5e1" strokeWidth="3" fill="none" opacity="0.7"/>
                    <path d="M100,50 Q200,150 100,250" stroke="#cbd5e1" strokeWidth="2" fill="none" opacity="0.6"/>
                    <path d="M150,100 Q250,120 300,200" stroke="#cbd5e1" strokeWidth="2" fill="none" opacity="0.6"/>
                    
                    {/* Zones urbaines stylisées */}
                    <circle cx="200" cy="150" r="80" fill="#e2e8f0" opacity="0.4"/>
                    <circle cx="150" cy="120" r="40" fill="#e2e8f0" opacity="0.3"/>
                    <circle cx="250" cy="180" r="35" fill="#e2e8f0" opacity="0.3"/>
                  </svg>

                  {/* Marqueurs des distributeurs - DYNAMIQUES basés sur vos données */}
                  {waterPoints.map((point, index) => {
                    const pos = getMarkerPosition(index, waterPoints.length);
                    const isActive = point.active === true || point.status === "active";
                    
                    return (
                      <div 
                        key={point.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: pos.x, top: pos.y }}
                      >
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                            isActive 
                              ? 'bg-green-500 animate-pulse' 
                              : 'bg-red-500'
                          }`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          
                          {/* Tooltip dynamique avec vos vraies données */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            <div className="font-medium">{point.name || `Distributeur ${point.code || point.id}`}</div>
                            <div className="text-gray-300">{point.location || "Localisation non définie"}</div>
                            <div className={`${isActive ? 'text-green-300' : 'text-red-300'}`}>
                              {isActive ? 'Actif' : 'Inactif'} - {point.volume || 0}L/{point.capacity || 0}L
                            </div>
                            {point.filter_status && (
                              <div className="text-yellow-300">Filtre: {point.filter_status}</div>
                            )}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Message si pas de données */}
                  {waterPoints.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Aucun distributeur en base de données</p>
                        <button 
                          onClick={fetchAllData}
                          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                          Actualiser
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Labels des quartiers */}
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "20%", top: "30%" }}>Yoff</div>
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "35%", top: "25%" }}>Parcelles Assainies</div>
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "45%", top: "50%" }}>Centre-ville</div>
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "60%", top: "70%" }}>Médina</div>
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "75%", top: "45%" }}>Plateau</div>
                  <div className="absolute text-xs text-gray-600 font-medium" style={{ left: "65%", top: "25%" }}>Grand Yoff</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    {/* <span>Actifs ({activeDistributors})</span> */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    {/* <span>Inactifs ({waterPoints.length - activeDistributors})</span> */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600 font-medium">⚡ Total: {waterPoints.length}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  Cliquez sur un marqueur pour plus d'infos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des Distributeurs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Liste des Distributeurs</h2>
              <button className="flex items-center px-3 py-1.5 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 text-sm transition-colors">
                <MapPin className="h-4 w-4 mr-2" />
                Vue Carte
              </button>
            </div>
            
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher un distributeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-colors"
              />
            </div>
          </div>

          {/* Tableau des distributeurs */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr className="border-b border-purple-100">
                  <th className="py-3 px-6 font-medium text-gray-700">ID</th>
                  <th className="py-3 px-6 font-medium text-gray-700">Nom & Localisation</th>
                  <th className="py-3 px-6 font-medium text-gray-700">Statut</th>
                  <th className="py-3 px-6 font-medium text-gray-700">Volume</th>
                  <th className="py-3 px-6 font-medium text-gray-700">État Filtre</th>
                  <th className="py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedDistributors.length > 0 ? displayedDistributors.map((d) => (
                  <tr key={d.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-purple-600 font-medium">
                        {d.code || `D-${String(d.id).padStart(3, '0')}`}
                      </span>
                    </td>

                    {/* Nom & localisation */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{d.name}</p>
                        <p className="text-sm text-gray-500">{d.location}</p>
                      </div>
                    </td>

                    {/* Statut */}
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (d.active || d.status === "active")
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {(d.active || d.status === "active") ? "Actif" : "Inactif"}
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${
                            d.capacity > 0 && d.volume / d.capacity > 0.7
                              ? "text-green-600"
                              : d.capacity > 0 && d.volume / d.capacity > 0.3
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}>
                            {d.volume || 0}L / {d.capacity || 0}L
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all"
                            style={{
                              width: `${
                                d.capacity > 0
                                  ? Math.min(((d.volume || 0) / d.capacity) * 100, 100)
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          {d.capacity > 0
                            ? (((d.volume || 0) / d.capacity) * 100).toFixed(0)
                            : 0}%
                        </div>
                      </div>
                    </td>

                    {/* État Filtre */}
                    <td className="py-4 px-6">
                      {(() => {
                        const filter = getFilterState(d.filter_status, d.filter_health);
                        return (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${filter.className}`}>
                            {filter.label}
                          </span>
                        );
                      })()}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-purple-100 rounded transition-colors" title="Voir les détails">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-purple-100 rounded transition-colors" title="Maintenance">
                          <Wrench size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="py-8 px-6 text-center text-gray-500">
                      {searchTerm ? "Aucun distributeur trouvé pour cette recherche" : "Aucun distributeur disponible"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bouton voir plus/moins */}
          {filteredDistributors.length > 8 && (
            <div className="p-6 border-t border-gray-200 text-center">
              <button
                onClick={() => setShowAllDistributors(!showAllDistributors)}
                className="px-4 py-2 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors flex items-center mx-auto"
              >
                {showAllDistributors ? (
                  <>
                    <Minus className="h-4 w-4 mr-2" />
                    Afficher moins
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Voir tous les distributeurs ({filteredDistributors.length})
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}