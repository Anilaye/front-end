import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Calendar } from "lucide-react";

export function Reports() {
  const monthlyData = [
    { month: 'Jan', volume: 12500 },
    { month: 'Fév', volume: 15200 },
    { month: 'Mar', volume: 18750 },
    { month: 'Avr', volume: 16800 },
    { month: 'Mai', volume: 21300 },
    { month: 'Jun', volume: 19600 }
  ];

  const dailyData = [
    { day: 'Lun', volume: 850 },
    { day: 'Mar', volume: 920 },
    { day: 'Mer', volume: 780 },
    { day: 'Jeu', volume: 1150 },
    { day: 'Ven', volume: 990 },
    { day: 'Sam', volume: 1200 },
    { day: 'Dim', volume: 680 }
  ];

  const distributorData = [
    { name: 'D-001', volume: 2500, color: '#3B82F6' },
    { name: 'D-003', volume: 4200, color: '#10B981' },
    { name: 'D-007', volume: 3800, color: '#F59E0B' },
    { name: 'D-008', volume: 3100, color: '#EF4444' },
    { name: 'D-012', volume: 1900, color: '#8B5CF6' }
  ];

  const handleExportPDF = () => {
    alert('Export PDF en cours de développement...');
  };

  const handleExportExcel = () => {
    alert('Export Excel en cours de développement...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Rapports</h1>
        <div className="flex items-center space-x-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 mois</SelectItem>
              <SelectItem value="3months">3 mois</SelectItem>
              <SelectItem value="6months">6 mois</SelectItem>
              <SelectItem value="1year">1 an</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportPDF} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Graphique volume mensuel */}
      <Card>
        <CardHeader>
          <CardTitle>Volume distribué par mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}L`, 'Volume']} />
                <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique évolution hebdomadaire */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}L`, 'Volume']} />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Répartition par distributeur */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par distributeur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="volume"
                  >
                    {distributorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}L`, 'Volume']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {distributorData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.volume}L</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques résumées */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-blue-600">104,550L</p>
            <p className="text-sm text-gray-600">Total distribué</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-green-600">17,425L</p>
            <p className="text-sm text-gray-600">Moyenne mensuelle</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-orange-600">1,248</p>
            <p className="text-sm text-gray-600">Transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-purple-600">84L</p>
            <p className="text-sm text-gray-600">Volume moyen/transaction</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}