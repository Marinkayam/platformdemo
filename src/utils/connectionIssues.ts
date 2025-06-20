
import { SmartConnection, Agent } from "@/types/smartConnection";

export interface ConnectionIssue {
  type: "missing-credentials" | "authentication-failed" | "configuration-error";
  message: string;
  severity: number; // Higher = more severe
}

export function getConnectionIssues(connection: SmartConnection): ConnectionIssue[] {
  const issues: ConnectionIssue[] = [];
  
  // Only show issues for Samsung Electronics
  if (connection.receivableEntity !== "Samsung Electronics") {
    return issues;
  }
  
  // Only show issues for Unavailable connections
  if (connection.status !== "Unavailable") {
    return issues;
  }

  const regularDisconnectedAgents = connection.agents.filter(
    agent => agent.type === "Regular" && agent.status === "Disconnected"
  );
  
  const montoDisconnectedAgents = connection.agents.filter(
    agent => agent.type === "Monto" && agent.status === "Disconnected"
  );

  // Missing Credentials (highest priority)
  if (regularDisconnectedAgents.length > 0) {
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

  return issues;
}

export function getHighestSeverityIssue(issues: ConnectionIssue[]): ConnectionIssue | null {
  if (issues.length === 0) return null;
  
  return issues.reduce((highest, current) => 
    current.severity > highest.severity ? current : highest
  );
}

export function getAgentIssueMessage(agent: Agent): string | null {
  // Only show issue for SAP Ariba agent, not Oracle Commerce
  if (agent.portalName !== "SAP Ariba") {
    return null;
  }
  
  if (agent.status === "Disconnected") {
    if (agent.type === "Regular") {
      return "Login failed. Please verify username and password.";
    } else {
      return "Authentication failed. Please check account permissions.";
    }
  }
  
  return null;
}
