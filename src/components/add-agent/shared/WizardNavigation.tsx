
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAddAgent } from "@/context/AddAgentContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function WizardNavigation() {
  const { state, setCurrentStep, getTotalSteps } = useAddAgent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = getTotalSteps();

  const canGoBack = state.currentStep > 1;
  
  const canGoNext = () => {
    if (state.flowType === "new-connection") {
      switch (state.currentStep) {
        case 1: // Connection Setup
          return state.connectionSetupData.payableName && 
                 state.connectionSetupData.selectedReceivable !== null;
        case 2: // Agent Setup (placeholder step)
          return true;
        case 3: // Select Portal
          return state.selectedPortal !== null;
        case 4: // Choose User Type
          return state.userType !== null;
        case 5: // Configure Credentials
          if (state.userType?.type === "existing") {
            return state.existingUserData.email && 
                   state.existingUserData.password && 
                   state.existingUserData.confirmPassword &&
                   state.existingUserData.portalLink &&
                   state.existingUserData.password === state.existingUserData.confirmPassword;
          } else {
            return state.dedicatedUserData.confirmed;
          }
        default:
          return false;
      }
    } else {
      // Add Agent flow (3 steps)
      switch (state.currentStep) {
        case 1:
          return state.selectedPortal !== null;
        case 2:
          return state.userType !== null;
        case 3:
          if (state.userType?.type === "existing") {
            return state.existingUserData.email && 
                   state.existingUserData.password && 
                   state.existingUserData.confirmPassword &&
                   state.existingUserData.portalLink &&
                   state.existingUserData.password === state.existingUserData.confirmPassword;
          } else {
            return state.dedicatedUserData.confirmed;
          }
        default:
          return false;
      }
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

  const handleSubmit = () => {
    const successMessage = state.flowType === "new-connection" 
      ? "✅ Smart Connection created successfully"
      : "✅ Agent created successfully";
    
    toast({
      title: successMessage,
      description: "Status: Building",
    });
    
    // Auto-close wizard after short delay
    setTimeout(() => {
      navigate('/smart-connections');
    }, 2000);
  };

  const isLastStep = state.currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="flex gap-3">
        {state.currentStep === 1 && (
          <Button
            variant="outline"
            onClick={handleCancel}
            className="text-[#8C92A3]"
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
            onClick={handleSubmit}
            disabled={!canGoNext()}
            className="min-w-32 bg-[#7B59FF] hover:bg-[#6B4FE6]"
          >
            {state.flowType === "new-connection" ? "Create Smart Connection" : "Submit New Agent"}
          </Button>
        )}
      </div>
    </div>
  );
}
