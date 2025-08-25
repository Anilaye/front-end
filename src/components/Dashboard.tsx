import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { InteractiveMap } from "./InteractiveMap";
import {
  AlertTriangle,
  Droplets,
  MapPin,
  Activity,
  Zap,
} from "lucide-react";

interface DashboardProps {
  onDistributorSelect: (id: string) => void;
}

export function Dashboard({
  onDistributorSelect,
}: DashboardProps) {
  const indicators = [
    {
      title: "Distributeurs actifs/inactifs",
      value: "12/3",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Volume total distribué",
      value: "15,420L",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Alertes en cours",
      value: "7",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "incident",
      message: "Distributeur D-001 hors service",
      priority: "high",
      time: "Il y a 15 min",
    },
    {
      id: 2,
      type: "niveau_bas",
      message: "Niveau bas sur D-003 (< 20%)",
      priority: "medium",
      time: "Il y a 1h",
    },
    {
      id: 3,
      type: "filtre",
      message: "Filtre à remplacer sur D-007",
      priority: "low",
      time: "Il y a 2h",
    },
    {
      id: 4,
      type: "incident",
      message: "Problème de connexion D-012",
      priority: "high",
      time: "Il y a 3h",
    },
    {
      id: 5,
      type: "niveau_bas",
      message: "Niveau bas sur D-008 (< 15%)",
      priority: "medium",
      time: "Il y a 4h",
    },
  ];

  // Distributeurs avec coordonnées GPS réelles de Dakar
  const distributors = [
    {
      id: "D-001",
      name: "Distributeur Centre-ville",
      lat: 14.7167,
      lng: -17.4677,
      status: "inactive" as const,
      volume: 0,
      maxVolume: 1000,
      location: "Place de l'Indépendance",
    },
    {
      id: "D-003",
      name: "Distributeur Marché",
      lat: 14.72,
      lng: -17.465,
      status: "active" as const,
      volume: 750,
      maxVolume: 1000,
      location: "Marché Sandaga",
    },
    {
      id: "D-007",
      name: "Distributeur École",
      lat: 14.715,
      lng: -17.47,
      status: "active" as const,
      volume: 420,
      maxVolume: 800,
      location: "École Primaire Liberté",
    },
    {
      id: "D-008",
      name: "Distributeur Hôpital",
      lat: 14.718,
      lng: -17.462,
      status: "active" as const,
      volume: 150,
      maxVolume: 1200,
      location: "Hôpital Principal",
    },
    {
      id: "D-012",
      name: "Distributeur Gare",
      lat: 14.714,
      lng: -17.468,
      status: "inactive" as const,
      volume: 0,
      maxVolume: 900,
      location: "Gare Routière",
    },
    {
      id: "D-015",
      name: "Distributeur Université",
      lat: 14.725,
      lng: -17.475,
      status: "active" as const,
      volume: 890,
      maxVolume: 1500,
      location: "Campus Université",
    },
    {
      id: "D-018",
      name: "Distributeur Plateau",
      lat: 14.7195,
      lng: -17.4485,
      status: "active" as const,
      volume: 650,
      maxVolume: 1000,
      location: "Plateau Commercial",
    },
    {
      id: "D-021",
      name: "Distributeur Médina",
      lat: 14.708,
      lng: -17.458,
      status: "active" as const,
      volume: 320,
      maxVolume: 800,
      location: "Quartier Médina",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Bannière de bienvenue Anilaye */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenue sur votre Dashboard Anilaye
              </h1>
              <p className="text-purple-600 font-medium">
                O'SEN-Ndoxmusell - Gestion intelligente de vos
                distributeurs d'eau
              </p>
              <p className="text-gray-600 mt-1">
                Surveillez et gérez votre réseau de distribution
                en temps réel
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Système</p>
                <p className="font-semibold text-green-600">
                  Opérationnel
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carte interactive */}
      <Card className="shadow-lg border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>
              Localisation GPS des distributeurs - Dakar,
              Sénégal
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 w-full">
            <InteractiveMap
              distributors={distributors}
              onDistributorSelect={onDistributorSelect}
            />
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>
                    Distributeurs actifs (
                    {
                      distributors.filter(
                        (d) => d.status === "active",
                      ).length
                    }
                    )
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>
                    Distributeurs inactifs (
                    {
                      distributors.filter(
                        (d) => d.status === "inactive",
                      ).length
                    }
                    )
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                Cliquez sur un marqueur pour voir les détails
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicateurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {indicators.map((indicator, index) => (
          <Card
            key={index}
            className="anilaye-card hover:shadow-lg transition-all duration-300 border-purple-100"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {indicator.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {indicator.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${indicator.bgColor}`}
                >
                  <indicator.icon
                    className={`h-8 w-8 ${indicator.color}`}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full anilaye-gradient`}
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span className="ml-3 text-sm text-gray-600">
                  75%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertes et résumé */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="anilaye-card border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle>Résumé du réseau Anilaye</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    Distributeurs actifs
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      distributors.filter(
                        (d) => d.status === "active",
                      ).length
                    }
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="ml-2 text-xs text-green-700">
                      En ligne
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">
                    Distributeurs inactifs
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {
                      distributors.filter(
                        (d) => d.status === "inactive",
                      ).length
                    }
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="ml-2 text-xs text-red-700">
                      Hors ligne
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">
                  Volume total disponible
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {distributors
                    .reduce((acc, d) => acc + d.volume, 0)
                    .toLocaleString()}
                  L
                </p>
                <div className="mt-2 text-xs text-blue-700">
                  Capacité totale:{" "}
                  {distributors
                    .reduce((acc, d) => acc + d.maxVolume, 0)
                    .toLocaleString()}
                  L
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle>Alertes récentes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  className="border-l-4 border-l-purple-500"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="ml-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                      <Badge
                        variant={getPriorityColor(
                          alert.priority,
                        )}
                        className="ml-2"
                      >
                        {alert.priority === "high"
                          ? "Urgent"
                          : alert.priority === "medium"
                            ? "Moyen"
                            : "Faible"}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}