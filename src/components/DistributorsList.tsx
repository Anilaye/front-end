import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Filter, Eye, Wrench, MapPin } from "lucide-react";

interface DistributorsListProps {
  onDistributorSelect: (id: string) => void;
}

export function DistributorsList({ onDistributorSelect }: DistributorsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const distributors = [
    {
      id: "D-001",
      name: "Distributeur Centre-ville",
      location: "Place de l'Indépendance",
      coordinates: "14.7167, -17.4677",
      status: "inactive",
      volume: 0,
      maxVolume: 1000,
      filterState: "À remplacer",
      lastMaintenance: "2024-01-10",
      dailyAverage: 850
    },
    {
      id: "D-003",
      name: "Distributeur Marché",
      location: "Marché Sandaga",
      coordinates: "14.7200, -17.4650",
      status: "active",
      volume: 750,
      maxVolume: 1000,
      filterState: "Bon état",
      lastMaintenance: "2024-01-08",
      dailyAverage: 920
    },
    {
      id: "D-007",
      name: "Distributeur École",
      location: "École Primaire Liberté",
      coordinates: "14.7150, -17.4700",
      status: "active",
      volume: 420,
      maxVolume: 800,
      filterState: "À remplacer",
      lastMaintenance: "2024-01-05",
      dailyAverage: 680
    },
    {
      id: "D-008",
      name: "Distributeur Hôpital",
      location: "Hôpital Principal",
      coordinates: "14.7180, -17.4620",
      status: "active",
      volume: 150,
      maxVolume: 1200,
      filterState: "Bon état",
      lastMaintenance: "2024-01-12",
      dailyAverage: 1100
    },
    {
      id: "D-012",
      name: "Distributeur Gare",
      location: "Gare Routière",
      coordinates: "14.7140, -17.4680",
      status: "inactive",
      volume: 0,
      maxVolume: 900,
      filterState: "Défaillant",
      lastMaintenance: "2023-12-20",
      dailyAverage: 750
    },
    {
      id: "D-015",
      name: "Distributeur Université",
      location: "Campus Université",
      coordinates: "14.7250, -17.4750",
      status: "active",
      volume: 890,
      maxVolume: 1500,
      filterState: "Bon état",
      lastMaintenance: "2024-01-14",
      dailyAverage: 1250
    },
    {
      id: "D-018",
      name: "Distributeur Plateau",
      location: "Plateau Commercial",
      coordinates: "14.7195, -17.4485",
      status: "active",
      volume: 650,
      maxVolume: 1000,
      filterState: "Bon état",
      lastMaintenance: "2024-01-13",
      dailyAverage: 875
    },
    {
      id: "D-021",
      name: "Distributeur Médina",
      location: "Quartier Médina",
      coordinates: "14.7080, -17.4580",
      status: "active",
      volume: 320,
      maxVolume: 800,
      filterState: "À remplacer",
      lastMaintenance: "2024-01-09",
      dailyAverage: 650
    }
  ];

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || distributor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'destructive';
  };

  const getFilterColor = (state: string) => {
    switch (state) {
      case 'Bon état': return 'default';
      case 'À remplacer': return 'destructive';
      case 'Défaillant': return 'destructive';
      default: return 'secondary';
    }
  };

  const getVolumeColor = (volume: number, maxVolume: number) => {
    const percentage = (volume / maxVolume) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Liste des distributeurs - Dakar</h1>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Vue carte
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, ID ou localisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs uniquement</SelectItem>
                <SelectItem value="inactive">Inactifs uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-green-600">{distributors.filter(d => d.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Distributeurs actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-red-600">{distributors.filter(d => d.status === 'inactive').length}</p>
            <p className="text-sm text-gray-600">Distributeurs inactifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-orange-600">{distributors.filter(d => d.filterState !== 'Bon état').length}</p>
            <p className="text-sm text-gray-600">Filtres à changer</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-semibold text-blue-600">{Math.round(distributors.reduce((acc, d) => acc + d.dailyAverage, 0) / distributors.length)}L</p>
            <p className="text-sm text-gray-600">Moyenne quotidienne</p>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des distributeurs */}
      <Card>
        <CardHeader>
          <CardTitle>Distributeurs ({filteredDistributors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Coordonnées GPS</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>État filtre</TableHead>
                <TableHead>Dernière maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDistributors.map((distributor) => (
                <TableRow key={distributor.id}>
                  <TableCell className="font-mono">{distributor.id}</TableCell>
                  <TableCell>{distributor.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">{distributor.location}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-500">{distributor.coordinates}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(distributor.status)}>
                      {distributor.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <span className={getVolumeColor(distributor.volume, distributor.maxVolume)}>
                        {distributor.volume}L / {distributor.maxVolume}L
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-blue-500 h-1 rounded-full" 
                          style={{ width: `${(distributor.volume / distributor.maxVolume) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getFilterColor(distributor.filterState)}>
                      {distributor.filterState}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{distributor.lastMaintenance}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDistributorSelect(distributor.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Wrench className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}