
import React from "react";
import { useNewSmartConnection } from "@/context/NewSmartConnectionContext";
import { EnhancedCredentialForm } from "@/components/add-agent/components/EnhancedCredentialForm";
import { InstructionalCard } from "@/components/add-agent/components/InstructionalCard";
import { Checkbox } from "@/components/ui/checkbox";

export function NewConnectionCredentialsStep() {
  const { state, updateExistingUserData, updateDedicatedUserData } = useNewSmartConnection();

  if (state.userType?.type === "existing") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-[#8C92A3]">
            Enter the credentials for your existing portal user account that Monto will use for automation.
          </p>
        </div>
        
        <EnhancedCredentialForm
          data={state.existingUserData}
          onUpdate={updateExistingUserData}
        />
      </div>
    );
  }

  const handleConfirmationChange = (checked: boolean) => {
    updateDedicatedUserData({ confirmed: checked });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Follow these steps to create a dedicated Monto user in your {state.selectedPortal?.name} portal.
        </p>
      </div>
      
      <InstructionalCard portalName={state.selectedPortal?.name || ""} />
      
      <div className="flex items-start space-x-3 pt-4">
        <Checkbox
          id="confirmation"
          checked={state.dedicatedUserData.confirmed}
          onCheckedChange={handleConfirmationChange}
          className="mt-1"
        />
        <label
          htmlFor="confirmation"
          className="text-[#38415F] cursor-pointer"
        >
          I've created this dedicated user in the portal
        </label>
      </div>
    </div>
  );
}
