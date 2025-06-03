
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
          <CardTitle className="text-lg font-medium">RTP Connection</CardTitle>
          <SmartConnectionStatusBadge status={connection.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {connection.status === "Unavailable" && (
          <SmartConnectionAlert 
            exceptions={connection.exceptions}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Portal:</span>
            <p className="font-medium">{connection.portal.type}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Account Type:</span>
            <p className="font-medium">{connection.portal.reference}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last Sync:</span>
            <p className="font-medium">{connection.lastUpdated}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Connection ID:</span>
            <p className="font-medium text-xs">{connection.buyer.id}</p>
          </div>
        </div>

        <ProcessTimeline />
      </CardContent>
    </Card>
  );
}
