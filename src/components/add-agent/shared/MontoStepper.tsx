
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { cn } from "@/lib/utils";

interface StepData {
  number: number;
  title: string;
}

export function MontoStepper() {
  const { state, getTotalSteps } = useAddAgent();
  const totalSteps = getTotalSteps();

  const getSteps = (): StepData[] => {
    if (state.flowType === "new-connection") {
      return [
        { number: 1, title: "Connection Setup" },
        { number: 2, title: "Select Portal" },
        { number: 3, title: "Choose User Type" },
        { number: 4, title: "Configure Credentials" }
      ];
    } else {
      return [
        { number: 1, title: "Select Portal" },
        { number: 2, title: "Choose User Type" },
        { number: 3, title: "Configure Credentials" }
      ];
    }
  };

  const steps = getSteps();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step.number <= state.currentStep
                    ? "bg-[#7B59FF] text-white"
                    : "bg-[#F4F6F8] text-[#8C92A3]"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "text-sm transition-colors",
                  step.number <= state.currentStep
                    ? "font-medium text-[#38415F]"
                    : "text-[#8C92A3]"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-200 mt-[-20px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
