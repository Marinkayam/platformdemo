
import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { number: 1, title: "Add Portal Users" },
  { number: 2, title: "Review Connections" },
  { number: 3, title: "Finish & Continue" }
];

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={() => onStepClick(step.number)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step.number < currentStep
                    ? "bg-[#BEADFF] text-[#7B59FF] cursor-pointer"
                    : step.number === currentStep
                    ? "bg-[#7B59FF] text-white"
                    : "bg-grey-200 text-grey-500 cursor-default"
                )}
              >
                {step.number}
              </button>
              <span
                className={cn(
                  "text-sm transition-colors text-center",
                  step.number <= currentStep
                    ? "font-medium text-grey-900"
                    : "text-grey-500"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-16 h-px mt-[-20px] transition-colors",
                step.number < currentStep ? "bg-[#BEADFF]" : "bg-grey-200"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
