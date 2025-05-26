
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { MontoStepper } from "./shared/MontoStepper";
import { WizardNavigation } from "./shared/WizardNavigation";
import { ConnectionSetupStep } from "./steps/ConnectionSetupStep";
import { PortalSelectionStep } from "./steps/PortalSelectionStep";
import { UserTypeSelectionStep } from "./steps/UserTypeSelectionStep";
import { ExistingUserStep } from "./steps/ExistingUserStep";
import { DedicatedUserStep } from "./steps/DedicatedUserStep";

// Placeholder component for Agent Setup step
function AgentSetupStep() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Configure your agent settings for this Smart Connection.
        </p>
      </div>
      <div className="text-center py-8">
        <p className="text-[#8C92A3]">Agent setup configuration will be implemented here.</p>
      </div>
    </div>
  );
}

export function NewSmartConnectionWizard() {
  const { state } = useAddAgent();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <ConnectionSetupStep />;
      case 2:
        return <AgentSetupStep />;
      case 3:
        return <PortalSelectionStep />;
      case 4:
        return <UserTypeSelectionStep />;
      case 5:
        if (state.userType?.type === "existing") {
          return <ExistingUserStep />;
        } else {
          return <DedicatedUserStep />;
        }
      default:
        return <ConnectionSetupStep />;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="space-y-8">
          <MontoStepper />
          {renderCurrentStep()}
          <WizardNavigation />
        </div>
      </div>
    </div>
  );
}
