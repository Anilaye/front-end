// Constantes de navigation
export const SUPERVISION_PAGES = {
  DASHBOARD: 'dashboard-supervision',
  MAP_VIEW: 'map-view',
  INTERVENTIONS: 'interventions-management',
  DISTRIBUTORS: 'distributors-status',
  DISTRIBUTOR_DETAILS: 'distributor-details',
  ALERTS: 'alerts-technical',
  REPORTS: 'reports-technical',
  TECHNICIANS: 'technicians',
  PLANNING: 'planning',
} as const;

export const PAIEMENTS_PAGES = {
  DASHBOARD: 'dashboard-paiements',
  MAP_VIEW: 'map-view',
  TRANSACTIONS: 'transactions',
  REVENUS: 'revenus',
  ANOMALIES: 'anomalies',
  STATISTICS: 'statistics',
  TRENDS: 'trends',
  REPORTS: 'reports-financial',
} as const;

// Constantes d'authentification
export const AUTH_VIEWS = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

// Constantes de rôles
export const USER_ROLES = {
  ADMIN_SUPERVISION: 'admin-supervision',
  ADMIN_PAIEMENTS: 'admin-paiements',
} as const;

// Constantes de statut
export const DISTRIBUTOR_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;

export const INTERVENTION_STATUS = {
  PLANNED: 'planned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const TECHNICIAN_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  OFFLINE: 'offline',
} as const;

// Constantes de configuration
export const APP_CONFIG = {
  NAME: 'Dashboard Interne pour Employé',
  VERSION: '0.1.0',
  COMPANY: 'O\'SEN-Ndoxmusell',
} as const;

// Constantes de style
export const STYLE_CLASSES = {
  GRADIENT_BG: 'bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30',
  CARD_BASE: 'bg-white rounded-lg shadow-sm border border-purple-200 p-8',
  ANILAYE_GRADIENT: 'anilaye-gradient',
} as const;
