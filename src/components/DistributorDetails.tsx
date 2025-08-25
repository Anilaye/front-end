import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { ArrowLeft, Camera, Wrench, Droplets, Filter } from "lucide-react";

interface DistributorDetailsProps {
  distributorId: string;
  onBack: () => void;
}

export function DistributorDetails({ distributorId, onBack }: DistributorDetailsProps) {
  const distributorData = {
    "D-001": {
      name: "Distributeur Centre-ville",
      status: "inactive",
      volume: 0,
      maxVolume: 1000,
      filterState: "À remplacer",
      location: "Place de l'Indépendance"
    },
    "D-003": {
      name: "Distributeur Marché",
      status: "active",
      volume: 750,
      maxVolume: 1000,
      filterState: "Bon état",
      location: "Marché Sandaga"
    },
    "D-007": {
      name: "Distributeur École",
      status: "active",
      volume: 420,
      maxVolume: 800,
      filterState: "À remplacer",
      location: "École Primaire Liberté"
    },
    "D-008": {
      name: "Distributeur Hôpital",
      status: "active",
      volume: 150,
      maxVolume: 1200,
      filterState: "Bon état",
      location: "Hôpital Principal"
    },
    "D-012": {
      name: "Distributeur Gare",
      status: "inactive",
      volume: 0,
      maxVolume: 900,
      filterState: "Défaillant",
      location: "Gare Routière"
    }
  };

  const transactions = [
    { id: 1, date: "2024-01-15 14:30", volume: "25L", user: "Client-001", amount: "500 CFA" },
    { id: 2, date: "2024-01-15 13:15", volume: "50L", user: "Client-045", amount: "1000 CFA" },
    { id: 3, date: "2024-01-15 12:00", volume: "20L", user: "Client-023", amount: "400 CFA" },
    { id: 4, date: "2024-01-15 10:45", volume: "75L", user: "Client-067", amount: "1500 CFA" },
    { id: 5, date: "2024-01-15 09:30", volume: "30L", user: "Client-012", amount: "600 CFA" }
  ];

  const distributor = distributorData[distributorId as keyof typeof distributorData] || distributorData["D-003"];
  const volumePercentage = (distributor.volume / distributor.maxVolume) * 100;

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-semibold">{distributor.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo/Icône du distributeur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Photo du distributeur</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Droplets className="h-16 w-16 mx-auto text-blue-500" />
                <p className="text-sm text-gray-600">{distributorId}</p>
                <p className="text-xs text-gray-500">{distributor.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* État et volume */}
        <Card>
          <CardHeader>
            <CardTitle>État général</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Statut :</span>
              <Badge variant={getStatusColor(distributor.status)}>
                {distributor.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Volume restant :</span>
                <span>{distributor.volume}L / {distributor.maxVolume}L</span>
              </div>
              <Progress value={volumePercentage} className="h-2" />
              <p className="text-xs text-gray-500">{volumePercentage.toFixed(1)}% restant</p>
            </div>

            <div className="flex items-center justify-between">
              <span>État filtre :</span>
              <Badge variant={getFilterColor(distributor.filterState)}>
                <Filter className="h-3 w-3 mr-1" />
                {distributor.filterState}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              <Wrench className="h-4 w-4 mr-2" />
              Planifier intervention
            </Button>
            <Button className="w-full" variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Prendre une photo
            </Button>
            <Button className="w-full" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Changer filtre
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Historique des transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.volume}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}