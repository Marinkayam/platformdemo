
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAddAgent } from "@/context/AddAgentContext";
import { useNavigate } from "react-router-dom";

export function WizardNavigation() {
  const { state, setCurrentStep } = useAddAgent();
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate('/smart-connections');
  };

  const isLastStep = state.currentStep === 3;

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="flex gap-3">
        {state.currentStep === 1 && (
          <Button
            variant="outline"
            onClick={handleCancel}
            className="text-gray-600"
          >
            Cancel
          </Button>
        )}
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
            className="min-w-24 bg-[#7B59FF] hover:bg-[#6B4FE6]"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!canGoNext()}
            className="min-w-32 bg-[#7B59FF] hover:bg-[#6B4FE6]"
          >
            Submit New Agent
          </Button>
        )}
      </div>
    </div>
  );
}
