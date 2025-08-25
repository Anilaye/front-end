import { useState, useEffect } from 'react';
import { Distributor, Intervention, Transaction, Alert, Technician } from '../types';

// Données mockées pour la démonstration
const mockDistributors: Distributor[] = [
  {
    id: 'D-001',
    name: 'Distributeur Centre-Ville',
    status: 'active',
    location: { lat: 14.7167, lng: -17.4677 },
    lastUpdate: '2024-01-15T10:30:00Z',
  },
  {
    id: 'D-002',
    name: 'Distributeur Dakar Nord',
    status: 'maintenance',
    location: { lat: 14.7247, lng: -17.4677 },
    lastUpdate: '2024-01-15T09:15:00Z',
  },
  {
    id: 'D-003',
    name: 'Distributeur Dakar Sud',
    status: 'active',
    location: { lat: 14.7087, lng: -17.4677 },
    lastUpdate: '2024-01-15T11:00:00Z',
  },
];

const mockInterventions: Intervention[] = [
  {
    id: 'INT-001',
    distributorId: 'D-002',
    technicianId: 'TECH-001',
    type: 'maintenance',
    status: 'in-progress',
    scheduledDate: '2024-01-16T08:00:00Z',
    description: 'Maintenance préventive programmée',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    distributorId: 'D-001',
    amount: 5000,
    type: 'payment',
    status: 'completed',
    timestamp: '2024-01-15T10:30:00Z',
  },
];

const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'technical',
    severity: 'medium',
    message: 'Distributeur D-002 en maintenance',
    timestamp: '2024-01-15T09:15:00Z',
    resolved: false,
  },
];

const mockTechnicians: Technician[] = [
  {
    id: 'TECH-001',
    name: 'Mamadou Diallo',
    email: 'mamadou.diallo@osen.com',
    phone: '+221 77 123 4567',
    status: 'busy',
    specializations: ['maintenance', 'repair'],
  },
];

export const useDistributors = () => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setDistributors(mockDistributors);
      setLoading(false);
    }, 1000);
  }, []);

  const updateDistributor = (id: string, updates: Partial<Distributor>) => {
    setDistributors(prev => 
      prev.map(dist => dist.id === id ? { ...dist, ...updates } : dist)
    );
  };

  return { distributors, loading, updateDistributor };
};

export const useInterventions = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInterventions(mockInterventions);
      setLoading(false);
    }, 1000);
  }, []);

  const addIntervention = (intervention: Omit<Intervention, 'id'>) => {
    const newIntervention: Intervention = {
      ...intervention,
      id: `INT-${Date.now()}`,
    };
    setInterventions(prev => [...prev, newIntervention]);
  };

  const updateIntervention = (id: string, updates: Partial<Intervention>) => {
    setInterventions(prev => 
      prev.map(int => int.id === id ? { ...int, ...updates } : int)
    );
  };

  return { interventions, loading, addIntervention, updateIntervention };
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${Date.now()}`,
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  return { transactions, loading, addTransaction };
};

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      ...alert,
      id: `ALT-${Date.now()}`,
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, resolved: true } : alert)
    );
  };

  return { alerts, loading, addAlert, resolveAlert };
};

export const useTechnicians = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTechnicians(mockTechnicians);
      setLoading(false);
    }, 1000);
  }, []);

  const addTechnician = (technician: Omit<Technician, 'id'>) => {
    const newTechnician: Technician = {
      ...technician,
      id: `TECH-${Date.now()}`,
    };
    setTechnicians(prev => [...prev, newTechnician]);
  };

  const updateTechnician = (id: string, updates: Partial<Technician>) => {
    setTechnicians(prev => 
      prev.map(tech => tech.id === id ? { ...tech, ...updates } : tech)
    );
  };

  return { technicians, loading, addTechnician, updateTechnician };
};
