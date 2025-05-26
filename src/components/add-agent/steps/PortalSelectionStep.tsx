
import React, { useState } from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { PortalDropdown } from "../components/PortalDropdown";

export function PortalSelectionStep() {
  const { state, setSelectedPortal } = useAddAgent();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          Choose the AP portal you want to connect to Monto for automated invoice processing.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <PortalDropdown
          selectedPortal={state.selectedPortal}
          onPortalSelect={setSelectedPortal}
        />
      </div>
      
      {state.selectedPortal && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
            <span className="text-sm font-medium">
              ✅ Selected: {state.selectedPortal.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
