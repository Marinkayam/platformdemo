
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
    <div className="space-y-2">
      <div className="relative">
        <Progress value={progress} className="h-1 bg-gray-100" />
        <div
          className="absolute top-0 left-0 right-0 -mt-1 grid"
          style={{ gridTemplateColumns: `repeat(${WIZARD_STEPS.length}, minmax(0,1fr))` }}
        >
          {WIZARD_STEPS.map((step, index) => (
            <div key={step.id} className="flex justify-center">
              <div
                className={`
                w-3 h-3 rounded-full border-2 transition-colors duration-200
                ${currentStepIndex >= index 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-gray-300'
                }
              `}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${WIZARD_STEPS.length}, minmax(0,1fr))` }}
      >
        {WIZARD_STEPS.map((step, index) => (
          <div key={step.id} className="flex justify-center">
            <span
              className={`
              text-xs font-medium text-center transition-colors duration-200
              ${currentStepIndex >= index ? 'text-primary' : 'text-gray-500'}
            `}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
