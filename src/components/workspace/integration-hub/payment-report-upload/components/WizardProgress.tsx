
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { PaymentReportWizardStepId } from '../types';
import { WIZARD_STEPS } from '../constants';
import { CheckCircle } from 'lucide-react';

interface WizardProgressProps {
  currentStep: PaymentReportWizardStepId;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const currentStepIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center space-y-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'bg-primary border-primary text-white'
                    : isCurrent
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-grey-300 bg-white text-grey-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-grey-700' : 'text-grey-400'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
