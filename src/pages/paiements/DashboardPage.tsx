import React from 'react';
import { AdminPaiements } from '../../components/AdminPaiements';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <AdminPaiements />
    </DashboardLayout>
  );
};
