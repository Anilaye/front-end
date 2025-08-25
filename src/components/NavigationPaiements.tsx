import { Button } from "./ui/button";
import { Home, DollarSign, BarChart3, AlertTriangle, CreditCard, TrendingUp, PieChart, MapPin } from "lucide-react";

interface NavigationPaiementsProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function NavigationPaiements({ currentPage, onPageChange }: NavigationPaiementsProps) {
  const pages = [
    { id: 'dashboard-paiements', label: 'Accueil', icon: Home },
    { id: 'map-view', label: 'Carte Interactive', icon: MapPin },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'revenus', label: 'Revenus', icon: DollarSign },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'statistics', label: 'Statistiques', icon: PieChart },
    { id: 'trends', label: 'Tendances', icon: TrendingUp },
    { id: 'reports-financial', label: 'Rapports', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white border-b border-green-200 px-6 py-3 shadow-sm">
      <div className="flex space-x-2 overflow-x-auto">
        {pages.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentPage === id ? "default" : "ghost"}
            className={`flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
              currentPage === id 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md" 
                : "hover:bg-green-50 hover:text-green-700"
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