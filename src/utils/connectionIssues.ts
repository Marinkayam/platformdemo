
import { SmartConnection, Agent } from "@/types/smartConnection";

export interface ConnectionIssue {
  type: "missing-credentials" | "authentication-failed" | "configuration-error";
  message: string;
  severity: number; // Higher = more severe
}

export function getConnectionIssues(connection: SmartConnection): ConnectionIssue[] {
  const issues: ConnectionIssue[] = [];
  
  // Only show issues for Unavailable connections
  if (connection.status !== "Unavailable") {
    return issues;
  }

  const externalDisconnectedAgents = connection.agents.filter(
    agent => agent.type === "External" && agent.status === "Disconnected"
  );
  
  const montoDisconnectedAgents = connection.agents.filter(
    agent => agent.type === "Monto" && agent.status === "Disconnected"
  );
  
  const errorAgents = connection.agents.filter(
    agent => agent.status === "Error"
  );

  // Missing Credentials (highest priority)
  if (externalDisconnectedAgents.length > 0) {
    issues.push({
      type: "missing-credentials",
      message: "Missing Credentials",
      severity: 3
    });
  }
  
  // Authentication Failed (medium priority)
  if (montoDisconnectedAgents.length > 0) {
    issues.push({
      type: "authentication-failed", 
      message: "Authentication Failed",
      severity: 2
    });
  }
  
  // Configuration Error (lower priority)
  if (errorAgents.length > 0) {
    issues.push({
      type: "configuration-error",
      message: "Configuration Error", 
      severity: 1
    });
  }

  return issues;
}

export function getHighestSeverityIssue(issues: ConnectionIssue[]): ConnectionIssue | null {
  if (issues.length === 0) return null;
  
  return issues.reduce((highest, current) => 
    current.severity > highest.severity ? current : highest
  );
}

export function getAgentIssueMessage(agent: Agent): string | null {
  if (agent.status === "Disconnected") {
    if (agent.type === "External") {
      return "Login failed. Please verify username and password.";
    } else {
      return "Authentication failed. Please check account permissions.";
    }
  }
  
  if (agent.status === "Error") {
    return "Configuration error detected. Please review agent settings.";
  }
  
  return null;
}
