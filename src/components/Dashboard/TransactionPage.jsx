import { useState, useMemo } from "react";
import { CreditCard, DollarSign, TrendingUp, Calendar, Search, Filter, ArrowUpDown, Eye, Download, RefreshCw, CheckCircle, Clock, XCircle } from 'lucide-react';

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

const getStatusInfo = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'success':
    case 'réussi':
      return { 
        label: 'Réussie', 
        color: 'text-green-600 bg-green-100',
        icon: CheckCircle 
      };
    case 'pending':
    case 'en_attente':
      return { 
        label: 'En attente', 
        color: 'text-yellow-600 bg-yellow-100',
        icon: Clock 
      };
    case 'failed':
    case 'échec':
      return { 
        label: 'Échouée', 
        color: 'text-red-600 bg-red-100',
        icon: XCircle 
      };
    default:
      return { 
        label: 'Inconnue', 
        color: 'text-gray-600 bg-gray-100',
        icon: Clock 
      };
  }
};

const isToday = (date) => {
  if (!date) return false;
  const today = new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0] === today;
};

const isThisWeek = (date) => {
  if (!date) return false;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return new Date(date) >= weekAgo;
};

// Components
const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "text-blue-600" }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${
              trend.direction === 'down' ? 'rotate-180' : ''
            }`} />
            {trend.value} vs semaine dernière
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${
        color.includes('blue') ? 'bg-blue-100' :
        color.includes('green') ? 'bg-green-100' :
        color.includes('orange') ? 'bg-orange-100' : 'bg-gray-100'
      }`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  </div>
);

const TransactionRow = ({ transaction, waterPoints }) => {
  const statusInfo = getStatusInfo(transaction.status);
  const StatusIcon = statusInfo.icon;
  const distributorName = waterPoints.find(wp => wp.id === transaction.water_point_id)?.name || 'Distributeur inconnu';

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="font-mono text-sm text-purple-600 font-medium">
          #{String(transaction.id).padStart(6, '0')}
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(transaction.created_at || transaction.date)}
        </div>
      </td>
      
      <td className="py-4 px-6">
        <div className="font-medium text-gray-900">{distributorName}</div>
        <div className="text-sm text-gray-500">
          {transaction.volume || 0}L d'eau
        </div>
      </td>
      
      <td className="py-4 px-6">
        <div className="font-semibold text-gray-900">
          {formatCurrency(transaction.amount || 0)}
        </div>
        <div className="text-xs text-gray-500">
          {transaction.payment_method || 'Mobile Money'}
        </div>
      </td>
      
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusInfo.label}
        </span>
      </td>
      
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button 
            className="p-1.5 text-gray-600 hover:bg-purple-100 rounded transition-colors"
            title="Voir les détails"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            className="p-1.5 text-gray-600 hover:bg-purple-100 rounded transition-colors"
            title="Télécharger le reçu"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Component
export default function TransactionPage({ payments, waterPoints, loading, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Calculs des statistiques
  const stats = useMemo(() => {
    const totalAmount = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const todayPayments = payments.filter(p => isToday(p.created_at || p.date));
    const weekPayments = payments.filter(p => isThisWeek(p.created_at || p.date));
    const successfulPayments = payments.filter(p => 
      ['completed', 'success', 'réussi'].includes(p.status?.toLowerCase())
    );

    return {
      total: payments.length,
      totalAmount,
      today: todayPayments.length,
      todayAmount: todayPayments.reduce((acc, p) => acc + (p.amount || 0), 0),
      week: weekPayments.length,
      weekAmount: weekPayments.reduce((acc, p) => acc + (p.amount || 0), 0),
      successRate: payments.length > 0 ? (successfulPayments.length / payments.length) * 100 : 0
    };
  }, [payments]);

  // Filtrage et tri des transactions
  const filteredTransactions = useMemo(() => {
    let filtered = payments.filter(transaction => {
      const matchesSearch = !searchTerm || 
        String(transaction.id).includes(searchTerm) ||
        waterPoints.find(wp => wp.id === transaction.water_point_id)?.name
          ?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || 
        transaction.status?.toLowerCase() === statusFilter;

      const transactionDate = new Date(transaction.created_at || transaction.date);
      const matchesDate = dateFilter === "all" ||
        (dateFilter === "today" && isToday(transaction.created_at || transaction.date)) ||
        (dateFilter === "week" && isThisWeek(transaction.created_at || transaction.date)) ||
        (dateFilter === "month" && transactionDate.getMonth() === new Date().getMonth());

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Tri
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'amount':
          valueA = a.amount || 0;
          valueB = b.amount || 0;
          break;
        case 'status':
          valueA = a.status || '';
          valueB = b.status || '';
          break;
        case 'date':
        default:
          valueA = new Date(a.created_at || a.date || 0);
          valueB = new Date(b.created_at || b.date || 0);
          break;
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return filtered;
  }, [payments, waterPoints, searchTerm, statusFilter, dateFilter, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="anilaye-card border-purple-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <p className="text-sm text-gray-600 mt-1">
                Suivi des paiements et transactions des distributeurs d'eau
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onRefresh}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Transactions Totales"
          value={stats.total}
          subtitle="toutes périodes"
          icon={CreditCard}
          color="text-blue-600"
        />
        <StatCard
          title="Revenus Totaux"
          value={formatCurrency(stats.totalAmount)}
          subtitle="chiffre d'affaires"
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Transactions Aujourd'hui"
          value={stats.today}
          subtitle={formatCurrency(stats.todayAmount)}
          icon={Calendar}
          color="text-orange-600"
        />
        <StatCard
          title="Taux de Réussite"
          value={`${stats.successRate.toFixed(1)}%`}
          subtitle="transactions réussies"
          icon={CheckCircle}
          color="text-green-600"
        />
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher par ID transaction ou distributeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Réussies</option>
              <option value="pending">En attente</option>
              <option value="failed">Échouées</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        {filteredTransactions.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributeur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.distributor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Aucune transaction trouvée.</p>
        )}
      </div>
    </div>
)}

