
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAddAgent } from "@/context/AddAgentContext";

export function WizardNavigation() {
  const { state, setCurrentStep } = useAddAgent();

  const canGoBack = state.currentStep > 1;
  const canGoNext = () => {
    switch (state.currentStep) {
      case 1:
        return state.selectedPortal !== null;
      case 2:
        return state.userType !== null;
      case 3:
        return true; // Will be validated in individual steps
      default:
        return false;
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStep(state.currentStep - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext()) {
      setCurrentStep(state.currentStep + 1);
    }
  };

  const isLastStep = state.currentStep === 3;

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div>
        {canGoBack && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>
      
      <div>
        {!isLastStep ? (
          <Button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="min-w-24"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!canGoNext()}
            className="min-w-24"
          >
            Create Agent
          </Button>
        )}
      </div>
    </div>
  );
}
