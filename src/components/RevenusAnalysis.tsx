import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Calendar,
  MapPin,
  Download,
  Target,
  Award,
  AlertCircle
} from "lucide-react";

export function RevenusAnalysis() {
  const revenusData = {
    aujourdhui: 85400,
    hier: 78200,
    semaine: 547800,
    mois: 2547000,
    trimestre: 7125000,
    annee: 28450000,
    croissanceJour: 9.2,
    croissanceSemaine: 12.5,
    croissanceMois: 8.7,
    objectifMois: 2800000,
    tauxObjectif: 91
  };

  const revenusParDistributeur = [
    { id: "D-015", nom: "Campus Université", revenus: 384000, croissance: 15.2, part: 15.1 },
    { id: "D-003", nom: "Marché Sandaga", revenus: 312000, croissance: 8.9, part: 12.2 },
    { id: "D-018", nom: "Plateau Commercial", revenus: 275000, croissance: 12.1, part: 10.8 },
    { id: "D-008", nom: "Hôpital Principal", revenus: 245000, croissance: -2.3, part: 9.6 },
    { id: "D-021", nom: "École Yoff", revenus: 234000, croissance: 18.7, part: 9.2 },
    { id: "D-012", nom: "Gare Routière", revenus: 198000, croissance: 5.4, part: 7.8 },
    { id: "D-007", nom: "École Liberté", revenus: 187000, croissance: 22.1, part: 7.3 },
    { id: "D-001", nom: "Place Indépendance", revenus: 156000, croissance: -15.8, part: 6.1 },
    { id: "D-009", nom: "Marché Tilène", revenus: 145000, croissance: 9.8, part: 5.7 },
    { id: "D-006", nom: "Hôtel de Ville", revenus: 134000, croissance: 14.3, part: 5.3 }
  ];

  const evolutionMensuelle = [
    { mois: "Août 2023", revenus: 1950000, croissance: 0 },
    { mois: "Sept 2023", revenus: 2100000, croissance: 7.7 },
    { mois: "Oct 2023", revenus: 2180000, croissance: 3.8 },
    { mois: "Nov 2023", revenus: 2145000, croissance: -1.6 },
    { mois: "Déc 2023", revenus: 2265000, croissance: 5.6 },
    { mois: "Jan 2024", revenus: 2547000, croissance: 12.5 }
  ];

  const repartitionTemporelle = {
    matin: { part: 35, revenus: 891450 },
    apresmidi: { part: 45, revenus: 1146150 },
    soir: { part: 20, revenus: 509400 }
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  const getCroissanceColor = (croissance: number) => {
    return croissance >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getCroissanceIcon = (croissance: number) => {
    return croissance >= 0 ? '↗' : '↘';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-cyan-50/30 min-h-full">
      {/* Header */}
      <Card className="anilaye-card border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Analyse des Revenus
              </h1>
              <p className="text-purple-600 font-medium">
                Analyse financière détaillée - O'SEN-Ndoxmusell
              </p>
              <p className="text-gray-600 mt-1">
                Suivi de performance et tendances de revenus
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="anilaye-gradient p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <Button className="anilaye-button">
                <Download className="h-4 w-4 mr-2" />
                Rapport détaillé
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Revenus */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="anilaye-card border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className={`text-sm ${getCroissanceColor(revenusData.croissanceJour)}`}>
                {getCroissanceIcon(revenusData.croissanceJour)} {Math.abs(revenusData.croissanceJour)}%
              </span>
            </div>
            <p className="text-lg font-bold text-green-600">{formatMontant(revenusData.aujourdhui)}</p>
            <p className="text-xs text-gray-600">Aujourd'hui</p>
          </CardContent>
        </Card>
        
        <Card className="anilaye-card border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className={`text-sm ${getCroissanceColor(revenusData.croissanceSemaine)}`}>
                {getCroissanceIcon(revenusData.croissanceSemaine)} {Math.abs(revenusData.croissanceSemaine)}%
              </span>
            </div>
            <p className="text-lg font-bold text-blue-600">{formatMontant(revenusData.semaine)}</p>
            <p className="text-xs text-gray-600">Cette semaine</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className={`text-sm ${getCroissanceColor(revenusData.croissanceMois)}`}>
                {getCroissanceIcon(revenusData.croissanceMois)} {Math.abs(revenusData.croissanceMois)}%
              </span>
            </div>
            <p className="text-lg font-bold text-purple-600">{formatMontant(revenusData.mois)}</p>
            <p className="text-xs text-gray-600">Ce mois</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-cyan-600" />
              <span className="text-sm text-gray-600">{revenusData.tauxObjectif}%</span>
            </div>
            <p className="text-lg font-bold text-cyan-600">{formatMontant(revenusData.objectifMois)}</p>
            <p className="text-xs text-gray-600">Objectif mensuel</p>
          </CardContent>
        </Card>

        <Card className="anilaye-card border-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-green-600">+{revenusData.croissanceMois}%</span>
            </div>
            <p className="text-lg font-bold text-yellow-600">{formatMontant(revenusData.trimestre)}</p>
            <p className="text-xs text-gray-600">Ce trimestre</p>
          </CardContent>
        </Card>
      </div>

      {/* Objectif mensuel */}
      <Card className="anilaye-card border-purple-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Progression vers l'objectif mensuel</h3>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium">{revenusData.tauxObjectif}% atteint</span>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={revenusData.tauxObjectif} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Réalisé: {formatMontant(revenusData.mois)}</span>
              <span>Objectif: {formatMontant(revenusData.objectifMois)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      <Tabs defaultValue="distributeurs" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="distributeurs">Par distributeur</TabsTrigger>
            <TabsTrigger value="evolution">Évolution</TabsTrigger>
            <TabsTrigger value="repartition">Répartition</TabsTrigger>
            <TabsTrigger value="comparaison">Comparaison</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue="mois">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jour">Aujourd'hui</SelectItem>
                <SelectItem value="semaine">Cette semaine</SelectItem>
                <SelectItem value="mois">Ce mois</SelectItem>
                <SelectItem value="trimestre">Ce trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Revenus par distributeur */}
        <TabsContent value="distributeurs">
          <Card className="anilaye-card border-purple-100">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Performance par distributeur</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {revenusParDistributeur.map((distributeur, index) => (
                  <div key={distributeur.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{distributeur.id}</h4>
                          <p className="text-sm text-gray-600">{distributeur.nom}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">{formatMontant(distributeur.revenus)}</p>
                          <p className="text-xs text-gray-600">Revenus</p>
                        </div>
                        
                        <div className="text-center">
                          <p className={`text-sm font-medium ${getCroissanceColor(distributeur.croissance)}`}>
                            {getCroissanceIcon(distributeur.croissance)} {Math.abs(distributeur.croissance)}%
                          </p>
                          <p className="text-xs text-gray-600">Croissance</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-purple-600">{distributeur.part}%</p>
                          <p className="text-xs text-gray-600">Part totale</p>
                        </div>
                        
                        <div className="w-32">
                          <Progress value={distributeur.part} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Évolution temporelle */}
        <TabsContent value="evolution">
          <Card className="anilaye-card border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Évolution des revenus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evolutionMensuelle.map((periode) => (
                  <div key={periode.mois} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">{periode.mois}</span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-bold text-lg text-blue-600">{formatMontant(periode.revenus)}</p>
                        <p className="text-xs text-gray-600">Revenus</p>
                      </div>
                      
                      {periode.croissance !== 0 && (
                        <div className="text-right">
                          <p className={`font-medium ${getCroissanceColor(periode.croissance)}`}>
                            {getCroissanceIcon(periode.croissance)} {Math.abs(periode.croissance)}%
                          </p>
                          <p className="text-xs text-gray-600">Variation</p>
                        </div>
                      )}
                      
                      <div className="w-32">
                        <Progress 
                          value={(periode.revenus / Math.max(...evolutionMensuelle.map(p => p.revenus))) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Répartition temporelle */}
        <TabsContent value="repartition">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(repartitionTemporelle).map(([periode, data]) => (
              <Card key={periode} className="anilaye-card border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="capitalize">{periode === 'apresmidi' ? 'Après-midi' : periode}</span>
                    <Badge variant="outline">{data.part}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{formatMontant(data.revenus)}</p>
                      <p className="text-sm text-gray-600">Revenus générés</p>
                    </div>
                    
                    <Progress value={data.part} className="h-3" />
                    
                    <div className="text-center">
                      <p className="text-lg font-medium text-purple-600">{data.part}%</p>
                      <p className="text-xs text-gray-600">Part du chiffre d'affaires</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Comparaison et benchmarks */}
        <TabsContent value="comparaison">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Top performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenusParDistributeur.slice(0, 5).map((distributeur, index) => (
                    <div key={distributeur.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-400 text-white' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{distributeur.nom}</p>
                          <p className="text-sm text-gray-600">{distributeur.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatMontant(distributeur.revenus)}</p>
                        <p className={`text-xs ${getCroissanceColor(distributeur.croissance)}`}>
                          {getCroissanceIcon(distributeur.croissance)} {Math.abs(distributeur.croissance)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="anilaye-card border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span>Points d'attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenusParDistributeur
                    .filter(d => d.croissance < 0)
                    .map((distributeur) => (
                      <div key={distributeur.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-red-900">{distributeur.nom}</p>
                            <p className="text-sm text-red-700">{distributeur.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">{formatMontant(distributeur.revenus)}</p>
                            <p className="text-sm text-red-600">
                              ↘ {Math.abs(distributeur.croissance)}%
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-red-600 mt-2">Baisse de performance - Analyse recommandée</p>
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