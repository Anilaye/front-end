import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { HeaderSupervision } from '../components/HeaderSupervision';
import { HeaderPaiements } from '../components/HeaderPaiements';
import { NavigationSupervision } from '../components/NavigationSupervision';
import { NavigationPaiements } from '../components/NavigationPaiements';
import { useNavigation } from '../contexts/NavigationContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage } = useNavigation();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header selon le rôle */}
      {user.role === 'admin-supervision' ? (
        <HeaderSupervision user={user} onLogout={logout} />
      ) : (
        <HeaderPaiements user={user} onLogout={logout} />
      )}

      {/* Navigation selon le rôle */}
      {user.role === 'admin-supervision' ? (
        <NavigationSupervision currentPage={currentPage} onPageChange={setCurrentPage} />
      ) : (
        <NavigationPaiements currentPage={currentPage} onPageChange={setCurrentPage} />
      )}

      {/* Contenu principal */}
      <main className="min-h-[calc(100vh-8rem)]">
        {children}
      </main>
    </div>
  );
};
