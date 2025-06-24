
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Globe } from "lucide-react";
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
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <div className="w-4 h-4 bg-[#7b61ff] rounded-full flex items-center justify-center">
              <Globe className="h-2.5 w-2.5 text-white" />
            </div>
            Portal Name
          </label>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.portalName || agent.portalName}
                onChange={(e) => onFormChange?.('portalName', e.target.value)}
                className="flex-1 p-3 bg-white border rounded-md text-sm"
              />
            ) : (
              <input
                type="text"
                value={agent.portalName}
                readOnly
                className="flex-1 p-3 bg-gray-50 border rounded-md text-sm"
              />
            )}
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(agent.portalName)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Portal User
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={agent.portalUser}
              readOnly
              className="flex-1 p-3 bg-gray-50 border rounded-md text-sm"
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
