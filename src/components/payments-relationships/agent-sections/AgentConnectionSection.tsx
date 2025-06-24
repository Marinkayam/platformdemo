
import React from "react";
import { Agent } from "@/types/smartConnection";

interface AgentConnectionSectionProps {
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

export function AgentConnectionSection({ agent, connectionInfo }: AgentConnectionSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Connection Details</h4>
      
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Role
          </label>
          <div className="p-2 bg-gray-50 border rounded text-sm text-gray-900">
            {agent.role}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Smart Connection
          </label>
          <div className="p-2 bg-gray-50 border rounded text-sm text-gray-900">
            <div className="font-medium">{connectionInfo.receivable} → {connectionInfo.payable}</div>
            <div className="text-xs text-gray-600 mt-1">Active payment relationship</div>
          </div>
        </div>

        {agent.type === "Monto" && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <p className="text-blue-800">
              This agent uses a dedicated Monto user account for portal access. 
              Credentials are managed independently by your organization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
