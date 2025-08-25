import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Filter, AlertTriangle, Droplets, Wrench, CheckCircle, X, Eye } from "lucide-react";

export function AlertsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');

  const alerts = [
    {
      id: "ALT-001",
      type: "incident",
      title: "Distributeur D-001 hors service",
      description: "Panne électrique - système complètement arrêté",
      distributorId: "D-001",
      distributorName: "Distributeur Centre-ville",
      priority: "high",
      status: "active",
      createdAt: "2024-01-15 09:15",
      resolvedAt: null,
      assignedTo: "Ahmed Diallo"
    },
    {
      id: "ALT-002",
      type: "niveau_bas",
      title: "Niveau bas sur D-003",
      description: "Volume restant: 150L (< 20% de la capacité)",
      distributorId: "D-003",
      distributorName: "Distributeur Marché",
      priority: "medium",
      status: "active",
      createdAt: "2024-01-15 14:30",
      resolvedAt: null,
      assignedTo: "Fatou Sall"
    },
    {
      id: "ALT-003",
      type: "filtre",
      title: "Filtre à remplacer sur D-007",
      description: "Filtre principal en fin de vie - remplacement requis",
      distributorId: "D-007",
      distributorName: "Distributeur École",
      priority: "low",
      status: "active",
      createdAt: "2024-01-14 16:45",
      resolvedAt: null,
      assignedTo: "Omar Ba"
    },
    {
      id: "ALT-004",
      type: "incident",
      title: "Problème de connexion D-012",
      description: "Perte de communication avec le distributeur",
      distributorId: "D-012",
      distributorName: "Distributeur Gare",
      priority: "high",
      status: "resolved",
      createdAt: "2024-01-13 11:20",
      resolvedAt: "2024-01-14 10:30",
      assignedTo: "Moussa Ndiaye"
    },
    {
      id: "ALT-005",
      type: "maintenance",
      title: "Maintenance préventive D-008",
      description: "Maintenance trimestrielle programmée",
      distributorId: "D-008",
      distributorName: "Distributeur Hôpital",
      priority: "low",
      status: "active",
      createdAt: "2024-01-12 08:00",
      resolvedAt: null,
      assignedTo: "Aïssata Diop"
    },
    {
      id: "ALT-006",
      type: "niveau_bas",
      title: "Niveau critique sur D-008",
      description: "Volume restant: 50L (< 5% de la capacité) - Recharge urgente",
      distributorId: "D-008",
      distributorName: "Distributeur Hôpital",
      priority: "high",
      status: "resolved",
      createdAt: "2024-01-11 18:45",
      resolvedAt: "2024-01-12 07:15",
      assignedTo: "Ahmed Diallo"
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.distributorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.distributorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'niveau_bas': return Droplets;
      case 'filtre': return Filter;
      case 'maintenance': return Wrench;
      default: return AlertTriangle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'incident': return 'text-red-600';
      case 'niveau_bas': return 'text-blue-600';
      case 'filtre': return 'text-orange-600';
      case 'maintenance': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Résoudre alerte:', alertId);
  };

  const handleDismissAlert = (alertId: string) => {
    console.log('Ignorer alerte:', alertId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestion des alertes</h1>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Configurer alertes
        </Button>
      </div>

      {/* Statistiques des alertes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-red-600">
              {alerts.filter(a => a.priority === 'high' && a.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Alertes urgentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-orange-600">
              {alerts.filter(a => a.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Alertes actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-green-600">
              {alerts.filter(a => a.status === 'resolved').length}
            </p>
            <p className="text-sm text-gray-600">Résolues aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-blue-600">
              {Math.round((alerts.filter(a => a.status === 'resolved').length / alerts.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Taux de résolution</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertes récentes urgentes */}
      {activeAlerts.filter(a => a.priority === 'high').length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Alertes urgentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.filter(a => a.priority === 'high').map((alert) => {
                const TypeIcon = getTypeIcon(alert.type);
                return (
                  <Alert key={alert.id} className="border-red-200">
                    <TypeIcon className="h-4 w-4" />
                    <AlertDescription className="ml-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {alert.distributorId} • {alert.createdAt} • Assigné à {alert.assignedTo}
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                            Résoudre
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par titre, distributeur ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="high">Urgente</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="resolved">Résolues</SelectItem>
                <SelectItem value="all">Toutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Onglets alertes */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes ({filteredAlerts.length})</TabsTrigger>
          <TabsTrigger value="active">Actives ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Résolues ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les alertes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Créée le</TableHead>
                    <TableHead>Assignée à</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => {
                    const TypeIcon = getTypeIcon(alert.type);
                    return (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div className={`flex items-center space-x-2 ${getTypeColor(alert.type)}`}>
                            <TypeIcon className="h-4 w-4" />
                            <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-mono">{alert.distributorId}</p>
                            <p className="text-sm text-gray-600">{alert.distributorName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(alert.priority)}>
                            {alert.priority === 'high' ? 'Urgente' : 
                             alert.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{alert.createdAt}</TableCell>
                        <TableCell>{alert.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {alert.status === 'active' ? (
                              <Badge variant="secondary">Active</Badge>
                            ) : (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <Badge variant="default">Résolue</Badge>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {alert.status === 'active' ? (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDismissAlert(alert.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Alertes actives</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Créée le</TableHead>
                    <TableHead>Assignée à</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAlerts.map((alert) => {
                    const TypeIcon = getTypeIcon(alert.type);
                    return (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div className={`flex items-center space-x-2 ${getTypeColor(alert.type)}`}>
                            <TypeIcon className="h-4 w-4" />
                            <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-mono">{alert.distributorId}</p>
                            <p className="text-sm text-gray-600">{alert.distributorName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(alert.priority)}>
                            {alert.priority === 'high' ? 'Urgente' : 
                             alert.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{alert.createdAt}</TableCell>
                        <TableCell>{alert.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Résoudre
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Alertes résolues</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Créée le</TableHead>
                    <TableHead>Résolue le</TableHead>
                    <TableHead>Durée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resolvedAlerts.map((alert) => {
                    const TypeIcon = getTypeIcon(alert.type);
                    return (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div className={`flex items-center space-x-2 ${getTypeColor(alert.type)}`}>
                            <TypeIcon className="h-4 w-4" />
                            <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-mono">{alert.distributorId}</p>
                            <p className="text-sm text-gray-600">{alert.distributorName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(alert.priority)}>
                            {alert.priority === 'high' ? 'Urgente' : 
                             alert.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{alert.createdAt}</TableCell>
                        <TableCell className="text-sm">{alert.resolvedAt}</TableCell>
                        <TableCell className="text-sm text-green-600">~13h</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}