
import React from "react";
import { useNewSmartConnection } from "@/context/NewSmartConnectionContext";
import { NewConnectionStepper } from "./shared/NewConnectionStepper";
import { NewConnectionNavigation } from "./shared/NewConnectionNavigation";
import { ConnectionSetupStep } from "./steps/ConnectionSetupStep";
import { NewConnectionPortalStep } from "./steps/NewConnectionPortalStep";
import { NewConnectionUserTypeStep } from "./steps/NewConnectionUserTypeStep";
import { NewConnectionCredentialsStep } from "./steps/NewConnectionCredentialsStep";

export function NewSmartConnectionWizard() {
  const { state } = useNewSmartConnection();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <ConnectionSetupStep />;
      case 2:
        return <NewConnectionPortalStep />;
      case 3:
        return <NewConnectionUserTypeStep />;
      case 4:
        return <NewConnectionCredentialsStep />;
      default:
        return <ConnectionSetupStep />;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="space-y-8">
          <NewConnectionStepper />
          {renderCurrentStep()}
          <NewConnectionNavigation />
        </div>
      </div>
    </div>
  );
}
