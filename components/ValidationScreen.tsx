import React from 'react';
import { Student } from '../types';
import { ShieldCheck, Smartphone } from 'lucide-react';

interface ValidationScreenProps {
  student: Student;
  onViewCertificate: () => void;
}

export const ValidationScreen: React.FC<ValidationScreenProps> = ({ student, onViewCertificate }) => {
  return (
    <div className="h-full bg-[#a0dcd0] flex flex-col p-6 pt-10 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-2 opacity-80">
          <div className="text-3xl font-black text-white tracking-widest">DNE</div>
          <div className="text-[10px] text-white font-bold leading-tight border-l border-white pl-2">
            Carteira<br/>Nacional do<br/>Estudante
          </div>
        </div>
        {/* UEB Logo Mock */}
        <div className="w-10 h-10 bg-blue-900 rounded-full border border-white flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">UEB</span>
        </div>
      </div>

      {/* Main Content Card Row */}
      <div className="flex space-x-4 mb-6">
        {/* Photo Card */}
        <div className="w-1/2 aspect-[3/4] bg-white p-1.5 rounded-lg shadow-lg rotate-[-2deg]">
          <img src={student.photoUrl} alt="User" className="w-full h-full object-cover rounded" />
        </div>

        {/* QR Code Card */}
        <div className="w-1/2 aspect-[3/4] bg-white p-4 rounded-lg shadow-lg rotate-[2deg] flex flex-col items-center justify-center">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${student.usageCode}`} 
            alt="QR" 
            className="w-full h-auto"
          />
          <p className="mt-2 font-bold text-gray-800 text-sm">{student.usageCode}</p>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-xl p-6 shadow-xl mb-6 flex-1">
        <h2 className="text-lg font-bold text-gray-800 uppercase mb-4">{student.name}</h2>
        
        <div className="space-y-2 text-xs font-semibold text-gray-600">
          <p><span className="text-gray-400 font-normal">Inst. Ensino:</span> <span className="text-gray-800">{student.institution}</span></p>
          <p><span className="text-gray-400 font-normal">Curso:</span> <span className="text-gray-800 uppercase">{student.course}</span></p>
          <p><span className="text-gray-400 font-normal">Nível de ensino:</span> <span className="text-gray-800">{student.level}</span></p>
          <p><span className="text-gray-400 font-normal">RG:</span> <span className="text-gray-800">{student.rg}</span></p>
          <p><span className="text-gray-400 font-normal">Data de nasc.:</span> <span className="text-gray-800">{student.birthDate}</span></p>
          <p><span className="text-gray-400 font-normal">Validade:</span> <span className="text-gray-800">{student.validity}</span></p>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onViewCertificate}
        className="w-full bg-[#4a90e2] hover:bg-[#357abd] text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 transition-colors"
      >
        <Smartphone size={20} />
        <span>VER CERTIFICADO</span>
      </button>

    </div>
  );
};