import React from 'react';
import { Student } from '../types';
import { ChevronRight, Download, FileText, HelpCircle, User, Bell, Trash2, LogOut, Palette } from 'lucide-react';

interface ProfileScreenProps {
  student: Student;
  onEdit: () => void;
  onLogout: () => void;
  onNavigateDesignSystem: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ student, onEdit, onLogout, onNavigateDesignSystem }) => {
  const firstName = student.name.split(' ')[0];

  const handleGeneratePDF = () => {
    alert("Gerando PDF da carteirinha e certificado...");
    // In a real app, this would use jsPDF or html2pdf to download a file.
  };

  const MenuItem: React.FC<{ icon: any, label: string, onClick?: () => void, danger?: boolean }> = ({ icon: Icon, label, onClick, danger }) => (
    <button
      onClick={onClick}
      className={`w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex items-center justify-between mb-3 transition-colors ${danger ? 'text-red-500' : 'text-gray-600'}`}
    >
      <div className="flex items-center">
        <Icon size={20} className={danger ? "text-red-500" : "text-gray-500"} />
        <span className={`ml-4 font-medium ${danger ? 'text-red-500' : 'text-gray-600'}`}>{label}</span>
      </div>
      {!danger && <ChevronRight size={20} className="text-gray-400" />}
    </button>
  );

  return (
    <div className="min-h-full bg-white p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil</h1>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white">
          <img src={student.photoUrl} alt="User" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Olá, {firstName}!</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-500 mb-3 ml-1">PagMeia</h3>
        <MenuItem icon={HelpCircle} label="Sobre o PagMeia" />
        <MenuItem icon={FileText} label="Termos de uso" />
        <MenuItem icon={FileText} label="Fale conosco" />
        <MenuItem icon={Download} label="Gerar o PDF da Carteira" onClick={handleGeneratePDF} />
        <MenuItem icon={Palette} label="Design System" onClick={onNavigateDesignSystem} />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-500 mb-3 ml-1">Minha conta</h3>
        <MenuItem icon={User} label="Meus dados" onClick={onEdit} />
        <MenuItem icon={Bell} label="Notificações" />
        <MenuItem icon={Trash2} label="Apagar minha conta" />
      </div>

      <button
        onClick={onLogout}
        className="w-full bg-white border border-red-100 p-4 rounded-xl flex items-center text-red-500 font-bold hover:bg-red-50 transition-colors"
      >
        <LogOut size={20} className="mr-4" />
        Sair
      </button>

    </div>
  );
};