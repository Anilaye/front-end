import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CurrentPage, User } from '../types';
import { SUPERVISION_PAGES, PAIEMENTS_PAGES } from '../constants';

interface NavigationContextType {
  currentPage: CurrentPage;
  selectedDistributor: string | null;
  setCurrentPage: (page: CurrentPage) => void;
  setSelectedDistributor: (distributorId: string | null) => void;
  navigateToDashboard: (user: User) => void;
  handleDistributorSelect: (distributorId: string) => void;
  handleBackToDashboard: (user: User) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(SUPERVISION_PAGES.DASHBOARD);
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null);

  const navigateToDashboard = (user: User) => {
    if (user.role === 'admin-supervision') {
      setCurrentPage(SUPERVISION_PAGES.DASHBOARD);
    } else {
      setCurrentPage(PAIEMENTS_PAGES.DASHBOARD);
    }
  };

  const handleDistributorSelect = (distributorId: string) => {
    setSelectedDistributor(distributorId);
    setCurrentPage('distributor-details');
  };

  const handleBackToDashboard = (user: User) => {
    setSelectedDistributor(null);
    navigateToDashboard(user);
  };

  const value: NavigationContextType = {
    currentPage,
    selectedDistributor,
    setCurrentPage,
    setSelectedDistributor,
    navigateToDashboard,
    handleDistributorSelect,
    handleBackToDashboard,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
