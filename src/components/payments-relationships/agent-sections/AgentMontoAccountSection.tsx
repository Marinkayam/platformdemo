
import React from "react";
import { Agent } from "@/types/smartConnection";

interface AgentMontoAccountSectionProps {
  agent: Agent;
}

export function AgentMontoAccountSection({ agent }: AgentMontoAccountSectionProps) {
  if (agent.type !== "Monto") {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
        <p className="text-blue-800">
          This agent uses a dedicated Monto user account for portal access. 
          Credentials are managed independently by your organization.
        </p>
      </div>
    </div>
  );
}
