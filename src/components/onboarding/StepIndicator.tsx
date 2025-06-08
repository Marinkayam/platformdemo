
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
    <div className="flex items-center justify-center w-full mb-16">
      <div className="flex items-center space-x-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => onStepClick(step.number)}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105",
                  step.number < currentStep
                    ? "bg-[#BEADFF] text-[#7B59FF] cursor-pointer hover:bg-[#B5A3FF]"
                    : step.number === currentStep
                    ? "bg-[#7B59FF] text-white hover:bg-[#6B4AFF]"
                    : "bg-grey-200 text-grey-500 cursor-pointer hover:bg-grey-300 hover:text-grey-600"
                )}
              >
                {step.number}
              </button>
              <span
                className={cn(
                  "text-lg font-semibold transition-colors text-center",
                  step.number <= currentStep
                    ? "text-grey-900"
                    : "text-grey-500"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-24 h-px mt-[-28px] transition-colors",
                step.number < currentStep ? "bg-[#BEADFF]" : "bg-grey-200"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
