import React, { useState, useRef, useEffect } from 'react';
import { COURSES, Student, INSTITUTION, LEVEL, VALIDITY_DATE } from '../types';
import { Camera, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { uploadStudentPhoto, generateUniqueMatricula, generateUniqueUsageCode } from '../src/services/studentService';

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
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setFormData({ ...formData, cpf: formatCPF(e.target.value) });
  };

  // Compress image to max 300KB
  const compressImage = async (file: File): Promise<File> => {
    const MAX_SIZE_KB = 300;
    const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

    // If file is already small enough, return it
    if (file.size <= MAX_SIZE_BYTES) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if image is too large (max 1200px)
          const maxDimension = 1200;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Try different quality levels to get under 300KB
          let quality = 0.9;
          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) return;

                if (blob.size <= MAX_SIZE_BYTES || quality <= 0.1) {
                  // Convert blob to file
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  // Reduce quality and try again
                  quality -= 0.1;
                  tryCompress();
                }
              },
              'image/jpeg',
              quality
            );
          };

          tryCompress();
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show loading state
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Compress the image
        const compressedFile = await compressImage(file);

        // Show preview
        const url = URL.createObjectURL(compressedFile);
        setPhotoPreview(url);
        setPhotoFile(compressedFile);

        // Log compression results
        console.log(`Original: ${(file.size / 1024).toFixed(2)}KB → Compressed: ${(compressedFile.size / 1024).toFixed(2)}KB`);
      } catch (error) {
        console.error('Error compressing image:', error);
        setSubmitError('Erro ao processar imagem. Tente outra foto.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!photoPreview) {
        alert("A foto é obrigatória!");
        setIsSubmitting(false);
        return;
      }

      if (formData.cpf.length < 14) {
        alert("Por favor, preencha o CPF corretamente.");
        setIsSubmitting(false);
        return;
      }

      // Upload photo to Supabase if new file selected
      let photoUrl = initialData?.photoUrl || '';

      if (photoFile) {
        photoUrl = await uploadStudentPhoto(formData.cpf, photoFile);
      }

      // Generate unique codes if creating new student
      let matricula = initialData?.matricula || '';
      let usageCode = initialData?.usageCode || '';

      if (!initialData) {
        matricula = await generateUniqueMatricula();
        usageCode = await generateUniqueUsageCode();
      }

      const studentData: Student = {
        ...formData,
        photoUrl,
        institution: INSTITUTION,
        level: LEVEL,
        matricula,
        usageCode,
        validity: VALIDITY_DATE
      };

      await onRegister(studentData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Erro ao salvar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
            className={`w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${!isSubmitting ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'} transition-colors overflow-hidden relative`}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : isSubmitting ? (
              <div className="flex flex-col items-center text-gray-400">
                <Loader2 className="animate-spin" size={24} />
                <span className="text-xs mt-1">Processando...</span>
              </div>
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
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-400 mt-2 text-center">
            A imagem será compactada automaticamente
          </p>
        </div>

        {/* Fields */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
          <input
            required
            className={`${inputClass} uppercase`}
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
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
              onChange={e => setFormData({ ...formData, rg: e.target.value.toUpperCase() })}
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
            onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Curso</label>
          <select
            required
            className={inputClass}
            value={formData.course}
            onChange={e => setFormData({ ...formData, course: e.target.value })}
          >
            <option value="">Selecione...</option>
            {COURSES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg mt-8 shadow-lg hover:bg-blue-700 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Salvando...</span>
            </>
          ) : (
            <span>{initialData ? 'Salvar Alterações' : 'Gerar Carteira'}</span>
          )}
        </button>

      </form>
    </div>
  );
};