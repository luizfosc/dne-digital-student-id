import React from 'react';
import { Student } from '../types';
import { ArrowLeft, CheckCircle, Copy, Globe, Info } from 'lucide-react';

interface CertificateScreenProps {
  student: Student;
  onBack: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({ student, onBack }) => {
  return (
    <div className="min-h-full bg-gray-50 flex flex-col pb-6">
      
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center space-x-4 sticky top-0 z-20">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Certificado Digital</h1>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Green Info Card */}
        <div className="bg-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <Info className="mr-2" />
            <h3 className="font-bold text-lg">Como validar sua carteira</h3>
          </div>
          <p className="text-sm opacity-90 mb-4 leading-relaxed">
            Acesse o site abaixo e escaneie o QR Code da tela anterior (aba Validacao) para validar sua carteira:
          </p>
          <div className="bg-white rounded-lg py-3 px-4 flex items-center justify-center text-green-700 font-bold mb-4 cursor-pointer hover:bg-green-50">
            <Globe size={18} className="mr-2" />
            validar.iti.gov.br
          </div>
          <p className="text-xs text-center opacity-80">
            Quando solicitado, informe o Codigo de uso / ITI que aparece abaixo do QR Code.
          </p>
        </div>

        {/* Student Status Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4 text-blue-600 font-bold text-lg">
            <CheckCircle className="mr-2 fill-current" size={24} />
            Atestado de Estudante
          </div>
          <div className="w-full h-px bg-gray-100 mb-4"></div>
          <p className="text-gray-600 text-sm leading-relaxed">
            UEB atesta que <span className="font-bold text-gray-800">{student.name}</span> e estudante e esta regularmente matriculado(a) em <span className="font-bold text-gray-800">{student.level}</span> na instituicao <span className="font-bold text-gray-800">{student.institution}</span>
          </p>
        </div>

        {/* PEM Certificate Code */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 flex items-center">
              <span className="text-blue-500 mr-2">&lt; &gt;</span> Certificado PEM
            </h3>
            <Copy size={20} className="text-blue-500" />
          </div>
          <p className="text-xs text-gray-400 mb-3">Este e o codigo do seu certificado digital:</p>
          
          <div className="bg-[#1e293b] rounded-lg p-4 font-mono text-[10px] text-green-400 overflow-hidden relative shadow-inner">
             <div className="flex space-x-1.5 mb-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
             </div>
             <p className="opacity-50 text-center mb-2">certificate.pem</p>
             <div className="break-all leading-tight opacity-80 select-all">
               -----BEGIN ATTRIBUTE CERTIFICATE-----<br/>
               MIIHbzCCAl8CAQEwgY6hgY6kfjd893m4ncQYDVQQGExJCQjERMBIGA1UECqwRSWNQ<br/>
               LUJyYXRpbCBkZSBFZHVjYWNhbyAtIEluY3RpdHV0byBOYWNpb25hbCBkZSBUZWNu<br/>
               b2xvZ2lhIGRhIEluZm9ybWFjYW8gLSBJVEkgQnJhc2lsMQswCQYDVQQGEwJCUjER<br/>
               MBIGA1UECgwLSWNQLUJyYXNpbDE2MDQGA1UECwwtU2VjcmV0YXJpYSBkYSBSZWNl<br/>
               aXRhIEZlZGVyYWwgZG8gQnJhc2lsIC0gUkZCMIGfMA0GCSqGSIb3DQEBAQUAA4GN<br/>
               ADCBiQKBgQC7...
               -----END ATTRIBUTE CERTIFICATE-----
             </div>
          </div>
        </div>

        <button className="w-full bg-[#4a90e2] text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform">
           <Copy size={18} />
           <span>Copiar Certificado</span>
        </button>

      </div>
    </div>
  );
};