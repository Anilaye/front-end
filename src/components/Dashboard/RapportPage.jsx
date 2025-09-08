import { useState, useMemo } from "react";
import { 
  FileText, Download, Calendar, BarChart3, TrendingUp, TrendingDown,
  Users, Droplets, DollarSign, Activity, RefreshCw, Filter, Eye,
  PieChart, LineChart
} from 'lucide-react';

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
    year: 'numeric'
  }).format(new Date(dateString));
};

const getDateRange = (period) => {
  const now = new Date();
  let start, end = new Date();
  
  switch (period) {
    case 'today':
      start = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'week':
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'quarter':
      start = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      break;
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      start = new Date(0);
  }
  
  return { start, end };
};

const filterByDateRange = (items, dateField, period) => {
  const { start, end } = getDateRange(period);
  return items.filter(item => {
    const itemDate = new Date(item[dateField] || 0);
    return itemDate >= start && itemDate <= end;
  });
};

// Components
const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = "text-blue-600" }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${
            trend.direction === 'up' ? 'text-green-600' : 
            trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : trend.direction === 'down' ? (
              <TrendingDown className="h-4 w-4 mr-1" />
            ) : null}
            {trend.value} {trend.label}
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${
        color.includes('blue') ? 'bg-blue-50' :
        color.includes('green') ? 'bg-green-50' :
        color.includes('orange') ? 'bg-orange-50' :
        color.includes('purple') ? 'bg-purple-50' : 'bg-gray-50'
      }`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  </div>
);

const PerformanceTable = ({ data, title }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Distributeur
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Transactions
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Volume (L)
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Revenus
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Performance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-4 px-6">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                {item.transactions}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {item.volume.toLocaleString()} L
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                {formatCurrency(item.revenue)}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.performance >= 80 ? 'bg-green-500' :
                        item.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(item.performance, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{item.performance}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportCard = ({ title, description, period, onGenerate, isGenerating }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-xs text-gray-500 mb-4">Période: {period}</p>
      </div>
      <FileText className="h-8 w-8 text-gray-400" />
    </div>
    <div className="flex space-x-3">
      <button
        onClick={() => onGenerate('view')}
        disabled={isGenerating}
        className="flex items-center px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
      >
        <Eye className="h-4 w-4 mr-1" />
        Voir
      </button>
      <button
        onClick={() => onGenerate('download')}
        disabled={isGenerating}
        className="flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        <Download className="h-4 w-4 mr-1" />
        Télécharger
      </button>
    </div>
  </div>
);

// Main Component
export default function RapportPage({ waterPoints, payments, iotData, loading, onRefresh }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  // Calcul des données selon la période sélectionnée
  const periodData = useMemo(() => {
    const filteredPayments = filterByDateRange(payments, 'created_at', selectedPeriod);
    const filteredIotData = filterByDateRange(iotData, 'created_at', selectedPeriod);
    
    const totalRevenue = filteredPayments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const totalVolume = filteredIotData.reduce((acc, d) => acc + (d.volume_l || 0), 0);
    const totalTransactions = filteredPayments.length;
    const activeDistributors = waterPoints.filter(wp => wp.active || wp.status === 'active').length;

    // Calcul des performances par distributeur
    const distributorPerformance = waterPoints.map(wp => {
      const wpPayments = filteredPayments.filter(p => p.water_point_id === wp.id);
      const wpIotData = filteredIotData.filter(d => d.water_point_id === wp.id);
      
      const revenue = wpPayments.reduce((acc, p) => acc + (p.amount || 0), 0);
      const volume = wpIotData.reduce((acc, d) => acc + (d.volume_l || 0), 0);
      const transactions = wpPayments.length;
      
      // Calcul simple de performance basé sur le volume et les revenus
      const performance = Math.min(
        Math.round((volume / Math.max(wp.capacity || 1000, 1)) * 50 + 
                   (transactions / Math.max(totalTransactions || 1, 1)) * 50), 
        100
      );

      return {
        name: wp.name,
        location: wp.location,
        transactions,
        volume,
        revenue,
        performance
      };
    }).sort((a, b) => b.performance - a.performance);

    return {
      totalRevenue,
      totalVolume,
      totalTransactions,
      activeDistributors,
      distributorPerformance: distributorPerformance.slice(0, 10) // Top 10
    };
  }, [waterPoints, payments, iotData, selectedPeriod]);

  const periodLabels = {
    today: "Aujourd'hui",
    week: "Cette semaine",
    month: "Ce mois",
    quarter: "Ce trimestre",
    year: "Cette année"
  };

  const handleGenerateReport = async (action) => {
    setIsGenerating(true);
    
    // Simulation de génération de rapport
    setTimeout(() => {
      if (action === 'download') {
        // Ici vous pourriez déclencher le téléchargement d'un fichier PDF/Excel
        console.log('Téléchargement du rapport...');
      } else {
        // Ici vous pourriez ouvrir une modale ou naviguer vers une page de détails
        console.log('Affichage du rapport...');
      }
      setIsGenerating(false);
    }, 2000);
  };

  const reports = [
    {
      title: "Rapport d'Activité Générale",
      description: "Vue d'ensemble des performances, transactions et utilisation des distributeurs",
      period: periodLabels[selectedPeriod]
    },
    {
      title: "Analyse Financière",
      description: "Détail des revenus, tendances et projections financières",
      period: periodLabels[selectedPeriod]
    },
    {
      title: "Rapport Technique",
      description: "État des équipements, maintenances effectuées et incidents",
      period: periodLabels[selectedPeriod]
    },
    {
      title: "Utilisation par Zone",
      description: "Analyse géographique de la consommation et des performances",
      period: periodLabels[selectedPeriod]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports & Analyses</h1>
          <p className="text-sm text-gray-600 mt-1">
            Génération et consultation des rapports de performance
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
        </div>
      </div>

      {/* Filtres de période */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Période d'analyse:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(periodLabels).map(([period, label]) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Métriques Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenus Totaux"
          value={formatCurrency(periodData.totalRevenue)}
          subtitle={`${periodLabels[selectedPeriod]}`}
          icon={DollarSign}
          color="text-green-600"
        />
        <MetricCard
          title="Volume Distribué"
          value={`${periodData.totalVolume.toLocaleString()} L`}
          subtitle={`${periodLabels[selectedPeriod]}`}
          icon={Droplets}
          color="text-blue-600"
        />
        <MetricCard
          title="Transactions"
          value={periodData.totalTransactions.toLocaleString()}
          subtitle={`${periodLabels[selectedPeriod]}`}
          icon={BarChart3}
          color="text-orange-600"
        />
        <MetricCard
          title="Distributeurs Actifs"
          value={periodData.activeDistributors}
          subtitle={`sur ${waterPoints.length} total`}
          icon={Activity}
          color="text-purple-600"
        />
      </div>

      {/* Performance des Distributeurs */}
      {periodData.distributorPerformance.length > 0 && (
        <PerformanceTable 
          data={periodData.distributorPerformance}
          title={`Top 10 des Distributeurs - ${periodLabels[selectedPeriod]}`}
        />
      )}

      {/* Rapports Disponibles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Rapports Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <ReportCard
              key={index}
              title={report.title}
              description={report.description}
              period={report.period}
              onGenerate={handleGenerateReport}
              isGenerating={isGenerating}
            />
          ))}
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleGenerateReport('download')}
            className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            disabled={isGenerating}
          >
            <PieChart className="h-5 w-5 mr-2" />
            Rapport Complet PDF
          </button>
          <button 
            onClick={() => handleGenerateReport('download')}
            className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            disabled={isGenerating}
          >
            <FileText className="h-5 w-5 mr-2" />
            Export Excel
          </button>
          <button 
            onClick={() => handleGenerateReport('view')}
            className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            disabled={isGenerating}
          >
            <LineChart className="h-5 w-5 mr-2" />
            Analyse Graphique
          </button>
        </div>
      </div>

      {/* Message d'état pour la génération */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <RefreshCw className="h-6 w-6 text-purple-600 animate-spin" />
            <span className="text-gray-700">Génération du rapport en cours...</span>
          </div>
        </div>
      )}
    </div>
  );
}