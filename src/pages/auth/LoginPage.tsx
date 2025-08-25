import React from 'react';
import { Login } from '../../components/Login';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts';

export const LoginPage: React.FC = () => {
  const { login, switchToRegister } = useAuth();

  return (
    <AuthLayout>
      <Login onLogin={login} onSwitchToRegister={switchToRegister} />
    </AuthLayout>
  );
};
