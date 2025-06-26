
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { WizardStepId } from '../types';
import { WIZARD_STEPS } from '../constants';

interface WizardProgressProps {
  currentStep: WizardStepId;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const currentStepIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
  const progress = currentStep === 'connecting' ? 100 : ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100;

  if (currentStep === 'connecting') {
    return null;
  }

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm font-normal text-gray-600">
        {WIZARD_STEPS.map((step, index) => (
          <span key={step.id} className={currentStepIndex >= index ? 'text-primary' : ''}>
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
}
