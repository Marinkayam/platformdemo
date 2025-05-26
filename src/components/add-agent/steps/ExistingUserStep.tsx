
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { CredentialForm } from "../components/CredentialForm";

export function ExistingUserStep() {
  const { state, updateExistingUserData } = useAddAgent();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          Enter the credentials for your existing portal user account that Monto will use for automation.
        </p>
      </div>
      
      <CredentialForm
        data={state.existingUserData}
        onUpdate={updateExistingUserData}
      />
    </div>
  );
}
