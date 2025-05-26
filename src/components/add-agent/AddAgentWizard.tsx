
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { StepIndicator } from "./shared/StepIndicator";
import { WizardNavigation } from "./shared/WizardNavigation";
import { PortalSelectionStep } from "./steps/PortalSelectionStep";
import { UserTypeSelectionStep } from "./steps/UserTypeSelectionStep";
import { ExistingUserStep } from "./steps/ExistingUserStep";
import { DedicatedUserStep } from "./steps/DedicatedUserStep";

export function AddAgentWizard() {
  const { state } = useAddAgent();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <PortalSelectionStep />;
      case 2:
        return <UserTypeSelectionStep />;
      case 3:
        if (state.userType?.type === "existing") {
          return <ExistingUserStep />;
        } else {
          return <DedicatedUserStep />;
        }
      default:
        return <PortalSelectionStep />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border shadow-sm p-8">
        <div className="space-y-8">
          <StepIndicator />
          {renderCurrentStep()}
          <WizardNavigation />
        </div>
      </div>
    </div>
  );
}
