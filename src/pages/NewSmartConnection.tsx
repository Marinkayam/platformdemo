
import React, { useEffect } from "react";
import { NewSmartConnectionWizard } from "@/components/add-agent/NewSmartConnectionWizard";
import { NewSmartConnectionBreadcrumb } from "@/components/add-agent/NewSmartConnectionBreadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddAgentProvider, useAddAgent } from "@/context/AddAgentContext";

function NewSmartConnectionContent() {
  const { setFlowType } = useAddAgent();

  useEffect(() => {
    setFlowType("new-connection");
  }, [setFlowType]);

  return (
    <div className="space-y-6">
      <NewSmartConnectionBreadcrumb />
      <NewSmartConnectionWizard />
    </div>
  );
}

export default function NewSmartConnection() {
  return (
    <TooltipProvider>
      <AddAgentProvider>
        <NewSmartConnectionContent />
      </AddAgentProvider>
    </TooltipProvider>
  );
}
