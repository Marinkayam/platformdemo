
import React from "react";
import { NewSmartConnectionWizard } from "@/components/new-smart-connection/NewSmartConnectionWizard";
import { NewSmartConnectionBreadcrumb } from "@/components/new-smart-connection/NewSmartConnectionBreadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NewSmartConnectionProvider } from "@/context/NewSmartConnectionContext";

export default function NewSmartConnection() {
  return (
    <TooltipProvider>
      <NewSmartConnectionProvider>
        <div className="space-y-6">
          <NewSmartConnectionBreadcrumb />
          <NewSmartConnectionWizard />
        </div>
      </NewSmartConnectionProvider>
    </TooltipProvider>
  );
}
