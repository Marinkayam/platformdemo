
import React from "react";
import { AddAgentWizard } from "@/components/add-agent/AddAgentWizard";
import { AddAgentBreadcrumb } from "@/components/add-agent/AddAgentBreadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddAgentProvider } from "@/context/AddAgentContext";

export default function AddAgent() {
  return (
    <TooltipProvider>
      <AddAgentProvider>
        <div className="space-y-6">
          <AddAgentBreadcrumb />
          <AddAgentWizard />
        </div>
      </AddAgentProvider>
    </TooltipProvider>
  );
}
