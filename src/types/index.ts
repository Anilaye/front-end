// Types d'utilisateur
export type UserRole = 'admin-supervision' | 'admin-paiements';

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

// Types d'authentification
export type AuthView = 'login' | 'register';

// Types de navigation
export type SupervisionPage = 
  | 'dashboard-supervision'
  | 'map-view'
  | 'interventions-management'
  | 'distributors-status'
  | 'distributor-details'
  | 'alerts-technical'
  | 'reports-technical'
  | 'technicians'
  | 'planning';

export type PaiementsPage = 
  | 'dashboard-paiements'
  | 'map-view'
  | 'transactions'
  | 'revenus'
  | 'anomalies'
  | 'statistics'
  | 'trends'
  | 'reports-financial';

export type CurrentPage = SupervisionPage | PaiementsPage;

// Types de données métier
export interface Distributor {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
}

export interface Intervention {
  id: string;
  distributorId: string;
  technicianId: string;
  type: 'maintenance' | 'repair' | 'inspection';
  status: 'planned' | 'in-progress' | 'completed';
  scheduledDate: string;
  description: string;
}

export interface Transaction {
  id: string;
  distributorId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

export interface Alert {
  id: string;
  type: 'technical' | 'financial' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  specializations: string[];
}

// Types pour les props des composants
export interface LoginProps {
  onLogin: (userData: User) => void;
  onSwitchToRegister: () => void;
}

export interface RegisterProps {
  onRegister: (userData: User) => void;
  onSwitchToLogin: () => void;
}

export interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export interface NavigationProps {
  currentPage: CurrentPage;
  onPageChange: (page: CurrentPage) => void;
}

export interface MapViewProps {
  onDistributorSelect: (distributorId: string) => void;
}

export interface DistributorDetailsProps {
  distributorId: string;
  onBack: () => void;
}

export interface DistributorsListProps {
  onDistributorSelect: (distributorId: string) => void;
}
