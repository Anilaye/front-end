import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Eye, Wrench } from 'lucide-react';

const DistributorList = () => {
  const [distributors, setDistributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement des distributeurs depuis votre API
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        setLoading(true);
        // Remplacez par l'URL de votre API backend
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/distributors`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // Ajoutez vos headers d'authentification si nécessaire
        //     // 'Authorization': `Bearer ${token}`
        //   }
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const data = await response.json();
        // setDistributors(data.distributors || data); // Adaptez selon la structure de votre réponse
        // setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des distributeurs:', err);
        setError('Impossible de charger les distributeurs. Veuillez réessayer.');
        setDistributors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  // Filtrage dynamique des distributeurs
  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = 
      (distributor.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (distributor.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (distributor.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      distributor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculs dynamiques des statistiques
  const activeCount = distributors.filter(d => d.status === 'active').length;
  const inactiveCount = distributors.filter(d => d.status === 'inactive').length;
  const filtersToChange = distributors.filter(d => d.filter_state !== 'Bon état').length;
  const averageDaily = distributors.length > 0 
    ? Math.round(distributors.reduce((acc, d) => acc + (d.daily_average || 0), 0) / distributors.length)
    : 0;

  // Fonctions utilitaires pour les badges et couleurs
  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Actif</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactif</span>;
  };

  const getFilterBadge = (filterState) => {
    switch (filterState) {
      case 'Bon état':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Bon état</span>;
      case 'A remplacer':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">A remplacer</span>;
      case 'Défaillant':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Défaillant</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{filterState}</span>;
    }
  };

  const getVolumeColor = (volume, maxVolume) => {
    const percentage = (volume / maxVolume) * 100;
    if (percentage < 20) return 'text-red-600';
    if (percentage < 50) return 'text-orange-600';
    return 'text-blue-600';
  };

  const getVolumeBarColor = (volume, maxVolume) => {
    const percentage = (volume / maxVolume) * 100;
    if (percentage < 20) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const handleDistributorSelect = async (distributorId) => {
    // Logique pour voir les détails du distributeur
    console.log('Sélectionné:', distributorId);
    // Vous pouvez naviguer vers une page de détails ou ouvrir un modal
  };

  const handleMaintenance = async (distributorId) => {
    // Logique pour programmer une maintenance
    console.log('Maintenance pour:', distributorId);
    // Vous pouvez ouvrir un formulaire de maintenance
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-800 text-white px-4 py-2 rounded text-sm hover:bg-red-900"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Liste des distributeurs - Dakar</h1>
        <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <MapPin className="h-4 w-4 mr-2" />
          Vue carte
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher par nom, ID ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs uniquement</option>
                <option value="inactive">Inactifs uniquement</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
          <p className="text-sm text-gray-600 mt-1">Distributeurs actifs</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-red-600">{inactiveCount}</p>
          <p className="text-sm text-gray-600 mt-1">Distributeurs inactifs</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-orange-600">{filtersToChange}</p>
          <p className="text-sm text-gray-600 mt-1">Filtres à changer</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">{averageDaily}L</p>
          <p className="text-sm text-gray-600 mt-1">Moyenne quotidienne</p>
        </div>
      </div>

      {/* Tableau des distributeurs */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Distributeurs ({filteredDistributors.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordonnées GPS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État filtre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDistributors.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Aucun distributeur trouvé avec les filtres actuels.' 
                      : 'Aucun distributeur disponible.'
                    }
                  </td>
                </tr>
              ) : (
                filteredDistributors.map((distributor) => (
                  <tr key={distributor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {distributor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {distributor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {distributor.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                      {distributor.coordinates || distributor.latitude + ', ' + distributor.longitude}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(distributor.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className={`text-sm font-medium ${getVolumeColor(distributor.current_volume || distributor.volume, distributor.max_volume || distributor.maxVolume)}`}>
                          {distributor.current_volume || distributor.volume}L / {distributor.max_volume || distributor.maxVolume}L
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${getVolumeBarColor(distributor.current_volume || distributor.volume, distributor.max_volume || distributor.maxVolume)}`}
                            style={{ width: `${Math.min(((distributor.current_volume || distributor.volume) / (distributor.max_volume || distributor.maxVolume)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getFilterBadge(distributor.filter_state || distributor.filterState)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(distributor.last_maintenance || distributor.lastMaintenance).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDistributorSelect(distributor.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleMaintenance(distributor.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Maintenance"
                        >
                          <Wrench className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistributorList;