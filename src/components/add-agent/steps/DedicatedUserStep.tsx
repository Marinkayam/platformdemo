
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { InstructionalCard } from "../components/InstructionalCard";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function DedicatedUserStep() {
  const { state, updateDedicatedUserData } = useAddAgent();

  const handleConfirmationChange = () => {
    updateDedicatedUserData({ confirmed: !state.dedicatedUserData.confirmed });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-gray-600 text-lg">
          Follow these steps to create a dedicated Monto user in your {state.selectedPortal?.name} portal.
        </p>
      </div>
      
      <InstructionalCard portalName={state.selectedPortal?.name || ""} />
      
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleConfirmationChange}
          disabled={!state.dedicatedUserData.confirmed}
          className={`min-w-80 h-14 text-base font-semibold flex items-center gap-3 ${
            state.dedicatedUserData.confirmed 
              ? 'bg-[#7B59FF] hover:bg-[#6B4FE6] text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Check className="h-5 w-5" />
          Created dedicated user for Monto
        </Button>
      </div>
    </div>
  );
}
