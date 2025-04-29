
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
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
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium border",
                    isActive
                      ? "bg-primary text-white border-primary"
                      : isPast
                      ? "bg-white border-gray-300 text-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-400"
                  )}
                >
                  {stepNumber}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2",
                    isActive ? "text-primary font-medium" : "text-gray-500"
                  )}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-[1px] w-16 mx-1",
                    isPast ? "bg-primary" : "bg-gray-300"
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
