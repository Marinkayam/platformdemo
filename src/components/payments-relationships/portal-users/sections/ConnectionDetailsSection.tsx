
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortalUser } from "@/types/portalUser";

interface ConnectionDetailsSectionProps {
  portalUser: PortalUser;
  mockLinkedConnections: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  handleConnectionClick: (url: string) => void;
}

export function ConnectionDetailsSection({ 
  portalUser, 
  mockLinkedConnections, 
  handleConnectionClick 
}: ConnectionDetailsSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">Linked Smart Connections</Label>
      {mockLinkedConnections.length > 0 ? (
        <div className="space-y-2">
          {mockLinkedConnections.map((connection) => (
            <button
              key={connection.id}
              onClick={() => handleConnectionClick(connection.url)}
              className="w-full h-10 px-3 py-2 bg-gray-50 border border-input rounded-md text-left text-sm text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              {connection.name}
            </button>
          ))}
        </div>
      ) : (
        <Input 
          value="No linked connections" 
          readOnly 
          className="bg-gray-50 text-gray-500 h-10 text-sm" 
        />
      )}
    </div>
  );
}
