
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Agent } from "@/types/smartConnection";

interface AgentSmartConnectionSectionProps {
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
  copyToClipboard: (text: string) => void;
}

export function AgentSmartConnectionSection({ 
  agent, 
  connectionInfo, 
  copyToClipboard 
}: AgentSmartConnectionSectionProps) {
  // Mock smart connection data
  const mockSmartConnection = {
    id: "sc1",
    name: `${connectionInfo.receivable} → ${connectionInfo.payable}`,
    url: `/payments-relationships?filter=connection1`
  };

  const handleSmartConnectionClick = (url: string) => {
    console.log("Navigate to:", url);
    // In a real app, this would use navigation
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Smart Connection
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3 bg-gray-50 border rounded-md text-sm text-gray-900">
              <div className="font-medium">{mockSmartConnection.name}</div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleSmartConnectionClick(mockSmartConnection.url)}
            >
              View
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Role
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={agent.role}
              readOnly
              className="flex-1 p-3 bg-gray-50 border rounded-md text-sm"
            />
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(agent.role)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
