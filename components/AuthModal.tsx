import React, { useState } from 'react';

interface AuthModalProps {
  onSubmit: (cpf: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSubmit }) => {
  const [cpf, setCpf] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate length (11 digits + 3 symbols = 14 chars)
    if (cpf.length === 14) {
      onSubmit(cpf);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get only numbers
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 11 digits
    if (value.length > 11) value = value.slice(0, 11);
    
    // Apply mask: 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    setCpf(value);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full rounded-t-3xl p-8 animate-slide-up shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo!</h2>
        <p className="text-gray-500 mb-6">Digite seu CPF para acessar sua carteira digital.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input 
              type="text" 
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={cpf.length < 14}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg transition-colors"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};