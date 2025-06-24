
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Building2 } from "lucide-react";
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
  const getUserTypeDisplay = () => {
    return agent.type === "Monto" ? "Monto User" : "Customer User";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Portal Name
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              {isEditMode ? (
                <input
                  type="text"
                  value={editFormData?.portalName || agent.portalName}
                  onChange={(e) => onFormChange?.('portalName', e.target.value)}
                  className="w-full p-3 pl-10 bg-white border rounded-md text-sm"
                />
              ) : (
                <input
                  type="text"
                  value={agent.portalName}
                  readOnly
                  className="w-full p-3 pl-10 bg-gray-50 border rounded-md text-sm"
                />
              )}
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7b61ff]" />
            </div>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(agent.portalName)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">
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

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            User Type
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={getUserTypeDisplay()}
              readOnly
              className="flex-1 p-3 bg-gray-50 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
