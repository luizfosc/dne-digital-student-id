import React, { useState, useRef, useEffect } from 'react';
import { COURSES, Student, INSTITUTION, LEVEL, VALIDITY_DATE } from '../types';
import { Camera, Upload, ArrowLeft } from 'lucide-react';

interface RegistrationScreenProps {
  onRegister: (student: Student) => void;
  initialCpf?: string;
  initialData?: Student | null;
  onBack?: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegister, initialCpf = '', initialData, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    cpf: initialCpf,
    rg: '',
    birthDate: '',
    course: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load initial data if provided (Edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        cpf: initialData.cpf,
        rg: initialData.rg,
        birthDate: initialData.birthDate,
        course: initialData.course,
      });
      setPhotoPreview(initialData.photoUrl);
    }
  }, [initialData]);

  const generateRandomCode = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const formatCPF = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, cpf: formatCPF(e.target.value)});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoPreview) {
      alert("A foto é obrigatória!");
      return;
    }
    
    if (formData.cpf.length < 14) {
      alert("Por favor, preencha o CPF corretamente.");
      return;
    }

    const newStudent: Student = {
      ...formData,
      photoUrl: photoPreview,
      institution: INSTITUTION,
      level: LEVEL,
      matricula: initialData?.matricula || Math.floor(100000 + Math.random() * 900000).toString(),
      usageCode: initialData?.usageCode || generateRandomCode(8),
      validity: VALIDITY_DATE
    };

    onRegister(newStudent);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400";

  return (
    <div className="min-h-full bg-white p-6 pb-24 relative">
      {onBack && (
        <button onClick={onBack} className="absolute top-6 left-4 text-gray-600">
          <ArrowLeft size={24} />
        </button>
      )}
      
      <h1 className="text-3xl font-bold text-gray-800 mb-1 mt-2">{initialData ? 'Meus Dados' : 'Criar Conta'}</h1>
      <p className="text-gray-500 mb-8">{initialData ? 'Atualize seus dados abaixo.' : 'Preencha seus dados para gerar sua carteira.'}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Photo Upload */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-50 transition-colors relative"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Camera size={24} />
                <span className="text-xs mt-1">Sua foto</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        {/* Fields */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
          <input 
            required
            className={`${inputClass} uppercase`}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value.toUpperCase()})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CPF</label>
            <input 
              required
              className={inputClass}
              value={formData.cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              maxLength={14}
              disabled={!!initialData} // Lock CPF on edit
            />
          </div>
           <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">RG</label>
            <input 
              required
              className={`${inputClass} uppercase`}
              value={formData.rg}
              onChange={e => setFormData({...formData, rg: e.target.value.toUpperCase()})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Nascimento</label>
          <input 
            required
            type="date"
            className={inputClass}
            value={formData.birthDate}
            onChange={e => setFormData({...formData, birthDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Curso</label>
          <select 
            required
            className={inputClass}
            value={formData.course}
            onChange={e => setFormData({...formData, course: e.target.value})}
          >
            <option value="">Selecione...</option>
            {COURSES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg mt-8 shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
        >
          {initialData ? 'Salvar Alterações' : 'Gerar Carteira'}
        </button>

      </form>
    </div>
  );
};