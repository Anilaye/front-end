import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff, Shield, DollarSign, User, Lock, Mail, Phone, MapPin } from "lucide-react";
import anilayeLogo from 'figma:asset/76e6e0f0884a41e2f2941922ef0aad8aa2ca14f5.png';

interface RegisterProps {
  onRegister: (user: { email: string; role: 'admin-supervision' | 'admin-paiements'; name: string }) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as 'admin-supervision' | 'admin-paiements' | '',
    department: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.firstName.trim()) newErrors.push('Le prénom est requis');
    if (!formData.lastName.trim()) newErrors.push('Le nom est requis');
    if (!formData.email.trim()) newErrors.push('L\'email est requis');
    if (!formData.email.includes('@')) newErrors.push('Email invalide');
    if (!formData.phone.trim()) newErrors.push('Le téléphone est requis');
    if (!formData.password) newErrors.push('Le mot de passe est requis');
    if (formData.password.length < 6) newErrors.push('Le mot de passe doit contenir au moins 6 caractères');
    if (formData.password !== formData.confirmPassword) newErrors.push('Les mots de passe ne correspondent pas');
    if (!formData.role) newErrors.push('Veuillez sélectionner un rôle');
    if (!formData.department.trim()) newErrors.push('Le département est requis');
    if (!formData.acceptTerms) newErrors.push('Vous devez accepter les conditions d\'utilisation');

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Simulation d'une inscription
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Ici, normalement on enverrait les données au serveur
    onRegister({
      email: formData.email,
      role: formData.role,
      name: `${formData.firstName} ${formData.lastName}`
    });

    setIsLoading(false);
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin-supervision':
        return 'Gestion technique des interventions, maintenance et surveillance des distributeurs';
      case 'admin-paiements':
        return 'Contrôle financier, suivi des revenus et gestion des transactions';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
          <p className="text-gray-600">Inscription Administration</p>
        </div>

        <Card className="anilaye-card border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <User className="h-5 w-5" />
              <span>Créer un compte Admin</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@anilaye.sn"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+221 XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Rôle et département */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Type d'administration *</Label>
                  <Select 
                    value={formData.role} 
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
                  {formData.role && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {getRoleDescription(formData.role)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Département *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="department"
                      type="text"
                      placeholder="Ex: Département de Dakar"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Mot de passe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                  J'accepte les{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-800 underline">
                    conditions d'utilisation
                  </button>
                  {' '}et la{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-800 underline">
                    politique de confidentialité
                  </button>
                  {' '}d'Anilaye *
                </Label>
              </div>

              {/* Messages d'erreur */}
              {errors.length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription>
                    <ul className="list-disc list-inside text-red-700 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Bouton d'inscription */}
              <Button 
                type="submit" 
                className="w-full anilaye-button py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Création du compte...' : 'Créer mon compte'}
              </Button>

              {/* Lien vers connexion */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Déjà un compte ?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}