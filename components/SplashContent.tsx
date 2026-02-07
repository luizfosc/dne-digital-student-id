import React from 'react';

export const SplashContent: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white fade-in">
      {/* PagMeia Logo */}
      <div className="flex items-center justify-center">
        <img
          src="/images/logo-pagmeia.webp"
          alt="PagMeia Logo"
          className="w-64 h-auto object-contain"
        />
      </div>
    </div>
  );
};