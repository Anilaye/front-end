import { Button } from "./ui/button";
import { Home, List, Calendar, AlertTriangle, BarChart3, MapPin, Wrench, Activity } from "lucide-react";

interface NavigationSupervisionProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function NavigationSupervision({ currentPage, onPageChange }: NavigationSupervisionProps) {
  const pages = [
    { id: 'dashboard-supervision', label: 'Accueil', icon: Home },
    { id: 'map-view', label: 'Carte Interactive', icon: MapPin },
    { id: 'interventions-management', label: 'Interventions', icon: Wrench },
    { id: 'distributors-status', label: 'État Distributeurs', icon: Activity },
    { id: 'technicians', label: 'Techniciens', icon: List },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'alerts-technical', label: 'Alertes Techniques', icon: AlertTriangle },
    { id: 'reports-technical', label: 'Rapports', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white border-b border-blue-200 px-6 py-3 shadow-sm">
      <div className="flex space-x-2 overflow-x-auto">
        {pages.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentPage === id ? "default" : "ghost"}
            className={`flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
              currentPage === id 
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md" 
                : "hover:bg-blue-50 hover:text-blue-700"
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