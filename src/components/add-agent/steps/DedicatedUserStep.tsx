
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { InstructionalCard } from "../components/InstructionalCard";
import { Checkbox } from "@/components/ui/checkbox";

export function DedicatedUserStep() {
  const { state, updateDedicatedUserData } = useAddAgent();

  const handleConfirmationChange = (checked: boolean) => {
    updateDedicatedUserData({ confirmed: checked });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          Follow these steps to create a dedicated Monto user in your {state.selectedPortal?.name} portal.
        </p>
      </div>
      
      <InstructionalCard portalName={state.selectedPortal?.name || ""} />
      
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="confirmation"
            checked={state.dedicatedUserData.confirmed}
            onCheckedChange={handleConfirmationChange}
          />
          <div className="space-y-1">
            <label
              htmlFor="confirmation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have completed the setup
            </label>
            <p className="text-sm text-gray-600">
              Confirm that you have successfully created the dedicated user with the required permissions in your portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
