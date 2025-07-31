import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNewSmartConnection } from "@/context/NewSmartConnectionContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function NewConnectionNavigation() {
  const { state, setCurrentStep } = useNewSmartConnection();
  const navigate = useNavigate();
  const { toast } = useToast();

  const canGoBack = state.currentStep > 1;
  
  const canGoNext = () => {
    console.log("Current step:", state.currentStep);
    console.log("Connection setup:", state.connectionSetup);
    console.log("Selected portal:", state.selectedPortal);
    console.log("User type:", state.userType);
    console.log("Existing user data:", state.existingUserData);
    console.log("Dedicated user data:", state.dedicatedUserData);
    
    switch (state.currentStep) {
      case 1:
        return state.connectionSetup.selectedPayable && state.connectionSetup.receivable;
      case 2:
        return state.selectedPortal !== null;
      case 3:
        return state.userType !== null;
      case 4:
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
    navigate('/payments-relationships');
  };

  const handleSubmit = () => {
    toast({
      title: "✅ Smart Connection created successfully",
      description: "Status: Building",
    });
    
    setTimeout(() => {
      navigate('/payments-relationships');
    }, 2000);
  };

  const isLastStep = state.currentStep === 4;

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
            Create Smart Connection
          </Button>
        )}
      </div>
    </div>
  );
}
