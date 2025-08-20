import React from 'react';
import { cn } from '@/lib/utils';

export interface WizardStep {
  id: string;
  name: string;
}

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: string;
  className?: string;
}

export function WizardProgress({ steps, currentStep, className }: WizardProgressProps) {
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className={cn("w-full", className)}>
      {/* Progress line with dots */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-2 left-0 right-0 h-[2px] bg-gray-200" />
        
        {/* Active line (up to current step) */}
        {currentStepIndex > 0 && (
          <div 
            className="absolute top-2 left-0 h-[2px] bg-primary transition-all duration-300"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        )}
        
        {/* Step dots */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Circle dot */}
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 bg-white",
                  isCompleted || isCurrent ? "border-primary" : "border-gray-300",
                  isCurrent && "bg-primary"
                )}>
                  {isCurrent && (
                    <div className="w-full h-full rounded-full bg-primary" />
                  )}
                </div>
                
                {/* Step label */}
                <span className={cn(
                  "mt-2 text-xs whitespace-nowrap transition-colors duration-300",
                  isCurrent ? "text-primary font-medium" : "text-gray-500"
                )}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}