import { Button } from "./ui/button";
import { Home, MapPin, BarChart3, List, Calendar, AlertTriangle, Settings, Shield, DollarSign } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: 'dashboard', label: 'Accueil', icon: Home },
    { id: 'distributors', label: 'Distributeurs', icon: List },
    { id: 'interventions', label: 'Interventions', icon: Calendar },
    { id: 'alerts', label: 'Alertes', icon: AlertTriangle },
    { id: 'reports', label: 'Rapports', icon: BarChart3 },
    { id: 'admin-supervision', label: 'Admin Supervision', icon: Shield },
    { id: 'admin-paiements', label: 'Admin Paiements', icon: DollarSign }
  ];

  return (
    <nav className="bg-white border-b border-purple-200 px-6 py-3 shadow-sm">
      <div className="flex space-x-2 overflow-x-auto">
        {pages.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentPage === id ? "default" : "ghost"}
            className={`flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
              currentPage === id 
                ? "anilaye-button text-white shadow-md" 
                : "hover:bg-purple-50 hover:text-purple-700"
            }`}
            onClick={() => onPageChange(id)}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}