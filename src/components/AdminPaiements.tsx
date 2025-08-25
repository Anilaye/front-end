import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  Download,
  Calendar,
  PieChart,
  Banknote,
  Smartphone,
  Eye
} from "lucide-react";

export function AdminPaiements() {
  // Données simulées pour les paiements
  const paiementsStats = {
    totalMois: 2547000, // en FCFA
    totalJour: 85400,
    totalDistributeurs: 15,
    moyenneParDistributeur: 169800,
    croissance: 12.5
  };

  const paiementsParDistributeur = [
    {
      id: "D-015",
      nom: "Distributeur Université",
      location: "Campus Université",
      montantJour: 15600,
      montantMois: 384000,
      modePrincipal: "mobile_money",
      pourcentageMobile: 85,
      pourcentageEspeces: 15,
      dernierPaiement: "2024-01-15 16:45",
      status: "actif"
    },
    {
      id: "D-003",
      nom: "Distributeur Marché",
      location: "Marché Sandaga", 
      montantJour: 12800,
      montantMois: 312000,
      modePrincipal: "mobile_money",
      pourcentageMobile: 78,
      pourcentageEspeces: 22,
      dernierPaiement: "2024-01-15 15:30",
      status: "actif"
    },
    {
      id: "D-018",
      nom: "Distributeur Plateau",
      location: "Plateau Commercial",
      montantJour: 11200,
      montantMois: 275000,
      modePrincipal: "mobile_money",
      pourcentageMobile: 90,
      pourcentageEspeces: 10,
      dernierPaiement: "2024-01-15 14:20",
      status: "actif"
    },
    {
      id: "D-008",
      nom: "Distributeur Hôpital",
      location: "Hôpital Principal",
      montantJour: 9800,
      montantMois: 245000,
      modePrincipal: "mobile_money",
      pourcentageMobile: 72,
      pourcentageEspeces: 28,
      dernierPaiement: "2024-01-15 13:15",
      status: "actif"
    },
    {
      id: "D-001",
      nom: "Distributeur Centre-ville",
      location: "Place de l'Indépendance",
      montantJour: 0,
      montantMois: 98000,
      modePrincipal: "hors_service",
      pourcentageMobile: 0,
      pourcentageEspeces: 0,
      dernierPaiement: "2024-01-12 10:30",
      status: "hors_service"
    }
  ];

  const transactionsRecentes = [
    {
      id: "TXN-20240115-1645",
      distributeur: "D-015",
      montant: 250,
      mode: "mobile_money",
      operateur: "Orange Money",
      heure: "16:45",
      volume: "5L",
      status: "confirme"
    },
    {
      id: "TXN-20240115-1632",
      distributeur: "D-003",
      montant: 500,
      mode: "mobile_money", 
      operateur: "Wave",
      heure: "16:32",
      volume: "10L",
      status: "confirme"
    },
    {
      id: "TXN-20240115-1620",
      distributeur: "D-018",
      montant: 150,
      mode: "especes",
      operateur: "Cash",
      heure: "16:20",
      volume: "3L",
      status: "confirme"
    },
    {
      id: "TXN-20240115-1608",
      distributeur: "D-008",
      montant: 300,
      mode: "mobile_money",
      operateur: "Free Money",
      heure: "16:08",
      volume: "6L",
      status: "confirme"
    }
  ];

  const anomaliesPaiements = [
    {
      id: "ANO-001",
      distributeur: "D-007",
      type: "paiement_suspect",
      message: "Transaction de 5000 FCFA inhabituelle (moyenne: 300 FCFA)",
      heure: "15:30",
      priorite: "moyenne"
    },
    {
      id: "ANO-002",
      distributeur: "D-021",
      type: "echec_paiement",
      message: "3 échecs de paiement mobile money consécutifs",
      heure: "14:45",
      priorite: "haute"
    },
    {
      id: "ANO-003",
      distributeur: "D-012",
      type: "revenus_faibles",
      message: "Revenus 60% inférieurs à la moyenne cette semaine",
      heure: "12:00",
      priorite: "faible"
    }
  ];

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'mobile_money': return <Smartphone className="h-4 w-4 text-blue-600" />;
      case 'especes': return <Banknote className="h-4 w-4 text-green-600" />;
      default: return <CreditCard className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirme': return 'secondary';
      case 'en_attente': return 'default';
      case 'echec': return 'destructive';
      default: return 'default';
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'destructive';
      case 'moyenne': return 'default';
      case 'faible': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header Admin Paiements */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Admin - Contrôle des Paiements
              </h1>
              <p className="text-purple-600 font-medium">
                Suivi financier en temps réel - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Gestion et analyse des revenus du réseau Anilaye
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Revenus aujourd'hui</p>
                <p className="font-semibold text-green-600">{formatMontant(paiementsStats.totalJour)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Financiers */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-600">{formatMontant(paiementsStats.totalMois)}</p>
            <p className="text-xs text-gray-600">Revenus ce mois</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Banknote className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-blue-600">{formatMontant(paiementsStats.totalJour)}</p>
            <p className="text-xs text-gray-600">Revenus aujourd'hui</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-purple-600">{formatMontant(paiementsStats.moyenneParDistributeur)}</p>
            <p className="text-xs text-gray-600">Moyenne/distributeur</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-orange-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-lg font-bold text-orange-600">3</p>
            <p className="text-xs text-gray-600">Anomalies détectées</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-emerald-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-lg font-bold text-emerald-600">+{paiementsStats.croissance}%</p>
            <p className="text-xs text-gray-600">Croissance mensuelle</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="distributeurs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distributeurs">Par distributeur</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="rapports">Rapports</TabsTrigger>
        </TabsList>

        {/* Paiements par distributeur */}
        <TabsContent value="distributeurs" className="space-y-4">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Revenus par distributeur</span>
                </CardTitle>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Aujourd'hui</TableHead>
                    <TableHead>Ce mois</TableHead>
                    <TableHead>Mode principal</TableHead>
                    <TableHead>Mobile Money</TableHead>
                    <TableHead>Espèces</TableHead>
                    <TableHead>Dernier paiement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paiementsParDistributeur.map((distributeur) => (
                    <TableRow key={distributeur.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{distributeur.id}</p>
                          <p className="text-sm text-gray-600">{distributeur.nom}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{distributeur.location}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatMontant(distributeur.montantJour)}
                      </TableCell>
                      <TableCell className="font-medium text-blue-600">
                        {formatMontant(distributeur.montantMois)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModeIcon(distributeur.modePrincipal)}
                          <span className="text-sm">
                            {distributeur.modePrincipal === 'mobile_money' ? 'Mobile Money' : 
                             distributeur.modePrincipal === 'especes' ? 'Espèces' : 'Hors service'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={distributeur.pourcentageMobile} className="w-16 h-2" />
                          <span className="text-sm">{distributeur.pourcentageMobile}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={distributeur.pourcentageEspeces} className="w-16 h-2" />
                          <span className="text-sm">{distributeur.pourcentageEspeces}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{distributeur.dernierPaiement}</TableCell>
                      <TableCell>
                        <Badge variant={distributeur.status === 'actif' ? 'default' : 'destructive'}>
                          {distributeur.status === 'actif' ? 'Actif' : 'Hors service'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions récentes */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transactions en temps réel</h3>
            <div className="flex items-center space-x-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
              <Button className="anilaye-button">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
          
          <Card className="anilaye-card border-purple-100">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transaction</TableHead>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Opérateur</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsRecentes.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell className="font-medium">{transaction.distributeur}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatMontant(transaction.montant)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModeIcon(transaction.mode)}
                          <span className="text-sm">
                            {transaction.mode === 'mobile_money' ? 'Mobile Money' : 'Espèces'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{transaction.operateur}</TableCell>
                      <TableCell className="text-sm font-medium text-blue-600">{transaction.volume}</TableCell>
                      <TableCell className="text-sm">{transaction.heure}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status === 'confirme' ? 'Confirmé' : transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anomalies et alertes */}
        <TabsContent value="anomalies" className="space-y-4">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Anomalies de paiement détectées</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {anomaliesPaiements.map((anomalie) => (
                  <div key={anomalie.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-gray-900">
                            Distributeur {anomalie.distributeur}
                          </span>
                          <Badge variant={getPriorityColor(anomalie.priorite)}>
                            {anomalie.priorite}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{anomalie.message}</p>
                        <p className="text-xs text-gray-500">Détecté à {anomalie.heure}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          Analyser
                        </Button>
                        <Button size="sm" className="anilaye-button">
                          Résoudre
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rapports financiers */}
        <TabsContent value="rapports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Évolution des revenus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">Janvier 2024</span>
                    <span className="text-lg font-bold text-green-600">{formatMontant(2547000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Décembre 2023</span>
                    <span className="text-lg font-bold text-blue-600">{formatMontant(2265000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="text-sm font-medium">Novembre 2023</span>
                    <span className="text-lg font-bold text-purple-600">{formatMontant(2145000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <span>Répartition des modes de paiement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                        <span>Mobile Money</span>
                      </span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center space-x-2">
                        <Banknote className="h-4 w-4 text-green-600" />
                        <span>Espèces</span>
                      </span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="pt-2 text-sm text-gray-600">
                    Total traité ce mois: {formatMontant(paiementsStats.totalMois)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}