
import React, { useState, useEffect } from 'react';
import { LoadingAnimation } from './LoadingAnimation';
import { Typography } from '@/components/ui/typography/typography';

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
      <div className="text-center space-y-8 py-12">
        {/* Potion Illustration */}
        <div className="w-24 h-24 mx-auto mb-6">
          <img 
            src="/lovable-uploads/e38a7a30-6e50-4349-ad11-52305d3e55da.png" 
            alt="AI Connection Magic"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        
        <LoadingAnimation />
        
        <div className="space-y-4 max-w-md mx-auto">
          <Typography variant="h3" className="text-grey-900">
            Connecting to {selectedPortal}
          </Typography>
          <Typography variant="body1" className="text-grey-600">
            Our AI agent is scanning your portal and establishing a secure connection.
          </Typography>
          <div className="bg-primary-lighter border border-primary-light/20 rounded-lg p-4 mt-6">
            <Typography variant="body2" className="text-primary-dark">
              This usually takes about 30 seconds. Please don't close this window.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'success') {
    return (
      <div className="text-center space-y-8 py-12">
        {/* Crystal Ball Illustration */}
        <div className="w-28 h-28 mx-auto mb-6">
          <img 
            src="/lovable-uploads/14a68f61-74dd-44cd-910e-19f8d7c7aa6f.png" 
            alt="AI Magic Complete"
            className="w-full h-full object-contain animate-scale-in"
          />
        </div>

        <div className="w-20 h-20 mx-auto bg-success-main/10 rounded-full flex items-center justify-center animate-scale-in">
          <svg className="w-10 h-10 text-success-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div className="space-y-6 max-w-lg mx-auto">
          <Typography variant="h3" className="text-success-main">
            Successfully Connected!
          </Typography>
          <Typography variant="body1" className="text-grey-600">
            Monto's AI Agent is now scanning your payment relationships in {selectedPortal}.
          </Typography>
          
          <div className="bg-gradient-to-br from-primary-lighter to-primary-light/30 border border-primary-light/30 rounded-xl p-6 text-left">
            <Typography variant="h5" className="text-primary-dark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              How Monto's AI Agent works?
            </Typography>
            <Typography variant="body2" className="text-primary-darker leading-relaxed">
              Our AI agent is navigating your {selectedPortal} just like a human would, learning its structure and extracting payment data in real-time. All data is synced continuously without manual effort.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'scanning') {
    return (
      <div className="text-center space-y-8 py-12">
        {/* Rotating Crystal Ball during scanning */}
        <div className="w-24 h-24 mx-auto mb-6">
          <img 
            src="/lovable-uploads/14a68f61-74dd-44cd-910e-19f8d7c7aa6f.png" 
            alt="AI Processing"
            className="w-full h-full object-contain animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <LoadingAnimation />
        
        <div className="space-y-4 max-w-md mx-auto">
          <Typography variant="h4" className="text-grey-900 animate-pulse">
            {scanningText}
          </Typography>
          <div className="w-64 mx-auto bg-grey-300 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-main to-primary-light h-2 rounded-full animate-pulse transition-all duration-1000" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
