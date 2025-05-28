
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { MontoStepper } from "./shared/MontoStepper";
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
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="space-y-8">
          {/* Heading Section */}
          <div className="text-center w-full flex flex-col items-center gap-1">
            <h1 className="text-2xl font-semibold text-primary">
              Adding an agent to Smart Connection
            </h1>
            <p className="text-base text-muted-foreground">
              Apple Inc. → Monto LTD
            </p>
          </div>
          
          <MontoStepper />
          {renderCurrentStep()}
          <WizardNavigation />
        </div>
      </div>
    </div>
  );
}
