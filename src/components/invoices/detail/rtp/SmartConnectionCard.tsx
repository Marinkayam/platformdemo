
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { SmartConnectionAlert } from "./SmartConnectionAlert";
import { ProcessTimeline } from "./ProcessTimeline";
import { SmartConnection } from "./types";

interface SmartConnectionCardProps {
  connection: SmartConnection;
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
            message="One or more agents are disconnected. Credentials may be outdated or missing — please review to restore connection."
            actionText="Review Connection"
            onAction={() => console.log("Review connection clicked")}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Portal:</span>
            <p className="font-medium">{connection.portal}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Account Type:</span>
            <p className="font-medium">{connection.accountType}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last Sync:</span>
            <p className="font-medium">{connection.lastSync}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Connection ID:</span>
            <p className="font-medium text-xs">{connection.id}</p>
          </div>
        </div>

        <ProcessTimeline />
      </CardContent>
    </Card>
  );
}
