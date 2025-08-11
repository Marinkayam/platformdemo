import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WizardStepId } from '../types';
import { MONTO_FIELDS } from '../types';

interface WizardNavigationProps {
  currentStep: WizardStepId;
  onBack: () => void;
  onNext: () => void;
  onImport: () => void;
  onComplete: () => void;
  file: File | null;
  mappings: { [key: string]: string };
}

export function WizardNavigation({
  currentStep,
  onBack,
  onNext,
  onImport,
  onComplete,
  file,
  mappings,
}: WizardNavigationProps) {
  const isNextDisabled = () => {
    if (currentStep === 'upload') return !file;
    if (currentStep === 'mapping') return MONTO_FIELDS.filter(f => f.required).some(f => !mappings[f.key]);
    return false;
  };

  if (currentStep === 'connecting') {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-20 bg-background flex justify-between items-center pt-4 border-t">
      <div>
        {currentStep !== 'upload' && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {currentStep === 'summary' ? (
          <Button onClick={onImport}>Import Users</Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled()}>
            Continue <ArrowRight className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
