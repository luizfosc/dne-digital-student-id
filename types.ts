export interface Student {
  cpf: string;
  name: string;
  rg: string;
  birthDate: string;
  course: string;
  photoUrl: string; // Base64 or ObjectURL
  institution: string; // Fixed to "FGV"
  level: string; // Fixed to "PÓS-GRADUAÇÃO"
  matricula: string; // Randomly generated
  usageCode: string; // Randomly generated
  validity: string; // Fixed date
}

export type Screen = 'splash' | 'register' | 'card' | 'validation' | 'certificate' | 'profile' | 'movies' | 'design-system';

export const COURSES = [
  'Administração de Empresas',
  'Administração Pública',
  'Economia',
  'Direito',
  'Matemática Aplicada',
  'Ciência de Dados e Inteligência Artificial',
  'Relações Internacionais',
  'Ciências Sociais',
  'Tecnologia em Gestão Pública',
  'Tecnologia em Processos Gerenciais'
];

export const VALIDITY_DATE = "31/03/2026";
export const INSTITUTION = "FGV";
export const INSTITUTION_FULL = "FUNDAÇÃO GETULIO VARGAS";
export const LEVEL = "PÓS GRADUAÇÃO";