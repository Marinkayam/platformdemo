
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { PortalDropdown } from "../components/PortalDropdown";

export function PortalSelectionStep() {
  const { state, setSelectedPortal } = useAddAgent();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Choose the AP portal you want to connect to Monto for automated invoice processing.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <PortalDropdown
          selectedPortal={state.selectedPortal}
          onPortalSelect={setSelectedPortal}
        />
      </div>
    </div>
  );
}
