
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center mb-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isPast = stepNumber < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center text-lg font-medium mb-2",
                    isActive
                      ? "bg-primary text-white"
                      : isPast
                      ? "bg-gray-200 text-gray-600"
                      : "bg-gray-200 text-gray-400"
                  )}
                >
                  {stepNumber}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    isActive ? "text-primary font-medium" : "text-gray-500"
                  )}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-1 w-24 mx-2",
                    isPast ? "bg-gray-300" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
