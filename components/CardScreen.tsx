import React, { useState } from 'react';
import { Student } from '../types';
import { RefreshCw, Hand } from 'lucide-react';
import { CardFlip } from './CardFlip';

interface CardScreenProps {
  student: Student;
}

export const CardScreen: React.FC<CardScreenProps> = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const firstName = student.name.split(' ')[0];
  const nextYear = "2026";

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden relative">
      {/* Blue Header Section */}
      <div className="w-full bg-gradient-to-b from-[#0099e5] to-[#0088cc] pt-6 px-5 pb-4">
        <div className="text-white w-full flex flex-col items-start">
          <h1 className="text-2xl font-bold tracking-tight">Olá, {firstName}!</h1>
          <p className="text-blue-50 text-xs font-normal mt-0.5">Acesse sua carteira digital abaixo</p>
        </div>
      </div>

      {/* White/Gray Background Area with Instructions */}
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 px-5 pt-3 pb-6 overflow-y-auto flex flex-col">
        {/* Interaction Hint & Renew Button */}
        <div className="w-full flex items-start justify-between mb-4">
          <div className="flex items-start text-gray-600 max-w-[60%]">
            <Hand className="mr-2 mt-0.5 shrink-0 text-blue-500" size={16} strokeWidth={2.5} />
            <div className="text-[9px] leading-tight font-normal">
              <p className="mb-0.5">Click no botão para renovar pra {nextYear}</p>
              <p className="opacity-75">Toque na carteira pra virar lado</p>
            </div>
          </div>
          <button className="bg-[#ff7e00] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-lg active:scale-95 transition-transform">
            <RefreshCw size={12} className="mr-1" strokeWidth={3} />
            {nextYear}
          </button>
        </div>

        {/* Card Container - CardFlip handles rotation internally */}
        <div className="flex-1 flex items-center justify-center w-full">
          <CardFlip student={student} isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)} />
        </div>
      </div>
    </div>
  );
};
