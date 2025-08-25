import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  RefreshCw,
  TrendingUp,
  DollarSign,
  Smartphone,
  Banknote,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

export function TransactionsManagement() {
  const transactions = [
    {
      id: "TXN-20240115-1645",
      horodatage: "2024-01-15 16:45:32",
      distributeur: "D-015",
      location: "Campus Université",
      montant: 250,
      volume: "5L",
      mode: "mobile_money",
      operateur: "Orange Money",
      numeroClient: "+221 77 123 45 67",
      referenceTransaction: "OM202401151645001",
      statut: "confirme",
      commission: 12.5,
      montantNet: 237.5
    },
    {
      id: "TXN-20240115-1632",
      horodatage: "2024-01-15 16:32:18",
      distributeur: "D-003",
      location: "Marché Sandaga",
      montant: 500,
      volume: "10L",
      mode: "mobile_money",
      operateur: "Wave",
      numeroClient: "+221 76 987 65 43",
      referenceTransaction: "WV202401151632015",
      statut: "confirme",
      commission: 15,
      montantNet: 485
    },
    {
      id: "TXN-20240115-1620",
      horodatage: "2024-01-15 16:20:45",
      distributeur: "D-018",
      location: "Plateau Commercial",
      montant: 150,
      volume: "3L",
      mode: "especes",
      operateur: "Cash",
      numeroClient: "N/A",
      referenceTransaction: "CASH202401151620",
      statut: "confirme",
      commission: 0,
      montantNet: 150
    },
    {
      id: "TXN-20240115-1608",
      horodatage: "2024-01-15 16:08:22",
      distributeur: "D-008",
      location: "Hôpital Principal",
      montant: 300,
      volume: "6L",
      mode: "mobile_money",
      operateur: "Free Money",
      numeroClient: "+221 78 456 78 90",
      referenceTransaction: "FM202401151608088",
      statut: "confirme",
      commission: 9,
      montantNet: 291
    },
    {
      id: "TXN-20240115-1555",
      horodatage: "2024-01-15 15:55:12",
      distributeur: "D-021",
      location: "École Primaire Yoff",
      montant: 400,
      volume: "8L",
      mode: "mobile_money",
      operateur: "Orange Money",
      numeroClient: "+221 77 234 56 78",
      referenceTransaction: "OM202401151555044",
      statut: "en_attente",
      commission: 20,
      montantNet: 380
    },
    {
      id: "TXN-20240115-1540",
      horodatage: "2024-01-15 15:40:08",
      distributeur: "D-012",
      location: "Gare Routière",
      montant: 200,
      volume: "4L",
      mode: "mobile_money",
      operateur: "Wave",
      numeroClient: "+221 76 345 67 89",
      referenceTransaction: "WV202401151540022",
      statut: "echec",
      commission: 0,
      montantNet: 0
    }
  ];

  const statistiques = {
    totalTransactions: transactions.length,
    volumeTotal: transactions.reduce((acc, t) => acc + t.montant, 0),
    transactionsReussies: transactions.filter(t => t.statut === 'confirme').length,
    transactionsEchec: transactions.filter(t => t.statut === 'echec').length,
    commissionTotale: transactions.reduce((acc, t) => acc + t.commission, 0),
    montantNetTotal: transactions.reduce((acc, t) => acc + t.montantNet, 0)
  };

  const repartitionModes = {
    mobile_money: transactions.filter(t => t.mode === 'mobile_money').length,
    especes: transactions.filter(t => t.mode === 'especes').length
  };

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

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'confirme': return 'default';
      case 'en_attente': return 'secondary';
      case 'echec': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'confirme': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'en_attente': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'echec': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getOperateurColor = (operateur: string) => {
    switch (operateur) {
      case 'Orange Money': return 'bg-orange-100 text-orange-800';
      case 'Wave': return 'bg-blue-100 text-blue-800';
      case 'Free Money': return 'bg-purple-100 text-purple-800';
      case 'Cash': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Gestion des Transactions
              </h1>
              <p className="text-purple-600 font-medium">
                Suivi détaillé des paiements - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Analyse et contrôle des transactions financières en temps réel
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <Button className="anilaye-button">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-blue-600">{statistiques.totalTransactions}</p>
            <p className="text-xs text-gray-600">Total</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-600">{formatMontant(statistiques.volumeTotal)}</p>
            <p className="text-xs text-gray-600">Volume</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-emerald-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-emerald-600">{statistiques.transactionsReussies}</p>
            <p className="text-xs text-gray-600">Réussies</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-red-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-xl font-bold text-red-600">{statistiques.transactionsEchec}</p>
            <p className="text-xs text-gray-600">Échecs</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-purple-600">{formatMontant(statistiques.commissionTotale)}</p>
            <p className="text-xs text-gray-600">Commissions</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-cyan-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Banknote className="h-6 w-6 text-cyan-600" />
            </div>
            <p className="text-lg font-bold text-cyan-600">{formatMontant(statistiques.montantNetTotal)}</p>
            <p className="text-xs text-gray-600">Net</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="transactions">Toutes les transactions</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
            <TabsTrigger value="especes">Espèces</TabsTrigger>
            <TabsTrigger value="echecs">Échecs</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Rechercher par ID ou référence..." className="pl-10 w-64" />
            </div>
            <Select defaultValue="aujourd'hui">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aujourd'hui">Aujourd'hui</SelectItem>
                <SelectItem value="hier">Hier</SelectItem>
                <SelectItem value="semaine">Cette semaine</SelectItem>
                <SelectItem value="mois">Ce mois</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Toutes les transactions */}
        <TabsContent value="transactions">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Transactions récentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transaction</TableHead>
                    <TableHead>Horodatage</TableHead>
                    <TableHead>Distributeur</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Opérateur</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Net</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell className="text-sm">{transaction.horodatage}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.distributeur}</p>
                          <p className="text-xs text-gray-500">{transaction.location}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatMontant(transaction.montant)}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-blue-600">
                        {transaction.volume}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModeIcon(transaction.mode)}
                          <span className="text-sm">
                            {transaction.mode === 'mobile_money' ? 'Mobile' : 'Espèces'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getOperateurColor(transaction.operateur)}>
                          {transaction.operateur}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-orange-600">
                        {formatMontant(transaction.commission)}
                      </TableCell>
                      <TableCell className="font-medium text-purple-600">
                        {formatMontant(transaction.montantNet)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatutIcon(transaction.statut)}
                          <Badge variant={getStatutColor(transaction.statut)}>
                            {transaction.statut === 'confirme' ? 'Confirmé' : 
                             transaction.statut === 'en_attente' ? 'En attente' : 'Échec'}
                          </Badge>
                        </div>
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

        {/* Transactions Mobile Money */}
        <TabsContent value="mobile">
          <Card className="anilaye-card border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <span>Transactions Mobile Money</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {['Orange Money', 'Wave', 'Free Money'].map((operateur) => {
                  const transactionsOperateur = transactions.filter(t => t.operateur === operateur);
                  const volumeOperateur = transactionsOperateur.reduce((acc, t) => acc + t.montant, 0);
                  
                  return (
                    <Card key={operateur} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{operateur}</span>
                          <Badge className={getOperateurColor(operateur)}>
                            {transactionsOperateur.length}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Volume total</span>
                            <span className="font-medium">{formatMontant(volumeOperateur)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Transactions</span>
                            <span className="font-medium">{transactionsOperateur.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Taux de succès</span>
                            <span className="font-medium text-green-600">
                              {Math.round((transactionsOperateur.filter(t => t.statut === 'confirme').length / transactionsOperateur.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions en espèces */}
        <TabsContent value="especes">
          <Card className="anilaye-card border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Banknote className="h-5 w-5 text-green-600" />
                <span>Transactions en espèces</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Banknote className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Paiements en espèces</h3>
                <p className="text-gray-600 mb-4">
                  {transactions.filter(t => t.mode === 'especes').length} transaction(s) en espèces
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatMontant(transactions.filter(t => t.mode === 'especes').reduce((acc, t) => acc + t.montant, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">Volume total collecté</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions en échec */}
        <TabsContent value="echecs">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Transactions en échec</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {transactions.filter(t => t.statut === 'echec').length > 0 ? (
                <div className="space-y-4">
                  {transactions.filter(t => t.statut === 'echec').map((transaction) => (
                    <div key={transaction.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-red-900">{transaction.id}</h4>
                          <p className="text-sm text-red-700">{transaction.horodatage}</p>
                          <p className="text-sm text-red-600">
                            {transaction.distributeur} - {formatMontant(transaction.montant)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="border-red-300">
                          Analyser
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun échec</h3>
                  <p className="text-gray-600">Toutes les transactions ont été traitées avec succès</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}