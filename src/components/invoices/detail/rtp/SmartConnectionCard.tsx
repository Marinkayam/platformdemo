
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { SmartConnectionAlert } from "./SmartConnectionAlert";
import { ProcessTimeline } from "./ProcessTimeline";
import { SmartConnectionProps } from "./types";

interface SmartConnectionCardProps {
  connection: SmartConnectionProps;
}

export function SmartConnectionCard({ connection }: SmartConnectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Smart Connection</CardTitle>
          <SmartConnectionStatusBadge status={connection.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {connection.status === "Unavailable" && (
          <SmartConnectionAlert 
            exceptions={connection.exceptions}
          />
        )}
        
        <div className="space-y-4">
          {/* Buyer and Supplier row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Buyer:</span>
              <p className="font-medium">{connection.buyer.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Supplier:</span>
              <p className="font-medium">{connection.supplier.name}</p>
            </div>
          </div>
          
          {/* Portal and Portal User row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Portal:</span>
              <p className="font-medium">{connection.portal.type}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Portal User:</span>
              <p className="font-medium">{connection.portal.user}</p>
            </div>
          </div>
          
          {/* View Full Details link */}
          <div className="pt-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
              View Full Details
            </button>
          </div>
        </div>

        <ProcessTimeline />
      </CardContent>
    </Card>
  );
}
