import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Calendar, CalendarDays } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { CalendarIcon, Plus, Clock, User, Wrench, Filter, CheckCircle, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function Interventions() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const interventions = [
    {
      id: "INT-001",
      distributorId: "D-001",
      distributorName: "Distributeur Centre-ville",
      type: "Réparation",
      priority: "high",
      status: "en_attente",
      scheduledDate: "2024-01-20",
      scheduledTime: "09:00",
      technician: "Ahmed Diallo",
      description: "Réparation du système de distribution - panne électrique",
      estimatedDuration: "2h"
    },
    {
      id: "INT-002",
      distributorId: "D-007",
      distributorName: "Distributeur École",
      type: "Maintenance",
      priority: "medium",
      status: "en_cours",
      scheduledDate: "2024-01-18",
      scheduledTime: "14:00",
      technician: "Fatou Sall",
      description: "Remplacement du filtre principal",
      estimatedDuration: "1h30"
    },
    {
      id: "INT-003",
      distributorId: "D-008",
      distributorName: "Distributeur Hôpital",
      type: "Inspection",
      priority: "low",
      status: "terminee",
      scheduledDate: "2024-01-15",
      scheduledTime: "10:30",
      technician: "Omar Ba",
      description: "Inspection mensuelle de routine",
      estimatedDuration: "45min"
    },
    {
      id: "INT-004",
      distributorId: "D-012",
      distributorName: "Distributeur Gare",
      type: "Réparation",
      priority: "high",
      status: "en_attente",
      scheduledDate: "2024-01-22",
      scheduledTime: "08:00",
      technician: "Moussa Ndiaye",
      description: "Réparation complète - système hors service",
      estimatedDuration: "4h"
    },
    {
      id: "INT-005",
      distributorId: "D-003",
      distributorName: "Distributeur Marché",
      type: "Maintenance",
      priority: "low",
      status: "planifiee",
      scheduledDate: "2024-01-25",
      scheduledTime: "16:00",
      technician: "Aïssata Diop",
      description: "Maintenance préventive trimestrielle",
      estimatedDuration: "2h"
    }
  ];

  const technicians = [
    "Ahmed Diallo",
    "Fatou Sall", 
    "Omar Ba",
    "Moussa Ndiaye",
    "Aïssata Diop",
    "Ibrahima Sow"
  ];

  const distributorOptions = [
    { id: "D-001", name: "Distributeur Centre-ville" },
    { id: "D-003", name: "Distributeur Marché" },
    { id: "D-007", name: "Distributeur École" },
    { id: "D-008", name: "Distributeur Hôpital" },
    { id: "D-012", name: "Distributeur Gare" },
    { id: "D-015", name: "Distributeur Université" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'secondary';
      case 'planifiee': return 'default';
      case 'en_cours': return 'default';
      case 'terminee': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_attente': return AlertTriangle;
      case 'planifiee': return CalendarIcon;
      case 'en_cours': return Clock;
      case 'terminee': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'planifiee': return 'Planifiée';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Réparation': return Wrench;
      case 'Maintenance': return Filter;
      case 'Inspection': return User;
      default: return Wrench;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Planification des interventions</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle intervention
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Planifier une intervention</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="distributor">Distributeur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un distributeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {distributorOptions.map((dist) => (
                      <SelectItem key={dist.id} value={dist.id}>
                        {dist.id} - {dist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Type d'intervention</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type d'intervention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reparation">Réparation</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priorité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Urgente</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="low">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : "Choisir une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time">Heure</Label>
                <Input type="time" />
              </div>

              <div>
                <Label htmlFor="technician">Technicien</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Assigner un technicien" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech} value={tech.toLowerCase().replace(' ', '_')}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  placeholder="Détails de l'intervention..."
                  className="resize-none"
                />
              </div>

              <div>
                <Label htmlFor="duration">Durée estimée</Label>
                <Input placeholder="ex: 2h30" />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Planifier
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques des interventions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-orange-600">
              {interventions.filter(i => i.status === 'en_attente').length}
            </p>
            <p className="text-sm text-gray-600">En attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-blue-600">
              {interventions.filter(i => i.status === 'planifiee').length}
            </p>
            <p className="text-sm text-gray-600">Planifiées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-yellow-600">
              {interventions.filter(i => i.status === 'en_cours').length}
            </p>
            <p className="text-sm text-gray-600">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-green-600">
              {interventions.filter(i => i.status === 'terminee').length}
            </p>
            <p className="text-sm text-gray-600">Terminées</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des interventions */}
      <Card>
        <CardHeader>
          <CardTitle>Interventions programmées</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Distributeur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Date/Heure</TableHead>
                <TableHead>Technicien</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interventions.map((intervention) => {
                const TypeIcon = getTypeIcon(intervention.type);
                const StatusIcon = getStatusIcon(intervention.status);
                
                return (
                  <TableRow key={intervention.id}>
                    <TableCell className="font-mono">{intervention.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{intervention.distributorId}</p>
                        <p className="text-sm text-gray-600">{intervention.distributorName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-4 w-4" />
                        <span>{intervention.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(intervention.priority)}>
                        {intervention.priority === 'high' ? 'Urgente' : 
                         intervention.priority === 'medium' ? 'Moyenne' : 'Faible'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{intervention.scheduledDate}</p>
                        <p className="text-sm text-gray-600">{intervention.scheduledTime}</p>
                      </div>
                    </TableCell>
                    <TableCell>{intervention.technician}</TableCell>
                    <TableCell>{intervention.estimatedDuration}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={getStatusColor(intervention.status)}>
                          {getStatusLabel(intervention.status)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                        {intervention.status === 'en_attente' && (
                          <Button variant="ghost" size="sm">
                            Démarrer
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}