import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Bell, Settings, LogOut, User } from "lucide-react";
import anilayeLogo from 'figma:asset/76e6e0f0884a41e2f2941922ef0aad8aa2ca14f5.png';

export function Header() {
  return (
    <header className="bg-[rgba(255,255,255,1)] border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={anilayeLogo} 
              alt="Anilaye Logo" 
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Anilaye</span>
              <span className="text-xs text-purple-600 font-medium">O'SEN-Ndoxmusell</span>
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-300 mx-4"></div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-600">Dashboard Distributeurs</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-700">MB</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">Mamadou Ba</span>
                  <span className="text-xs text-gray-500">Technicien Senior</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}