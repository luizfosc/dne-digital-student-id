import React, { useState, useEffect } from 'react';
import { Screen, Student } from './types';
import { SplashContent } from './components/SplashContent';
import { AuthModal } from './components/AuthModal';
import { RegistrationScreen } from './components/RegistrationScreen';
import { CardScreen } from './components/CardScreen';
import { ValidationScreen } from './components/ValidationScreen';
import { CertificateScreen } from './components/CertificateScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { DesignSystemScreen } from './components/DesignSystemScreen';
import { BottomNav } from './components/BottomNav';
import { findStudentByCpf, createStudent, updateStudent } from './src/services/studentService';

// LocalStorage key for caching user session
const USER_STORAGE_KEY = 'dne_current_user';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [pendingCpf, setPendingCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigation History for simple back behavior
  const [history, setHistory] = useState<Screen[]>([]);

  // Check localStorage for cached user on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser) as Student;
        setCurrentUser(user);
        setCurrentScreen('card');
      } catch (err) {
        console.error('Failed to parse cached user:', err);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    // Splash screen timer
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = async (cpf: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Search for student in Supabase
      const student = await findStudentByCpf(cpf);

      if (student) {
        // Student found - login and cache
        setCurrentUser(student);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(student));
        setCurrentScreen('card');
      } else {
        // Student not found - go to registration
        setPendingCpf(cpf);
        setCurrentScreen('register');
      }
      setShowAuthModal(false);
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro ao buscar CPF. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (studentData: Student) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if updating existing user or creating new
      if (currentUser) {
        // Update existing user
        const updatedStudent = await updateStudent(studentData.cpf, studentData);
        setCurrentUser(updatedStudent);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedStudent));
      } else {
        // Create new user
        const newStudent = await createStudent(studentData);
        setCurrentUser(newStudent);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newStudent));
      }
      setCurrentScreen('card');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Erro ao salvar dados. Tente novamente.');
      throw err; // Propagate error to RegistrationScreen
    } finally {
      setIsLoading(false);
    }
  };

  const navigateTo = (screen: Screen) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHist => prevHist.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentScreen('splash');
    setShowAuthModal(true);
  };

  // Render Logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashContent />;
      case 'register':
        return (
          <RegistrationScreen
            onRegister={handleRegister}
            initialCpf={pendingCpf}
            initialData={currentUser}
            onBack={currentUser ? goBack : undefined}
          />
        );
      case 'card':
        return currentUser ? <CardScreen student={currentUser} /> : null;
      case 'validation':
        return currentUser ? <ValidationScreen student={currentUser} onViewCertificate={() => navigateTo('certificate')} /> : null;
      case 'certificate':
        return currentUser ? <CertificateScreen student={currentUser} onBack={goBack} /> : null;
      case 'profile':
        return currentUser ? (
          <ProfileScreen
            student={currentUser}
            onEdit={() => navigateTo('register')}
            onLogout={handleLogout}
            onNavigateDesignSystem={() => navigateTo('design-system')}
          />
        ) : null;
      case 'design-system':
        return <DesignSystemScreen onBack={goBack} />;
      case 'movies':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <h2 className="text-xl font-bold text-gray-500">Filmes</h2>
            <p className="text-gray-400">Em breve...</p>
          </div>
        );
      default:
        return null;
    }
  };

  const showNav = ['card', 'validation', 'movies', 'profile'].includes(currentScreen);

  return (
    <div className="relative w-full h-full max-w-md mx-auto bg-gray-50 overflow-hidden shadow-2xl flex flex-col">
      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <AuthModal onSubmit={handleLogin} isLoading={isLoading} error={error} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showNav && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}