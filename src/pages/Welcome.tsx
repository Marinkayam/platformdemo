
import React from 'react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-6xl font-sans font-bold text-secondary-main mb-6">
          Welcome to Monto
        </h1>
        <p className="text-xl font-sans text-grey-700 mb-8">
          Your intelligent invoice processing platform
        </p>
        <div className="bg-background-paper rounded-lg p-6 shadow-md">
          <p className="text-base font-sans text-grey-600">
            Press any key to get started, or explore our platform features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
