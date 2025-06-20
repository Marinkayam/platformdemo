
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function DisconnectedUserAlert() {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Connection Issue</AlertTitle>
      <AlertDescription>
        This user is currently disconnected due to incorrect credentials. 
        Please update the credentials to resolve this exception and restore sync.
      </AlertDescription>
    </Alert>
  );
}
