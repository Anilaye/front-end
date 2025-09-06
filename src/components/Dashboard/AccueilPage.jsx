import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import WaterPointsList from "../components/Dashboard/WaterPointsList";
import PaymentService from "../components/Dashboard/PaymentService";


export default function Accueil() {
    // const [searchTerm, setSearchTerm] = useState('');
    const [waterPoints, setWaterPoints] = useState([]);
    const [payments, setPayments] = useState([]);
    const [iotData, setIotData] = useState([]);

    useEffect(() => {
    fetchWaterPoints();
    fetchPayments();
    fetchIoT();
    }, []);

    async function fetchWaterPoints() {
        let { data, error } = await supabase.from("water_points").select("*");
        if (!error) setWaterPoints(data);
      }
    
    async function fetchPayments() {
        let { data, error } = await supabase.from("payments").select("*");
        if (!error) setPayments(data);
    }
    
    async function fetchIoT() {
        let { data, error } = await supabase.from("iot_readings").select("*");
        if (!error) setIotData(data);
    }

    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* En-tête avec titre et slogan */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold anilaye-gradient bg-clip-text text-transparent">
          Anilaye
        </h1>
        <p className="text-lg text-purple-600 font-medium">
          O'SEN-Ndoxmusell
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="anilaye-card border-l-4 border-l-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distributeurs Actifs</p>
                <p className="text-3xl font-bold text-green-600">{waterPoints.length}</p>
                <p className="text-xs text-gray-500">sur {waterPoints.length} total</p>
              </div>
              <div className="anilaye-gradient p-3 rounded-full">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="anilaye-card border-l-4 border-l-orange-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interventions Récentes</p>
                <p className="text-3xl font-bold text-orange-600">{waterPoints.filter(w => w.filter_status === "REPLACE").length}</p>
                <p className="text-xs text-gray-500">filtres à remplacer</p>
                <p className="text-3xl font-bold text-orange-600">{iotData.reduce((acc, r) => acc + r.volume_l, 0)} L</p>
                <p className="text-xs text-gray-500">volume total distribué</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="anilaye-card border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions du Jour</p>
                <p className="text-3xl font-bold text-blue-600">{payments.length.toLocaleString()}</p>
                <p className="text-xs text-gray-500">FCFA estimés</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des distributeurs */}
      <div className="anilaye-card">
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Liste des Distributeurs</h2>
            <button variant="outline" className="flex items-center px-3 py-1.5 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              Vue Carte
            </button>
          </div>
        </div>
        <div>
          {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un distributeur..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 border rounded-lg border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 p-2"
            />
          </div>
        </div>

        {/* Tableau distributeurs */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-purple-100">
              <th className="py-2">ID</th>
              <th>Nom & Localisation</th>
              <th>Statut</th>
              <th>Volume</th>
              <th>État Filtre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waterPoints.slice(0, 8).map((d) => (
              <tr
                key={d.id}
                className="border-purple-50 hover:bg-purple-50/50"
              >
                {/* ID */}
                <td className="font-mono text-purple-600 font-medium">
                  {d.code}
                </td>

                {/* Nom & localisation */}
                <td>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-sm text-gray-500">{d.location}</p>
                </td>

                {/* Statut */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      d.active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {d.active ? "Actif" : "Inactif"}
                  </span>
                </td>

                {/* Volume */}
                <td>
                  <div className="space-y-1">
                    <span
                      className={`text-sm font-medium ${
                        d.capacity > 0 && d.volume / d.capacity > 0.7
                          ? "text-green-600"
                          : d.capacity > 0 && d.volume / d.capacity > 0.3
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {d.volume}L / {d.capacity}L
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="anilaye-gradient h-1.5 rounded-full"
                        style={{
                          width: `${
                            d.capacity > 0
                              ? (d.volume / d.capacity) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        {d.capacity > 0
                          ? ((d.volume / d.capacity) * 100).toFixed(0)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </td>

                {/* Filtre */}
                <td>
                  {/* {(() => {
                    const filter = getFilterState(d.filter_health);
                    return (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${filter.className}`}
                      >
                        {filter.label}
                      </span>
                    );
                  })()} */}
                </td>

                {/* Actions */}
                <td className="flex space-x-2">
                  <button className="p-1 hover:bg-purple-100 rounded">
                    <Eye size={18} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-purple-100 rounded">
                    <Wrench size={18} className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Bouton voir plus si + de 8 distributeurs */}
          {waterPoints.length > 8 && (
            <div className="mt-4 text-center">
              <button className="px-4 py-2 border rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50">
                Voir tous les distributeurs ({waterPoints.length})
              </button>
            </div>
          )}
        </table>
      </div>
      </div>
    </div>
}