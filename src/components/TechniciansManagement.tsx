import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Phone,
  Mail,
  Calendar,
  Wrench,
  TrendingUp,
  Activity
} from "lucide-react";

export function TechniciansManagement() {
  const techniciens = [
    {
      id: "TECH-001",
      nom: "Moussa Diop",
      email: "m.diop@anilaye.sn",
      telephone: "+221 77 123 45 67",
      specialite: "Réparation hydraulique",
      statut: "disponible",
      zone: "Dakar Centre",
      experienceAnnees: 8,
      notePerformance: 4.8,
      interventionsTotal: 156,
      interventionsEnCours: 2,
      interventionsCeMois: 23,
      tauxReussite: 94,
      derniereMission: "2024-01-15 14:30",
      certifications: ["Hydraulique", "Maintenance préventive", "Sécurité"]
    },
    {
      id: "TECH-002",
      nom: "Fatou Sall",
      email: "f.sall@anilaye.sn",
      telephone: "+221 76 987 65 43",
      specialite: "Maintenance électronique",
      statut: "en_mission",
      zone: "Plateau",
      experienceAnnees: 5,
      notePerformance: 4.6,
      interventionsTotal: 98,
      interventionsEnCours: 1,
      interventionsCeMois: 18,
      tauxReussite: 92,
      derniereMission: "2024-01-15 16:00",
      certifications: ["Électronique", "Diagnostic avancé"]
    },
    {
      id: "TECH-003",
      nom: "Amadou Kane",
      email: "a.kane@anilaye.sn",
      telephone: "+221 78 456 78 90",
      specialite: "Installation et raccordement",
      statut: "disponible",
      zone: "Liberté",
      experienceAnnees: 12,
      notePerformance: 4.9,
      interventionsTotal: 287,
      interventionsEnCours: 0,
      interventionsCeMois: 31,
      tauxReussite: 96,
      derniereMission: "2024-01-15 12:45",
      certifications: ["Installation", "Plomberie", "Sécurité", "Formation"]
    },
    {
      id: "TECH-004",
      nom: "Awa Diallo",
      email: "a.diallo@anilaye.sn",
      telephone: "+221 77 234 56 78",
      specialite: "Maintenance préventive",
      statut: "en_conge",
      zone: "Medina",
      experienceAnnees: 6,
      notePerformance: 4.7,
      interventionsTotal: 134,
      interventionsEnCours: 0,
      interventionsCeMois: 15,
      tauxReussite: 93,
      derniereMission: "2024-01-12 11:20",
      certifications: ["Maintenance préventive", "Qualité de l'eau"]
    },
    {
      id: "TECH-005",
      nom: "Ousmane Ndiaye",
      email: "o.ndiaye@anilaye.sn",
      telephone: "+221 76 345 67 89",
      specialite: "Réparation d'urgence",
      statut: "disponible",
      zone: "Parcelles",
      experienceAnnees: 4,
      notePerformance: 4.5,
      interventionsTotal: 89,
      interventionsEnCours: 1,
      interventionsCeMois: 20,
      tauxReussite: 90,
      derniereMission: "2024-01-15 15:15",
      certifications: ["Urgences", "Première intervention"]
    }
  ];

  const statistiques = {
    totalTechniciens: techniciens.length,
    disponibles: techniciens.filter(t => t.statut === 'disponible').length,
    enMission: techniciens.filter(t => t.statut === 'en_mission').length,
    performanceMoyenne: 4.7,
    interventionsMois: techniciens.reduce((acc, tech) => acc + tech.interventionsCeMois, 0)
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'disponible': return 'default';
      case 'en_mission': return 'secondary';
      case 'en_conge': return 'outline';
      case 'indisponible': return 'destructive';
      default: return 'default';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'disponible': return 'Disponible';
      case 'en_mission': return 'En mission';
      case 'en_conge': return 'En congé';
      case 'indisponible': return 'Indisponible';
      default: return statut;
    }
  };

  const getInitials = (nom: string) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < note ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Gestion des Techniciens
              </h1>
              <p className="text-purple-600 font-medium">
                Équipe technique Anilaye - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Supervision et affectation des techniciens sur le terrain
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <Button className="anilaye-button">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau technicien
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{statistiques.totalTechniciens}</p>
            <p className="text-sm text-gray-600">Total techniciens</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{statistiques.disponibles}</p>
            <p className="text-sm text-gray-600">Disponibles</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-orange-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{statistiques.enMission}</p>
            <p className="text-sm text-gray-600">En mission</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-yellow-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{statistiques.performanceMoyenne}</p>
            <p className="text-sm text-gray-600">Performance moy.</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Wrench className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{statistiques.interventionsMois}</p>
            <p className="text-sm text-gray-600">Interventions ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="liste" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="liste">Liste des techniciens</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="affectation">Affectation</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Rechercher un technicien..." className="pl-10 w-64" />
            </div>
            <Select defaultValue="tous">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="disponible">Disponibles</SelectItem>
                <SelectItem value="en_mission">En mission</SelectItem>
                <SelectItem value="en_conge">En congé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des techniciens */}
        <TabsContent value="liste">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Équipe technique active</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technicien</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Interventions</TableHead>
                    <TableHead>Dernière mission</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techniciens.map((tech) => (
                    <TableRow key={tech.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {getInitials(tech.nom)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{tech.nom}</p>
                            <p className="text-sm text-gray-600">{tech.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{tech.telephone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{tech.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{tech.specialite}</p>
                          <p className="text-xs text-gray-600">{tech.experienceAnnees} ans d'exp.</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{tech.zone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatutColor(tech.statut)}>
                          {getStatutLabel(tech.statut)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.floor(tech.notePerformance))}
                            <span className="text-sm ml-2">{tech.notePerformance}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={tech.tauxReussite} className="w-16 h-1" />
                            <span className="text-xs text-gray-600">{tech.tauxReussite}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium text-blue-600">{tech.interventionsCeMois} ce mois</p>
                          <p className="text-gray-600">{tech.interventionsTotal} total</p>
                          <p className="text-orange-600">{tech.interventionsEnCours} en cours</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{tech.derniereMission}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <MapPin className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {techniciens.slice(0, 3).map((tech) => (
              <Card key={tech.id} className="anilaye-card border-purple-100">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {getInitials(tech.nom)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{tech.nom}</CardTitle>
                      <p className="text-sm text-gray-600">{tech.specialite}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance globale</span>
                        <span className="font-medium">{tech.notePerformance}/5</span>
                      </div>
                      <Progress value={(tech.notePerformance / 5) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Taux de réussite</span>
                        <span className="font-medium">{tech.tauxReussite}%</span>
                      </div>
                      <Progress value={tech.tauxReussite} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-xl font-bold text-blue-600">{tech.interventionsCeMois}</p>
                        <p className="text-xs text-gray-600">Ce mois</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-xl font-bold text-green-600">{tech.experienceAnnees}</p>
                        <p className="text-xs text-gray-600">Années</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Affectation */}
        <TabsContent value="affectation">
          <Card className="anilaye-card border-purple-100">
            <CardHeader>
              <CardTitle>Affectation par zone géographique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Dakar Centre', 'Plateau', 'Liberté', 'Medina', 'Parcelles', 'Yoff'].map((zone) => {
                  const techniciensZone = techniciens.filter(t => t.zone === zone);
                  return (
                    <div key={zone} className="bg-white border border-purple-100 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">{zone}</h3>
                      <div className="space-y-2">
                        {techniciensZone.length > 0 ? (
                          techniciensZone.map((tech) => (
                            <div key={tech.id} className="flex items-center justify-between text-sm">
                              <span>{tech.nom}</span>
                              <Badge variant={getStatutColor(tech.statut)} className="text-xs">
                                {getStatutLabel(tech.statut)}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 italic">Aucun technicien affecté</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}