import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, Droplets } from 'lucide-react';

interface MapDistributor {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'inactive';
  volume: number;
  maxVolume: number;
  location: string;
}

interface InteractiveMapProps {
  distributors: MapDistributor[];
  onDistributorSelect: (id: string) => void;
}

export function InteractiveMap({ distributors, onDistributorSelect }: InteractiveMapProps) {
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null);

  // Coordonnées de Dakar pour centrer la carte
  const mapCenter = { lat: 14.7167, lng: -17.4677 };
  const mapZoom = 13;

  // Calculer la position relative sur la carte
  const getMarkerPosition = (lat: number, lng: number) => {
    // Dimensions de la zone visible (approximative pour Dakar)
    const latRange = 0.08; // environ 9km
    const lngRange = 0.08; // environ 7km
    
    const x = ((lng - (mapCenter.lng - lngRange/2)) / lngRange) * 100;
    const y = ((mapCenter.lat + latRange/2 - lat) / latRange) * 100;
    
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'destructive';
  };

  const getVolumeColor = (volume: number, maxVolume: number) => {
    const percentage = (volume / maxVolume) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="relative h-full w-full map-container rounded-lg overflow-hidden border border-purple-200">
      {/* Carte de fond stylisée avec thème Anilaye */}
      <div className="absolute inset-0">
        {/* Grille pour simuler une carte */}
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7C3AED" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Éléments de carte stylisés */}
        <div className="absolute inset-0">
          {/* Routes principales */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-purple-200 opacity-40"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-purple-200 opacity-40"></div>
          
          {/* Zones d'eau (simulent la côte) avec thème Anilaye */}
          <div className="absolute bottom-0 right-0 w-32 h-20 bg-gradient-to-tl from-cyan-200 to-blue-200 opacity-60 rounded-tl-full water-effect"></div>
          <div className="absolute top-0 left-0 w-24 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 opacity-60 rounded-br-full water-effect"></div>
          
          {/* Zones urbaines */}
          <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-purple-100 opacity-70 rounded border border-purple-200"></div>
          <div className="absolute bottom-1/3 right-1/3 w-12 h-16 bg-purple-100 opacity-70 rounded border border-purple-200"></div>
        </div>
      </div>

      {/* Labels de zones avec style Anilaye */}
      <div className="absolute top-4 left-4 text-xs font-medium text-purple-700 bg-white/90 px-3 py-2 rounded-full border border-purple-200 shadow-sm">
        Dakar, Sénégal
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-blue-600 bg-white/90 px-3 py-2 rounded-full border border-blue-200 shadow-sm">
        Océan Atlantique
      </div>

      {/* Marqueurs des distributeurs */}
      {distributors.map((distributor) => {
        const position = getMarkerPosition(distributor.lat, distributor.lng);
        const isSelected = selectedDistributor === distributor.id;
        
        return (
          <div key={distributor.id}>
            {/* Marqueur */}
            <button
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                isSelected ? 'scale-125 z-20' : 'z-10'
              }`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
              onClick={() => setSelectedDistributor(isSelected ? null : distributor.id)}
            >
              <div className={`w-7 h-7 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
                distributor.status === 'active' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}>
                <Droplets className="w-4 h-4 text-white" />
              </div>
              {/* Pulse animation pour les distributeurs actifs */}
              {distributor.status === 'active' && (
                <div className="absolute inset-0 w-7 h-7 rounded-full bg-green-400 animate-ping opacity-40"></div>
              )}
              {/* Effet de ondulation */}
              <div className="absolute inset-0 w-7 h-7 rounded-full border-2 border-purple-400 opacity-30 animate-pulse"></div>
            </button>

            {/* Popup d'information avec style Anilaye */}
            {isSelected && (
              <div
                className="absolute z-30 bg-white rounded-xl shadow-2xl border border-purple-200 p-4 w-72 transform -translate-x-1/2 map-popup"
                style={{
                  left: `${position.x}%`,
                  top: `${Math.max(10, position.y - 15)}%`
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{distributor.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{distributor.location}</p>
                      <p className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded mt-2">
                        {distributor.id}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(distributor.status)} className="text-xs">
                      {distributor.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span>Volume:</span>
                      </span>
                      <span className={getVolumeColor(distributor.volume, distributor.maxVolume)}>
                        {distributor.volume}L / {distributor.maxVolume}L
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="anilaye-gradient h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(distributor.volume / distributor.maxVolume) * 100}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <strong>{((distributor.volume / distributor.maxVolume) * 100).toFixed(1)}%</strong> restant
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs anilaye-button"
                      onClick={() => onDistributorSelect(distributor.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Voir détails
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-200 hover:bg-purple-50"
                      onClick={() => setSelectedDistributor(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                {/* Flèche de la popup */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-white border-b border-r border-purple-200 rotate-45 transform origin-center"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Légende avec style Anilaye */}
      <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl p-4 border border-purple-200 shadow-lg backdrop-blur-sm">
        <div className="space-y-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <span className="font-medium">Distributeurs actifs ({distributors.filter(d => d.status === 'active').length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
            <span className="font-medium">Distributeurs inactifs ({distributors.filter(d => d.status === 'inactive').length})</span>
          </div>
          <div className="text-gray-500 text-xs mt-3 pt-3 border-t border-purple-100">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Réseau Anilaye - O'SEN-Ndoxmusell</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coordonnées avec style Anilaye */}
      <div className="absolute top-4 right-4 bg-white/95 rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-purple-200 shadow-sm">
        {mapCenter.lat.toFixed(4)}°N, {Math.abs(mapCenter.lng).toFixed(4)}°W
      </div>
    </div>
  );
}