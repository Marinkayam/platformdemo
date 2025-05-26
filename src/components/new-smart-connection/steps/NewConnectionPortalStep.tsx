
import React from "react";
import { useNewSmartConnection } from "@/context/NewSmartConnectionContext";
import { PortalDropdown } from "@/components/add-agent/components/PortalDropdown";

export function NewConnectionPortalStep() {
  const { state, setSelectedPortal } = useNewSmartConnection();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Choose the AP portal you want to connect to Monto for automated invoice processing.
        </p>
      </div>
      
      <div className="flex justify-center">
        <PortalDropdown
          selectedPortal={state.selectedPortal}
          onPortalSelect={setSelectedPortal}
        />
      </div>
    </div>
  );
}
