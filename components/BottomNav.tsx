import React from 'react';
import { Screen } from '../types';
import { Wallet, QrCode, Clapperboard, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  
  const NavItem = ({ screen, icon: Icon, label }: { screen: Screen, icon: any, label: string }) => {
    // Treat 'certificate' as part of 'validation' tab active state
    const isActive = currentScreen === screen || (screen === 'validation' && currentScreen === 'certificate');
    
    return (
      <button 
        onClick={() => onNavigate(screen)}
        className="flex flex-col items-center justify-center w-full py-2"
      >
        <Icon 
          size={24} 
          className={`mb-1 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400'}`} 
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span className={`text-[10px] font-medium ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
          {label}
        </span>
        {isActive && (
           <div className="absolute bottom-0 w-8 h-1 bg-blue-500 rounded-t-full"></div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-white border-t border-gray-100 flex justify-between items-center h-20 pb-4 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] relative z-50">
      <NavItem screen="card" icon={Wallet} label="Carteira" />
      <NavItem screen="validation" icon={QrCode} label="Validação" />
      <NavItem screen="movies" icon={Clapperboard} label="Filmes" />
      <NavItem screen="profile" icon={User} label="Perfil" />
    </div>
  );
};