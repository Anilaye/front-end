import React from 'react';
import { AdminSupervision } from '../../components/AdminSupervision';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <AdminSupervision />
    </DashboardLayout>
  );
};
