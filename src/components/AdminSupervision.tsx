import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { InteractiveMap } from "./InteractiveMap";
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  BarChart3,
  TrendingUp,
  Activity
} from "lucide-react";

interface AdminSupervisionProps {
  onDistributorSelect?: (id: string) => void;
}

export function AdminSupervision({ onDistributorSelect }: AdminSupervisionProps) {
  // Données simulées pour les interventions
  const interventionsStats = {
    total: 47,
    enCours: 12,
    terminees: 35,
    urgent: 5,
    tauxDisponibilite: 87
  };

  // Données des distributeurs pour la carte
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
      id: "D-015",
      name: "Distributeur Université",
      lat: 14.7250,
      lng: -17.4750,
      status: "active" as const,
      volume: 920,
      maxVolume: 1500,
      location: "Campus Université"
    }
  ];

  const interventionsEnCours = [
    {
      id: "INT-2024-001",
      distributeur: "D-001",
      location: "Place de l'Indépendance",
      type: "Réparation urgente",
      technicien: "Moussa Diop",
      priorite: "haute",
      dateDebut: "2024-01-15 08:30",
      estimee: "2h",
      status: "en_cours"
    },
    {
      id: "INT-2024-002", 
      distributeur: "D-007",
      location: "École Primaire Liberté",
      type: "Remplacement filtre",
      technicien: "Fatou Sall",
      priorite: "moyenne",
      dateDebut: "2024-01-15 10:00",
      estimee: "1h30",
      status: "en_cours"
    },
    {
      id: "INT-2024-003",
      distributeur: "D-012",
      location: "Gare Routière",
      type: "Maintenance préventive",
      technicien: "Amadou Kane",
      priorite: "faible",
      dateDebut: "2024-01-15 14:00",
      estimee: "3h",
      status: "planifiee"
    }
  ];

  const historiqueInterventions = [
    {
      id: "INT-2024-045",
      distributeur: "D-003",
      location: "Marché Sandaga",
      type: "Réparation pompe",
      technicien: "Ousmane Ndiaye",
      dateDebut: "2024-01-14 09:00",
      dateFin: "2024-01-14 11:30",
      duree: "2h30",
      status: "terminee",
      cout: "45,000 FCFA"
    },
    {
      id: "INT-2024-044",
      distributeur: "D-015",
      location: "Campus Université",
      type: "Changement filtre",
      technicien: "Awa Diallo",
      dateDebut: "2024-01-13 15:00",
      dateFin: "2024-01-13 16:15",
      duree: "1h15",
      status: "terminee",
      cout: "12,000 FCFA"
    }
  ];

  const alertesSysteme = [
    {
      id: "ALT-001",
      type: "panne",
      message: "Distributeur D-001 hors service - Pompe défaillante",
      priorite: "haute",
      time: "Il y a 25 min",
      distributeur: "D-001"
    },
    {
      id: "ALT-002", 
      type: "maintenance",
      message: "Maintenance préventive requise pour D-008",
      priorite: "moyenne",
      time: "Il y a 2h",
      distributeur: "D-008"
    },
    {
      id: "ALT-003",
      type: "filtre",
      message: "Filtre à 85% d'usure sur D-007",
      priorite: "faible",
      time: "Il y a 4h",
      distributeur: "D-007"
    }
  ];

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'destructive';
      case 'moyenne': return 'default';
      case 'faible': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'default';
      case 'terminee': return 'secondary';
      case 'planifiee': return 'outline';
      default: return 'default';
    }
  };

  const handleDistributorSelectInternal = (distributorId: string) => {
    if (onDistributorSelect) {
      onDistributorSelect(distributorId);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header Admin */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Admin - Supervision des Interventions
              </h1>
              <p className="text-purple-600 font-medium">
                Suivi technique en temps réel - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Gestion et supervision des interventions techniques sur le réseau Anilaye
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Disponibilité réseau</p>
                <p className="font-semibold text-green-600">{interventionsStats.tauxDisponibilite}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Supervision */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{interventionsStats.total}</p>
            <p className="text-sm text-gray-600">Total interventions</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-orange-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{interventionsStats.enCours}</p>
            <p className="text-sm text-gray-600">En cours</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{interventionsStats.terminees}</p>
            <p className="text-sm text-gray-600">Terminées</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-red-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{interventionsStats.urgent}</p>
            <p className="text-sm text-gray-600">Urgentes</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{interventionsStats.tauxDisponibilite}%</p>
            <p className="text-sm text-gray-600">Disponibilité</p>
            <Progress value={interventionsStats.tauxDisponibilite} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec carte et onglets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte des distributeurs */}
        <Card className="anilaye-card border-purple-100">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Carte du réseau</span>
              </div>
              <Button variant="secondary" size="sm" className="text-blue-600">
                Voir en grand
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px]">
              <InteractiveMap 
                distributors={distributors}
                onDistributorSelect={handleDistributorSelectInternal}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alertes et interventions */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="interventions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="interventions">Interventions</TabsTrigger>
              <TabsTrigger value="alertes">Alertes</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>

            {/* Interventions en cours */}
            <TabsContent value="interventions">
              <Card className="anilaye-card border-purple-100">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5" />
                    <span>Interventions en cours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {interventionsEnCours.map((intervention) => (
                      <div key={intervention.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{intervention.type}</h4>
                            <p className="text-sm text-gray-600">{intervention.location}</p>
                            <p className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded mt-1">
                              {intervention.id}
                            </p>
                          </div>
                          <Badge variant={getPriorityColor(intervention.priorite)}>
                            {intervention.priorite}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{intervention.technicien}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{intervention.estimee}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alertes système */}
            <TabsContent value="alertes">
              <Card className="anilaye-card border-purple-100">
                <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Alertes système actives</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {alertesSysteme.map((alerte) => (
                      <Alert key={alerte.id} className="border-l-4 border-l-purple-500">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium">{alerte.message}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <span>Distributeur: {alerte.distributeur}</span>
                                <span>{alerte.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Badge variant={getPriorityColor(alerte.priorite)}>
                                {alerte.priorite}
                              </Badge>
                              <Button size="sm" className="anilaye-button">
                                Traiter
                              </Button>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Historique */}
            <TabsContent value="historique">
              <Card className="anilaye-card border-purple-100">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Interventions récentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {historiqueInterventions.map((intervention) => (
                      <div key={intervention.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{intervention.type}</h4>
                            <p className="text-sm text-gray-600">{intervention.location}</p>
                            <p className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded mt-1">
                              {intervention.id}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Terminée
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{intervention.technicien}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{intervention.duree}</span>
                          </div>
                          <div className="text-green-600 font-medium">
                            {intervention.cout}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}