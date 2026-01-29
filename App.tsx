import React, { useState, useEffect } from 'react';
import { Screen, Student, INSTITUTION, LEVEL, VALIDITY_DATE } from './types';
import { SplashContent } from './components/SplashContent';
import { AuthModal } from './components/AuthModal';
import { RegistrationScreen } from './components/RegistrationScreen';
import { CardScreen } from './components/CardScreen';
import { ValidationScreen } from './components/ValidationScreen';
import { CertificateScreen } from './components/CertificateScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  // TEST USER - Auto-login for testing
  const TEST_USER: Student = {
    name: 'LUIZ FELIPE O S C PAIVA',
    cpf: '123.456.789-00',
    rg: 'MG846161',
    birthDate: '1985-09-03',
    course: 'Administração de Empresas',
    photoUrl: '/images/test-photo.png',
    institution: INSTITUTION,
    level: LEVEL,
    matricula: '283132',
    usageCode: '11LX2NFR',
    validity: VALIDITY_DATE
  };

  const [currentScreen, setCurrentScreen] = useState<Screen>('card'); // Start at card screen for testing
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Student | null>(TEST_USER); // Auto-login with test user
  const [pendingCpf, setPendingCpf] = useState('');

  // Navigation History for simple back behavior
  const [history, setHistory] = useState<Screen[]>([]);

  // Database Mock (In-memory) - Pre-populate with test user
  const [userDatabase, setUserDatabase] = useState<Record<string, Student>>({
    [TEST_USER.cpf]: TEST_USER
  });

  useEffect(() => {
    // Splash screen timer (disabled for testing)
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (cpf: string) => {
    // Check if user exists in our "database"
    if (userDatabase[cpf]) {
      setCurrentUser(userDatabase[cpf]);
      setCurrentScreen('card');
    } else {
      // User not found, go to registration with pre-filled CPF
      setPendingCpf(cpf);
      setCurrentScreen('register');
    }
    setShowAuthModal(false);
  };

  const handleRegister = (studentData: Student) => {
    // Save to "database"
    const newDb = { ...userDatabase, [studentData.cpf]: studentData };
    setUserDatabase(newDb);
    setCurrentUser(studentData);
    setCurrentScreen('card');
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
        return currentUser ? <ProfileScreen student={currentUser} onEdit={() => navigateTo('register')} /> : null;
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
        <AuthModal onSubmit={handleLogin} />
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