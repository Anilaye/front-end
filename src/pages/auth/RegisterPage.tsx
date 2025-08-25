import React from 'react';
import { Register } from '../../components/Register';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register, switchToLogin } = useAuth();

  return (
    <AuthLayout>
      <Register onRegister={register} onSwitchToLogin={switchToLogin} />
    </AuthLayout>
  );
};
