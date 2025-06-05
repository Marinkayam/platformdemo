
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/design-system');
  };

  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        {/* Secret logo button - transparent */}
        <button 
          onClick={handleLogoClick}
          className="absolute top-8 left-8 opacity-0 hover:opacity-20 transition-opacity"
          aria-label="Secret design system access"
        >
          <img 
            src="/monto-logo.svg" 
            alt="Monto" 
            className="h-8 w-auto"
          />
        </button>

        <h1 className="text-6xl font-sans font-bold text-secondary-main mb-6">
          Welcome to Monto
        </h1>
        <p className="text-xl font-sans text-grey-700 mb-8">
          Your intelligent invoice processing platform
        </p>
        <div className="bg-background-paper rounded-lg p-6 shadow-md mb-8">
          <p className="text-base font-sans text-grey-600 mb-6">
            Press any key to get started, or explore our platform features.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-primary-main text-primary-contrast-text px-8 py-3 rounded-lg font-sans font-medium hover:bg-primary-dark transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
