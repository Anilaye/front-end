import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthView } from '../types';

interface AuthContextType {
  user: User | null;
  authView: AuthView;
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');

  const login = (userData: User) => {
    setUser(userData);
  };

  const register = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setAuthView('login');
  };

  const switchToRegister = () => {
    setAuthView('register');
  };

  const switchToLogin = () => {
    setAuthView('login');
  };

  const value: AuthContextType = {
    user,
    authView,
    login,
    register,
    logout,
    switchToRegister,
    switchToLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
