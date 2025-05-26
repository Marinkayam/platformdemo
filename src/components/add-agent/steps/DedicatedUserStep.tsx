
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
