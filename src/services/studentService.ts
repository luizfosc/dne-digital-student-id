import { supabase } from '../lib/supabase';
import { Student } from '../types';

// Database row type (snake_case from Postgres)
interface StudentRow {
  id: string;
  cpf: string;
  name: string;
  rg: string;
  birth_date: string;
  course: string;
  photo_url: string;
  institution: string;
  level: string;
  matricula: string;
  usage_code: string;
  validity: string;
  created_at: string;
  updated_at: string;
}

// Convert database row to Student type
const rowToStudent = (row: StudentRow): Student => ({
  cpf: row.cpf,
  name: row.name,
  rg: row.rg,
  birthDate: row.birth_date,
  course: row.course,
  photoUrl: row.photo_url,
  institution: row.institution,
  level: row.level,
  matricula: row.matricula,
  usageCode: row.usage_code,
  validity: row.validity,
});

// Convert Student type to database row
const studentToRow = (student: Student) => ({
  cpf: student.cpf,
  name: student.name,
  rg: student.rg,
  birth_date: student.birthDate,
  course: student.course,
  photo_url: student.photoUrl,
  institution: student.institution,
  level: student.level,
  matricula: student.matricula,
  usage_code: student.usageCode,
  validity: student.validity,
});

/**
 * Find student by CPF
 */
export const findStudentByCpf = async (cpf: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('cpf', cpf)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return data ? rowToStudent(data as StudentRow) : null;
  } catch (error) {
    console.error('Error finding student by CPF:', error);
    throw error;
  }
};

/**
 * Create new student
 */
export const createStudent = async (student: Student): Promise<Student> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([studentToRow(student)])
      .select()
      .single();

    if (error) throw error;

    return rowToStudent(data as StudentRow);
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

/**
 * Update existing student
 */
export const updateStudent = async (cpf: string, student: Partial<Student>): Promise<Student> => {
  try {
    const updateData: any = {};

    if (student.name) updateData.name = student.name;
    if (student.rg) updateData.rg = student.rg;
    if (student.birthDate) updateData.birth_date = student.birthDate;
    if (student.course) updateData.course = student.course;
    if (student.photoUrl) updateData.photo_url = student.photoUrl;
    if (student.institution) updateData.institution = student.institution;
    if (student.level) updateData.level = student.level;

    const { data, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('cpf', cpf)
      .select()
      .single();

    if (error) throw error;

    return rowToStudent(data as StudentRow);
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

/**
 * Delete old photo from storage
 */
const deleteOldPhoto = async (photoUrl: string): Promise<void> => {
  try {
    // Extract file path from public URL
    const urlParts = photoUrl.split('/student-photos/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1].split('?')[0]; // Remove query params if any

    const { error } = await supabase.storage
      .from('student-photos')
      .remove([filePath]);

    if (error) {
      console.warn('Error deleting old photo:', error);
      // Don't throw - continue with upload even if deletion fails
    }
  } catch (error) {
    console.warn('Error in deleteOldPhoto:', error);
  }
};

/**
 * Upload student photo to Supabase Storage
 * If oldPhotoUrl is provided, deletes the old photo first
 */
export const uploadStudentPhoto = async (
  cpf: string,
  file: File,
  oldPhotoUrl?: string
): Promise<string> => {
  try {
    // Delete old photo if exists
    if (oldPhotoUrl) {
      await deleteOldPhoto(oldPhotoUrl);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${cpf.replace(/\D/g, '')}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('student-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false, // Changed to false since we're using unique timestamps
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('student-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

/**
 * Generate unique matricula number
 */
export const generateMatricula = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generate unique usage code
 */
export const generateUsageCode = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Check if matricula already exists
 */
export const checkMatriculaExists = async (matricula: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('matricula')
      .eq('matricula', matricula)
      .single();

    if (error && error.code === 'PGRST116') {
      return false; // Not found
    }

    return !!data;
  } catch (error) {
    console.error('Error checking matricula:', error);
    return false;
  }
};

/**
 * Check if usage code already exists
 */
export const checkUsageCodeExists = async (usageCode: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('usage_code')
      .eq('usage_code', usageCode)
      .single();

    if (error && error.code === 'PGRST116') {
      return false; // Not found
    }

    return !!data;
  } catch (error) {
    console.error('Error checking usage code:', error);
    return false;
  }
};

/**
 * Generate unique matricula (checks if already exists)
 */
export const generateUniqueMatricula = async (): Promise<string> => {
  let matricula = generateMatricula();
  let attempts = 0;

  while (await checkMatriculaExists(matricula) && attempts < 10) {
    matricula = generateMatricula();
    attempts++;
  }

  return matricula;
};

/**
 * Generate unique usage code (checks if already exists)
 */
export const generateUniqueUsageCode = async (): Promise<string> => {
  let usageCode = generateUsageCode();
  let attempts = 0;

  while (await checkUsageCodeExists(usageCode) && attempts < 10) {
    usageCode = generateUsageCode();
    attempts++;
  }

  return usageCode;
};
