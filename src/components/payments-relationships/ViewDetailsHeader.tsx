
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from "@/components/ui/agent-user-type-badge";
import { Agent } from "@/types/smartConnection";

interface ViewDetailsHeaderProps {
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

export function ViewDetailsHeader({ agent, connectionInfo }: ViewDetailsHeaderProps) {
  return (
    <DialogHeader>
      <div className="flex items-center gap-3">
        <DialogTitle className="text-lg font-semibold text-gray-900">
          Agent Details
        </DialogTitle>
        <StatusBadge status={agent.status} />
        <AgentUserTypeBadge type={agent.type === "Regular" ? "Regular" : "Monto"} />
      </div>
      
      <div className="text-sm text-gray-600 mt-6 text-left">
        {connectionInfo.receivable} → {connectionInfo.payable}
      </div>
      
      <Separator className="mt-6" />
    </DialogHeader>
  );
}
