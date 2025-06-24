
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Agent } from "@/types/smartConnection";

interface AgentDisconnectionAlertProps {
  agent: Agent;
}

export function AgentDisconnectionAlert({ agent }: AgentDisconnectionAlertProps) {
  const getDisconnectionReason = () => {
    if (agent.status === "Disconnected") {
      return "Authentication failed. Please verify your credentials.";
    }
    if (agent.status === "Error") {
      return "Connection error occurred. Please check your settings.";
    }
    return "";
  };

  if (agent.status !== "Disconnected") {
    return null;
  }

  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Connection Failed:</strong> {getDisconnectionReason()} Please edit your credentials and save to retry validation.
      </AlertDescription>
    </Alert>
  );
}
