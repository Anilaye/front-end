import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Filter, 
  Users, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Wrench,
  ArrowRight
} from "lucide-react";

export function PlanningInterventions() {
  const interventionsPlanning = [
    {
      id: "INT-2024-050",
      titre: "Maintenance préventive",
      distributeur: "D-015",
      location: "Campus Université",
      technicien: "Amadou Kane",
      date: "2024-01-16",
      heureDebut: "08:00",
      heureFin: "10:30",
      dureeEstimee: "2h30",
      priorite: "moyenne",
      statut: "planifiee",
      type: "maintenance"
    },
    {
      id: "INT-2024-051",
      titre: "Réparation urgente pompe",
      distributeur: "D-003",
      location: "Marché Sandaga",
      technicien: "Moussa Diop",
      date: "2024-01-16",
      heureDebut: "09:00",
      heureFin: "12:00",
      dureeEstimee: "3h",
      priorite: "haute",
      statut: "planifiee",
      type: "reparation"
    },
    {
      id: "INT-2024-052",
      titre: "Installation nouveau filtre",
      distributeur: "D-021",
      location: "École Primaire Yoff",
      technicien: "Fatou Sall",
      date: "2024-01-16",
      heureDebut: "14:00",
      heureFin: "16:00",
      dureeEstimee: "2h",
      priorite: "moyenne",
      statut: "planifiee",
      type: "installation"
    },
    {
      id: "INT-2024-053",
      titre: "Diagnostic électronique",
      distributeur: "D-008",
      location: "Hôpital Principal",
      technicien: "Ousmane Ndiaye",
      date: "2024-01-17",
      heureDebut: "10:00",
      heureFin: "11:30",
      dureeEstimee: "1h30",
      priorite: "faible",
      statut: "planifiee",
      type: "diagnostic"
    },
    {
      id: "INT-2024-054",
      titre: "Remplacement capteur",
      distributeur: "D-012",
      location: "Gare Routière",
      technicien: "Awa Diallo",
      date: "2024-01-17",
      heureDebut: "15:00",
      heureFin: "17:30",
      dureeEstimee: "2h30",
      priorite: "moyenne",
      statut: "planifiee",
      type: "remplacement"
    }
  ];

  const calendrierSemaine = {
    "2024-01-15": [
      { heure: "09:00", intervention: "INT-2024-001", technicien: "Moussa Diop", statut: "en_cours" },
      { heure: "14:00", intervention: "INT-2024-002", technicien: "Fatou Sall", statut: "en_cours" }
    ],
    "2024-01-16": [
      { heure: "08:00", intervention: "INT-2024-050", technicien: "Amadou Kane", statut: "planifiee" },
      { heure: "09:00", intervention: "INT-2024-051", technicien: "Moussa Diop", statut: "planifiee" },
      { heure: "14:00", intervention: "INT-2024-052", technicien: "Fatou Sall", statut: "planifiee" }
    ],
    "2024-01-17": [
      { heure: "10:00", intervention: "INT-2024-053", technicien: "Ousmane Ndiaye", statut: "planifiee" },
      { heure: "15:00", intervention: "INT-2024-054", technicien: "Awa Diallo", statut: "planifiee" }
    ],
    "2024-01-18": [],
    "2024-01-19": [
      { heure: "08:30", intervention: "INT-2024-055", technicien: "Amadou Kane", statut: "planifiee" }
    ]
  };

  const statistiques = {
    interventionsPlannifiees: 8,
    interventionsEnCours: 2,
    techniciensActifs: 5,
    chargeMovenneTechnicien: 75
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'destructive';
      case 'moyenne': return 'default';
      case 'faible': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Wrench className="h-4 w-4 text-blue-600" />;
      case 'reparation': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'installation': return <Plus className="h-4 w-4 text-green-600" />;
      case 'diagnostic': return <CheckCircle className="h-4 w-4 text-purple-600" />;
      default: return <Wrench className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'planifiee': return 'outline';
      case 'en_cours': return 'default';
      case 'terminee': return 'secondary';
      default: return 'outline';
    }
  };

  const joursSemai = ['Lun 15', 'Mar 16', 'Mer 17', 'Jeu 18', 'Ven 19'];
  const heuresJournee = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Planning des Interventions
              </h1>
              <p className="text-purple-600 font-medium">
                Planification et coordination technique - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Organisation des missions et optimisation des ressources
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <Button className="anilaye-button">
                <Plus className="h-4 w-4 mr-2" />
                Planifier intervention
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Planning */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{statistiques.interventionsPlannifiees}</p>
            <p className="text-sm text-gray-600">Planifiées</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-orange-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{statistiques.interventionsEnCours}</p>
            <p className="text-sm text-gray-600">En cours</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{statistiques.techniciensActifs}</p>
            <p className="text-sm text-gray-600">Techniciens actifs</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Wrench className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{statistiques.chargeMovenneTechnicien}%</p>
            <p className="text-sm text-gray-600">Charge moyenne</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="planning" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="planning">Planning hebdomadaire</TabsTrigger>
            <TabsTrigger value="liste">Liste des interventions</TabsTrigger>
            <TabsTrigger value="ressources">Allocation ressources</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue="semaine">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semaine">Cette semaine</SelectItem>
                <SelectItem value="semaine-prochaine">Semaine prochaine</SelectItem>
                <SelectItem value="mois">Ce mois</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Planning hebdomadaire */}
        <TabsContent value="planning">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Planning Semaine du 15 au 19 Janvier 2024</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 min-w-full">
                  {/* Header avec les heures */}
                  <div className="bg-gray-50 p-3 border-b font-medium">Heures</div>
                  {joursSemai.map((jour) => (
                    <div key={jour} className="bg-gray-50 p-3 border-b border-l font-medium text-center">
                      {jour}
                    </div>
                  ))}
                  
                  {/* Grille du planning */}
                  {heuresJournee.map((heure) => (
                    <>
                      <div key={`heure-${heure}`} className="p-3 border-b bg-gray-50 text-sm font-medium">
                        {heure}
                      </div>
                      {['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'].map((date) => {
                        const interventionsCeJour = calendrierSemaine[date] || [];
                        const interventionCetteHeure = interventionsCeJour.find(i => i.heure === heure);
                        
                        return (
                          <div key={`${date}-${heure}`} className="p-2 border-b border-l min-h-12 relative">
                            {interventionCetteHeure && (
                              <div className={`p-2 rounded text-xs ${
                                interventionCetteHeure.statut === 'en_cours' 
                                  ? 'bg-orange-100 border-orange-300' 
                                  : 'bg-blue-100 border-blue-300'
                              } border`}>
                                <p className="font-medium">{interventionCetteHeure.intervention}</p>
                                <p className="text-gray-600">{interventionCetteHeure.technicien}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Liste des interventions */}
        <TabsContent value="liste">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Interventions planifiées</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {interventionsPlanning.map((intervention) => (
                  <div key={intervention.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getTypeIcon(intervention.type)}
                          <h3 className="font-medium text-gray-900">{intervention.titre}</h3>
                          <Badge variant={getPriorityColor(intervention.priorite)}>
                            {intervention.priorite}
                          </Badge>
                          <Badge variant={getStatutColor(intervention.statut)}>
                            {intervention.statut === 'planifiee' ? 'Planifiée' : intervention.statut}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <div>
                              <p className="font-medium">{intervention.distributeur}</p>
                              <p>{intervention.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{intervention.technicien}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(intervention.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{intervention.heureDebut} - {intervention.heureFin}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Allocation des ressources */}
        <TabsContent value="ressources">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Charge par technicien</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Moussa Diop', 'Fatou Sall', 'Amadou Kane', 'Awa Diallo', 'Ousmane Ndiaye'].map((tech, index) => {
                    const charges = [85, 70, 90, 45, 60];
                    return (
                      <div key={tech} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{tech}</span>
                        <div className="flex items-center space-x-2 w-32">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${charges[index]}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{charges[index]}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Interventions par zone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { zone: 'Dakar Centre', count: 3 },
                    { zone: 'Plateau', count: 2 },
                    { zone: 'Liberté', count: 1 },
                    { zone: 'Medina', count: 2 },
                    { zone: 'Parcelles', count: 1 }
                  ].map((item) => (
                    <div key={item.zone} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="font-medium">{item.zone}</span>
                      <Badge variant="outline">{item.count} intervention{item.count > 1 ? 's' : ''}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}