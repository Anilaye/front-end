import { Home, BarChart2, CreditCard, FileText } from "lucide-react";
import logoAnilaye from '/src/assets/logoAnilaye.png';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={logoAnilaye} 
              alt="Anilaye Logo" 
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 text-white">Anilaye</span>
              <span className="text-xs text-purple-600 font-medium text-white">O'SEN-Ndoxmusell</span>
            </div>
          </div>
        </div>
          {/* <div className="flex justify-center mb-4">
            <img 
                src={logoAnilaye} 
                alt="Anilaye Logo" 
                className="h-20 w-20 rounded-full anilaye-logo"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Anilaye</h1>
              <p className="text-sm opacity-90">O'SEN-Ndoxmusell</p>
            </div>
          </div> */}

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/20">
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10">
                <BarChart2 className="h-4 w-4" />
                <span>État Distributeur</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10">
                <CreditCard className="h-4 w-4" />
                <span>Transaction</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10">
                <FileText className="h-4 w-4" />
                <span>Rapport</span>
              </a>
            </nav>

            {/* User Info */}
            <div className="text-right">
              <p className="text-sm font-medium">Administrateur Anilaye</p>
              <p className="text-xs opacity-75">Administrateur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
