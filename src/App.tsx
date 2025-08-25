import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { AppRouter } from './components/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppRouter />
      </NavigationProvider>
    </AuthProvider>
  );
}