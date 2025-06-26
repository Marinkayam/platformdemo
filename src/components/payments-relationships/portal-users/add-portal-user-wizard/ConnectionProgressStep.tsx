
import React, { useState, useEffect } from 'react';
import { LoadingAnimation } from './LoadingAnimation';

interface ConnectionProgressStepProps {
  selectedPortal: string;
  onConnectionComplete: () => void;
}

export function ConnectionProgressStep({ selectedPortal, onConnectionComplete }: ConnectionProgressStepProps) {
  const [phase, setPhase] = useState<'connecting' | 'success' | 'scanning'>('connecting');
  const [scanningText, setScanningText] = useState('Discovering payment relationships...');

  useEffect(() => {
    // Connection phase (3-4 seconds)
    const connectionTimer = setTimeout(() => {
      setPhase('success');
    }, 3500);

    return () => clearTimeout(connectionTimer);
  }, []);

  useEffect(() => {
    if (phase === 'success') {
      // Success phase (2-3 seconds)
      const successTimer = setTimeout(() => {
        setPhase('scanning');
      }, 2500);

      return () => clearTimeout(successTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'scanning') {
      // Scanning phase with progressive text
      const textSequence = [
        'Discovering payment relationships...',
        'Extracting data...',
        'Finalizing setup...'
      ];
      
      let currentIndex = 0;
      const textTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % textSequence.length;
        setScanningText(textSequence[currentIndex]);
      }, 1500);

      // Complete after scanning
      const completeTimer = setTimeout(() => {
        onConnectionComplete();
      }, 4500);

      return () => {
        clearInterval(textTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [phase, onConnectionComplete]);

  if (phase === 'connecting') {
    return (
      <div className="text-center space-y-6 py-8">
        <LoadingAnimation />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Connecting to {selectedPortal}
          </h3>
          <p className="text-gray-600">
            Our AI agent is scanning your portal and establishing a secure connection.
          </p>
          <p className="text-sm text-gray-500">
            This usually takes about 30 seconds. Please don't close this window.
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'success') {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">
            Successfully Connected!
          </h3>
          <p className="text-gray-600">
            Monto's AI Agent is now scanning your payment relationships in {selectedPortal}.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-medium text-blue-900 mb-2">How Monto's AI Agent works?</h4>
            <p className="text-sm text-blue-800">
              Our AI agent is navigating your {selectedPortal} just like a human would, learning its structure and extracting payment data in real-time. All data is synced continuously without manual effort.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'scanning') {
    return (
      <div className="text-center space-y-6 py-8">
        <LoadingAnimation />
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">
            {scanningText}
          </h3>
          <div className="w-48 mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
