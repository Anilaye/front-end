import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { AUTH_VIEWS, SUPERVISION_PAGES, PAIEMENTS_PAGES } from '../constants';

// Pages d'authentification
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Pages de supervision
import { DashboardPage as SupervisionDashboard } from '../pages/supervision/DashboardPage';
import { MapPage as SupervisionMapPage } from '../pages/supervision/MapPage';

// Pages de paiements
import { DashboardPage as PaiementsDashboard } from '../pages/paiements/DashboardPage';

// Composants existants
import { Interventions } from './Interventions';
import { DistributorsList } from './DistributorsList';
import { DistributorDetails } from './DistributorDetails';
import { AlertsManagement } from './AlertsManagement';
import { Reports } from './Reports';
import { TechniciansManagement } from './TechniciansManagement';
import { PlanningInterventions } from './PlanningInterventions';
import { TransactionsManagement } from './TransactionsManagement';
import { RevenusAnalysis } from './RevenusAnalysis';
import { MapView } from './MapView';
import { AlertCircle, BarChart3, TrendingUp } from 'lucide-react';
import { STYLE_CLASSES } from '../constants';

export const AppRouter: React.FC = () => {
  const { user, authView } = useAuth();
  const { currentPage, selectedDistributor, handleDistributorSelect, handleBackToDashboard } = useNavigation();

  // Si l'utilisateur n'est pas connecté, afficher les pages d'authentification
  if (!user) {
    if (authView === AUTH_VIEWS.LOGIN) {
      return <LoginPage />;
    } else {
      return <RegisterPage />;
    }
  }

  // Rendu des pages selon le rôle de l'utilisateur connecté
  const renderCurrentPage = () => {
    // Pages spécifiques à l'admin supervision
    if (user.role === 'admin-supervision') {
      switch (currentPage) {
        case SUPERVISION_PAGES.DASHBOARD:
          return <SupervisionDashboard />;
        case SUPERVISION_PAGES.MAP_VIEW:
          return <SupervisionMapPage />;
        case SUPERVISION_PAGES.INTERVENTIONS:
          return <Interventions />;
        case SUPERVISION_PAGES.DISTRIBUTORS:
          return <DistributorsList onDistributorSelect={handleDistributorSelect} />;
        case SUPERVISION_PAGES.DISTRIBUTOR_DETAILS:
          return (
            <DistributorDetails 
              distributorId={selectedDistributor || 'D-003'}
              onBack={handleBackToDashboard}
            />
          );
        case SUPERVISION_PAGES.ALERTS:
          return <AlertsManagement />;
        case SUPERVISION_PAGES.REPORTS:
          return <Reports />;
        case SUPERVISION_PAGES.TECHNICIANS:
          return <TechniciansManagement />;
        case SUPERVISION_PAGES.PLANNING:
          return <PlanningInterventions />;
        default:
          return <SupervisionDashboard />;
      }
    }

    // Pages spécifiques à l'admin paiements
    if (user.role === 'admin-paiements') {
      switch (currentPage) {
        case PAIEMENTS_PAGES.DASHBOARD:
          return <PaiementsDashboard />;
        case PAIEMENTS_PAGES.MAP_VIEW:
          return <MapView onDistributorSelect={handleDistributorSelect} />;
        case PAIEMENTS_PAGES.TRANSACTIONS:
          return <TransactionsManagement />;
        case PAIEMENTS_PAGES.REVENUS:
          return <RevenusAnalysis />;
        case PAIEMENTS_PAGES.ANOMALIES:
          return (
            <div className={`p-6 space-y-6 ${STYLE_CLASSES.GRADIENT_BG} min-h-full`}>
              <div className={`${STYLE_CLASSES.CARD_BASE} text-center`}>
                <div className={`${STYLE_CLASSES.ANILAYE_GRADIENT} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Détection d'Anomalies</h1>
                <p className="text-purple-600 font-medium mb-4">Système d'analyse avancée - O'SEN-Ndoxmusell</p>
                <p className="text-gray-600 mb-6">
                  Module de détection automatique d'anomalies de paiement et transactions suspectes
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">Fonctionnalité en développement</p>
                  <p className="text-blue-600 text-sm mt-1">
                    Analyse comportementale et détection de fraudes - Disponible prochainement
                  </p>
                </div>
              </div>
            </div>
          );
        case PAIEMENTS_PAGES.STATISTICS:
          return (
            <div className={`p-6 space-y-6 ${STYLE_CLASSES.GRADIENT_BG} min-h-full`}>
              <div className={`${STYLE_CLASSES.CARD_BASE} text-center`}>
                <div className={`${STYLE_CLASSES.ANILAYE_GRADIENT} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistiques Financières</h1>
                <p className="text-purple-600 font-medium mb-4">Analytics avancées - O'SEN-Ndoxmusell</p>
                <p className="text-gray-600 mb-6">
                  Tableaux de bord interactifs et métriques financières approfondies
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">Module en préparation</p>
                  <p className="text-green-600 text-sm mt-1">
                    Visualisations avancées et KPIs personnalisables - Déploiement en cours
                  </p>
                </div>
              </div>
            </div>
          );
        case PAIEMENTS_PAGES.TRENDS:
          return (
            <div className={`p-6 space-y-6 ${STYLE_CLASSES.GRADIENT_BG} min-h-full`}>
              <div className={`${STYLE_CLASSES.CARD_BASE} text-center`}>
                <div className={`${STYLE_CLASSES.ANILAYE_GRADIENT} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Analyse des Tendances</h1>
                <p className="text-purple-600 font-medium mb-4">Intelligence prédictive - O'SEN-Ndoxmusell</p>
                <p className="text-gray-600 mb-6">
                  Prévisions de revenus et analyse prédictive des comportements de consommation
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800 font-medium">IA et Machine Learning</p>
                  <p className="text-purple-600 text-sm mt-1">
                    Algorithmes d'apprentissage et modèles prédictifs - Phase de test
                  </p>
                </div>
              </div>
            </div>
          );
        case PAIEMENTS_PAGES.REPORTS:
          return <Reports />;
        default:
          return <PaiementsDashboard />;
      }
    }

    // Fallback
    return <SupervisionDashboard />;
  };

  return renderCurrentPage();
};
