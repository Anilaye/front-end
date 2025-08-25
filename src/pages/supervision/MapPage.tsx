import React from 'react';
import { MapView } from '../../components/MapView';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useNavigation } from '../../contexts/NavigationContext';

export const MapPage: React.FC = () => {
  const { handleDistributorSelect } = useNavigation();

  return (
    <DashboardLayout>
      <MapView onDistributorSelect={handleDistributorSelect} />
    </DashboardLayout>
  );
};
