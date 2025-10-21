
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { EnhancedCredentialForm } from "../components/EnhancedCredentialForm";

export function ExistingUserStep() {
  const { state, updateExistingUserData } = useAddAgent();

  // Determine if this is a Monto user (dedicated) or External user (existing)
  const isMontoUser = state.userType?.type === "dedicated";

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
        isMontoUser={isMontoUser}
      />
    </div>
  );
}
