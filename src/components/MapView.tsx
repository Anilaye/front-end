import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { InteractiveMap } from "./InteractiveMap";
import { 
  MapPin, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  Filter,
  Maximize,
  RefreshCw,
  Search
} from "lucide-react";

interface MapViewProps {
  onDistributorSelect: (id: string) => void;
}

export function MapView({ onDistributorSelect }: MapViewProps) {
  // Données des distributeurs avec leurs coordonnées géographiques
  const distributors = [
    {
      id: "D-001",
      name: "Distributeur Centre-ville",
      lat: 14.7167,
      lng: -17.4677,
      status: "inactive" as const,
      volume: 0,
      maxVolume: 1000,
      location: "Place de l'Indépendance"
    },
    {
      id: "D-003",
      name: "Distributeur Marché",
      lat: 14.7200,
      lng: -17.4650,
      status: "active" as const,
      volume: 750,
      maxVolume: 1000,
      location: "Marché Sandaga"
    },
    {
      id: "D-006",
      name: "Distributeur Hôtel de Ville",
      lat: 14.7140,
      lng: -17.4690,
      status: "active" as const,
      volume: 480,
      maxVolume: 800,
      location: "Hôtel de Ville"
    },
    {
      id: "D-007",
      name: "Distributeur École",
      lat: 14.7180,
      lng: -17.4600,
      status: "active" as const,
      volume: 620,
      maxVolume: 1000,
      location: "École Primaire Liberté"
    },
    {
      id: "D-008",
      name: "Distributeur Hôpital",
      lat: 14.7100,
      lng: -17.4720,
      status: "active" as const,
      volume: 890,
      maxVolume: 1200,
      location: "Hôpital Principal"
    },
    {
      id: "D-009",
      name: "Distributeur Marché Tilène",
      lat: 14.7220,
      lng: -17.4580,
      status: "active" as const,
      volume: 340,
      maxVolume: 800,
      location: "Marché Tilène"
    },
    {
      id: "D-012",
      name: "Distributeur Gare",
      lat: 14.7080,
      lng: -17.4650,
      status: "active" as const,
      volume: 670,
      maxVolume: 1000,
      location: "Gare Routière"
    },
    {
      id: "D-015",
      name: "Distributeur Université",
      lat: 14.7250,
      lng: -17.4750,
      status: "active" as const,
      volume: 920,
      maxVolume: 1500,
      location: "Campus Université"
    },
    {
      id: "D-018",
      name: "Distributeur Plateau",
      lat: 14.7190,
      lng: -17.4630,
      status: "active" as const,
      volume: 580,
      maxVolume: 1000,
      location: "Plateau Commercial"
    },
    {
      id: "D-021",
      name: "Distributeur École Yoff",
      lat: 14.7300,
      lng: -17.4800,
      status: "active" as const,
      volume: 450,
      maxVolume: 800,
      location: "École Primaire Yoff"
    }
  ];

  const statistics = {
    total: distributors.length,
    active: distributors.filter(d => d.status === 'active').length,
    inactive: distributors.filter(d => d.status === 'inactive').length,
    volumeTotal: distributors.reduce((acc, d) => acc + d.volume, 0),
    capaciteTotal: distributors.reduce((acc, d) => acc + d.maxVolume, 0)
  };

  const alertes = distributors.filter(d => {
    const percentage = (d.volume / d.maxVolume) * 100;
    return percentage < 20 || d.status === 'inactive';
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Carte Interactive des Distributeurs
              </h1>
              <p className="text-purple-600 font-medium">
                Localisation et surveillance en temps réel - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Vue géographique du réseau de distribution d'eau Anilaye
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Distributeurs actifs</p>
                <p className="font-semibold text-green-600">{statistics.active}/{statistics.total}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Carte */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{statistics.total}</p>
            <p className="text-sm text-gray-600">Total distributeurs</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{statistics.active}</p>
            <p className="text-sm text-gray-600">Actifs</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-red-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{statistics.inactive}</p>
            <p className="text-sm text-gray-600">Inactifs</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-cyan-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Droplets className="h-6 w-6 text-cyan-600" />
            </div>
            <p className="text-xl font-bold text-cyan-600">{statistics.volumeTotal.toLocaleString()}L</p>
            <p className="text-sm text-gray-600">Volume disponible</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{alertes.length}</p>
            <p className="text-sm text-gray-600">Alertes</p>
          </CardContent>
        </Card>
      </div>

      {/* Contrôles de la carte */}
      <Card className="anilaye-card border-purple-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-medium text-gray-900">Contrôles de la carte</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <Select defaultValue="tous">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les distributeurs</SelectItem>
                    <SelectItem value="actifs">Actifs seulement</SelectItem>
                    <SelectItem value="inactifs">Inactifs seulement</SelectItem>
                    <SelectItem value="alertes">En alerte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="h-4 w-4 mr-2" />
                Plein écran
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carte interactive */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="anilaye-card border-purple-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Réseau de Distribution - Dakar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <InteractiveMap 
                  distributors={distributors}
                  onDistributorSelect={onDistributorSelect}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel latéral avec informations */}
        <div className="space-y-4">
          {/* Distributeurs en alerte */}
          <Card className="anilaye-card border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <AlertTriangle className="h-4 w-4" />
                <span>Alertes ({alertes.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {alertes.slice(0, 5).map((distributeur) => {
                  const percentage = (distributeur.volume / distributeur.maxVolume) * 100;
                  return (
                    <div key={distributeur.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{distributeur.id}</p>
                          <p className="text-xs text-gray-600">{distributeur.location}</p>
                        </div>
                        <Badge variant={distributeur.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                          {distributeur.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      
                      {distributeur.status === 'active' && percentage < 20 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Niveau bas</span>
                            <span className="text-red-600 font-medium">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-red-500 h-1.5 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {distributeur.status === 'inactive' && (
                        <p className="text-xs text-red-600 font-medium">Distributeur hors service</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top performers */}
          <Card className="anilaye-card border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Droplets className="h-4 w-4" />
                <span>Meilleurs niveaux</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {distributors
                  .filter(d => d.status === 'active')
                  .sort((a, b) => (b.volume / b.maxVolume) - (a.volume / a.maxVolume))
                  .slice(0, 5)
                  .map((distributeur) => {
                    const percentage = (distributeur.volume / distributeur.maxVolume) * 100;
                    return (
                      <div key={distributeur.id} className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{distributeur.id}</p>
                            <p className="text-xs text-gray-600">{distributeur.location}</p>
                          </div>
                          <span className="text-xs font-medium text-green-600">{percentage.toFixed(1)}%</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Volume disponible</span>
                            <span className="text-green-600 font-medium">{distributeur.volume}L</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card className="anilaye-card border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Activity className="h-4 w-4" />
                <span>Résumé réseau</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Taux d'activité</span>
                  <span className="font-medium text-green-600">
                    {Math.round((statistics.active / statistics.total) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Capacité utilisée</span>
                  <span className="font-medium text-blue-600">
                    {Math.round((statistics.volumeTotal / statistics.capaciteTotal) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Volume moyen</span>
                  <span className="font-medium text-purple-600">
                    {Math.round(statistics.volumeTotal / statistics.active)}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Points d'attention</span>
                  <span className="font-medium text-orange-600">{alertes.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}