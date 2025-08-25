import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Shield, DollarSign, User, Lock, Mail } from "lucide-react";
import anilayeLogo from "../assets/76e6e0f0884a41e2f2941922ef0aad8aa2ca14f5.png";

interface LoginProps {
  onLogin: (user: { email: string; role: 'admin-supervision' | 'admin-paiements'; name: string }) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as 'admin-supervision' | 'admin-paiements' | ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Utilisateurs prédéfinis pour la démonstration
  const users = [
    {
      email: 'admin.supervision@anilaye.sn',
      password: 'supervision123',
      role: 'admin-supervision' as const,
      name: 'Amadou Kane'
    },
    {
      email: 'admin.paiements@anilaye.sn',
      password: 'paiements123',
      role: 'admin-paiements' as const,
      name: 'Fatou Diallo'
    },
    {
      email: 'demo@anilaye.sn',
      password: 'demo123',
      role: 'admin-supervision' as const,
      name: 'Demo User'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password || !formData.role) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    // Simulation d'une vérification d'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => 
      u.email === formData.email && 
      u.password === formData.password && 
      u.role === formData.role
    );

    if (user) {
      onLogin({
        email: user.email,
        role: user.role,
        name: user.name
      });
    } else {
      setError('Email, mot de passe ou rôle incorrect');
    }

    setIsLoading(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin-supervision':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'admin-paiements':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin-supervision':
        return 'Admin Supervision des Interventions';
      case 'admin-paiements':
        return 'Admin Contrôle des Paiements';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={anilayeLogo} 
              alt="Anilaye Logo" 
              className="h-20 w-20 rounded-full anilaye-logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Anilaye</h1>
          <p className="text-purple-600 font-medium mb-1">O'SEN-Ndoxmusell</p>
          <p className="text-gray-600">Accès sécurisé au système de gestion - O'SEN-Ndoxmusell</p>
        </div>

        <Card className="anilaye-card border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <User className="h-5 w-5" />
              <span>Connexion Admin</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection du rôle */}
              <div className="space-y-2">
                <Label htmlFor="role">Type d'administration</Label>
                <Select 
                  value={"admin-supervision"}
                  // value={"formData.role"}
                  onValueChange={(value: 'admin-supervision' | 'admin-paiements') =>
                    setFormData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin-supervision">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span>Admin Supervision des Interventions</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin-paiements">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>Admin Contrôle des Paiements</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@anilaye.sn"
                    value={"admin.supervision@anilaye.sn"}
                    // value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    // value={formData.password}
                    value={"supervision123"}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Bouton de connexion */}
              <Button 
                type="submit" 
                className="w-full anilaye-button py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>

              {/* Lien vers inscription */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    S'inscrire
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Comptes de démonstration */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-3">Comptes de démonstration :</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-white p-2 rounded border">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Admin Supervision</span>
                </div>
                <p className="text-gray-600">admin.supervision@anilaye.sn / supervision123</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Admin Paiements</span>
                </div>
                <p className="text-gray-600">admin.paiements@anilaye.sn / paiements123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}