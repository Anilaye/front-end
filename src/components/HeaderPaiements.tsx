import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Bell, Settings, LogOut, User, DollarSign, TrendingUp } from "lucide-react";
import anilayeLogo from 'figma:asset/76e6e0f0884a41e2f2941922ef0aad8aa2ca14f5.png';

interface HeaderPaiementsProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export function HeaderPaiements({ user, onLogout }: HeaderPaiementsProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  return (
    <header className="bg-white border-b border-green-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={anilayeLogo} 
              alt="Anilaye Logo" 
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Anilaye</span>
              <span className="text-xs text-purple-600 font-medium">O'SEN-Ndoxmusell</span>
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-300 mx-4"></div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Admin Paiements</span>
            </div>
            <span className="text-xs text-gray-600">Dashboard Contrôle Financier</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>
          
          <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div className="text-xs">
              <p className="font-medium text-green-900">{formatMontant(85400)}</p>
              <p className="text-green-700">aujourd'hui</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">Admin Financier</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}