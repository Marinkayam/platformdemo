
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAddAgent } from "@/context/AddAgentContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function WizardNavigation() {
  const { state, setCurrentStep, getTotalSteps } = useAddAgent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = getTotalSteps();

  const canGoBack = state.currentStep > 1;
  
  const canGoNext = () => {
    console.log("Checking canGoNext for flow:", state.flowType, "step:", state.currentStep);
    
    if (state.flowType === "new-connection") {
      switch (state.currentStep) {
        case 1: // Connection Setup
          const step1Valid = state.connectionSetupData.payableName && 
                            state.connectionSetupData.selectedReceivable !== null;
          console.log("Step 1 validation:", {
            payableName: state.connectionSetupData.payableName,
            selectedReceivable: state.connectionSetupData.selectedReceivable,
            isValid: step1Valid
          });
          return step1Valid;
        case 2: // Select Portal
          const step2Valid = state.selectedPortal !== null;
          console.log("Step 2 validation:", {
            selectedPortal: state.selectedPortal,
            isValid: step2Valid
          });
          return step2Valid;
        case 3: // Choose User Type
          const step3Valid = state.userType !== null;
          console.log("Step 3 validation:", {
            userType: state.userType,
            isValid: step3Valid
          });
          return step3Valid;
        case 4: // Configure Credentials
          if (state.userType?.type === "existing") {
            const step4ExistingValid = state.existingUserData.email && 
                   state.existingUserData.password && 
                   state.existingUserData.confirmPassword &&
                   state.existingUserData.portalLink &&
                   state.existingUserData.password === state.existingUserData.confirmPassword;
            console.log("Step 4 (existing) validation:", {
              existingUserData: state.existingUserData,
              isValid: step4ExistingValid
            });
            return step4ExistingValid;
          } else {
            const step4DedicatedValid = state.dedicatedUserData.confirmed;
            console.log("Step 4 (dedicated) validation:", {
              dedicatedUserData: state.dedicatedUserData,
              isValid: step4DedicatedValid
            });
            return step4DedicatedValid;
          }
        default:
          return false;
      }
    } else {
      // Add Agent flow (3 steps)
      switch (state.currentStep) {
        case 1:
          const addAgentStep1Valid = state.selectedPortal !== null;
          console.log("Add Agent Step 1 validation:", {
            selectedPortal: state.selectedPortal,
            isValid: addAgentStep1Valid
          });
          return addAgentStep1Valid;
        case 2:
          const addAgentStep2Valid = state.userType !== null;
          console.log("Add Agent Step 2 validation:", {
            userType: state.userType,
            isValid: addAgentStep2Valid
          });
          return addAgentStep2Valid;
        case 3:
          if (state.userType?.type === "existing") {
            const addAgentStep3ExistingValid = state.existingUserData.email && 
                   state.existingUserData.password && 
                   state.existingUserData.confirmPassword &&
                   state.existingUserData.portalLink &&
                   state.existingUserData.password === state.existingUserData.confirmPassword;
            console.log("Add Agent Step 3 (existing) validation:", {
              existingUserData: state.existingUserData,
              isValid: addAgentStep3ExistingValid
            });
            return addAgentStep3ExistingValid;
          } else {
            const addAgentStep3DedicatedValid = state.dedicatedUserData.confirmed;
            console.log("Add Agent Step 3 (dedicated) validation:", {
              dedicatedUserData: state.dedicatedUserData,
              isValid: addAgentStep3DedicatedValid
            });
            return addAgentStep3DedicatedValid;
          }
        default:
          return false;
      }
    }
  };

  const handleBack = () => {
    console.log("Back button clicked");
    if (canGoBack) {
      setCurrentStep(state.currentStep - 1);
    }
  };

  const handleNext = () => {
    console.log("Next button clicked, current step:", state.currentStep, "canGoNext:", canGoNext());
    const isValid = canGoNext();
    console.log("Validation result:", isValid);
    
    if (isValid) {
      console.log("Moving to next step:", state.currentStep + 1);
      setCurrentStep(state.currentStep + 1);
    } else {
      console.log("Cannot proceed - validation failed");
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    navigate('/smart-connections');
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
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
  const nextButtonEnabled = canGoNext();

  console.log("WizardNavigation render:", {
    currentStep: state.currentStep,
    totalSteps,
    isLastStep,
    nextButtonEnabled,
    flowType: state.flowType,
    canGoNext: canGoNext()
  });

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
            disabled={!nextButtonEnabled}
            className={cn(
              "min-w-24",
              nextButtonEnabled 
                ? "bg-[#7B59FF] hover:bg-[#6B4FE6]" 
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!nextButtonEnabled}
            className={cn(
              "min-w-32",
              nextButtonEnabled 
                ? "bg-[#7B59FF] hover:bg-[#6B4FE6]" 
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            {state.flowType === "new-connection" ? "Create Smart Connection" : "Submit New Agent"}
          </Button>
        )}
      </div>
    </div>
  );
}
