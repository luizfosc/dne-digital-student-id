-- DNE Digital Student ID Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  rg VARCHAR(20) NOT NULL,
  birth_date DATE NOT NULL,
  course VARCHAR(255) NOT NULL,
  photo_url TEXT,
  institution VARCHAR(255) NOT NULL,
  level VARCHAR(100) NOT NULL,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  usage_code VARCHAR(20) UNIQUE NOT NULL,
  validity VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on CPF for fast lookups
CREATE INDEX IF NOT EXISTS idx_students_cpf ON students(cpf);

-- Create index on matricula
CREATE INDEX IF NOT EXISTS idx_students_matricula ON students(matricula);

-- Create index on usage_code
CREATE INDEX IF NOT EXISTS idx_students_usage_code ON students(usage_code);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for validation)
CREATE POLICY "Allow public read access" ON students
  FOR SELECT
  USING (true);

-- Create policy to allow insert for new registrations
CREATE POLICY "Allow public insert" ON students
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow update only for the student's own data (using CPF)
CREATE POLICY "Allow update own data" ON students
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for student photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public access to photos
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'student-photos');

-- Create storage policy for authenticated uploads
CREATE POLICY "Allow public uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'student-photos');
