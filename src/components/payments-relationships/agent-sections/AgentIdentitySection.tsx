
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Agent } from "@/types/smartConnection";

interface AgentIdentitySectionProps {
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
  copyToClipboard: (text: string) => void;
  isEditMode: boolean;
  editFormData?: {
    portalName: string;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
}

export function AgentIdentitySection({ 
  agent, 
  connectionInfo, 
  copyToClipboard, 
  isEditMode, 
  editFormData, 
  onFormChange 
}: AgentIdentitySectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Agent Identity</h4>
      
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Portal Name
          </label>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.portalName || agent.portalName}
                onChange={(e) => onFormChange?.('portalName', e.target.value)}
                className="flex-1 p-2 bg-white border rounded text-sm"
              />
            ) : (
              <input
                type="text"
                value={agent.portalName}
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded text-sm"
              />
            )}
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(agent.portalName)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Smart Connection
          </label>
          <div className="p-2 bg-gray-50 border rounded text-sm text-gray-600">
            {connectionInfo.receivable} → {connectionInfo.payable}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Portal User
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={agent.portalUser}
              readOnly
              className="flex-1 p-2 bg-gray-50 border rounded text-sm"
            />
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(agent.portalUser)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
