
import { SmartConnection } from "@/types/smartConnection";

// Helper function to calculate Smart Connection status based on agent statuses
const calculateSmartConnectionStatus = (agents: any[]): "Live" | "In Process" | "Unavailable" | "Disconnected" | "Inactive" => {
  if (agents.length === 0) return "Unavailable";
  
  // Check if any agent is disconnected
  if (agents.some(agent => agent.status === "Disconnected" || agent.status === "Error")) {
    return "Unavailable";
  }
  
  // Check if any agent is in process (validating or building)
  if (agents.some(agent => agent.status === "Validating" || agent.status === "Building")) {
    return "In Process";
  }
  
  // If all agents are connected
  if (agents.every(agent => agent.status === "Connected")) {
    return "Live";
  }
  
  return "Unavailable";
};

export const mockSmartConnections: SmartConnection[] = [
  {
    id: "1",
    receivableEntity: "Apple Inc.",
    payableEntity: "Microsoft Corp.",
    receivableErp: "NetSuite",
    payableErp: "SAP",
    status: "Live",
    agentCount: 2,
    lastUpdated: "2025-05-12",
    isActive: true,
    agents: [
      {
        id: "a1",
        portalName: "SAP Portal",
        type: "Monto",
        status: "Connected",
        portalUser: "john.doe@microsoft.com",
        role: "Submit Invoice"
      },
      {
        id: "a2",
        portalName: "NetSuite Portal",
        type: "Monto",
        status: "Connected",
        portalUser: "jane.smith@apple.com",
        role: "Monitor Invoice"
      }
    ]
  },
  {
    id: "2",
    receivableEntity: "Google LLC",
    payableEntity: "Amazon Inc.",
    receivableErp: "Oracle",
    payableErp: "Workday",
    status: "In Process",
    agentCount: 2,
    lastUpdated: "2025-05-10",
    isActive: true,
    agents: [
      {
        id: "a3",
        portalName: "Workday Portal",
        type: "External",
        status: "Connected",
        portalUser: "admin@amazon.com",
        role: "Both"
      },
      {
        id: "a4",
        portalName: "Oracle Portal",
        type: "Monto",
        status: "Validating",
        portalUser: "setup@google.com",
        role: "Submit Invoice"
      }
    ]
  },
  {
    id: "3",
    receivableEntity: "Meta Platforms",
    payableEntity: "Tesla Inc.",
    receivableErp: "Sage",
    payableErp: "QuickBooks",
    status: "Unavailable",
    agentCount: 1,
    lastUpdated: "2025-05-08",
    isActive: true,
    agents: [
      {
        id: "a5",
        portalName: "QuickBooks Portal",
        type: "Monto",
        status: "Disconnected",
        portalUser: "finance@tesla.com",
        role: "Monitor Invoice"
      }
    ]
  },
  {
    id: "4",
    receivableEntity: "Netflix Inc.",
    payableEntity: "Spotify AB",
    receivableErp: "Xero",
    payableErp: "FreshBooks",
    status: "In Process",
    agentCount: 2,
    lastUpdated: "2025-05-05",
    isActive: true,
    agents: [
      {
        id: "a6",
        portalName: "FreshBooks Portal",
        type: "Monto",
        status: "Building",
        portalUser: "support@spotify.com",
        role: "Monitor Invoice"
      },
      {
        id: "a7",
        portalName: "Xero Portal",
        type: "Monto",
        status: "Building",
        portalUser: "billing@netflix.com",
        role: "Submit Invoice"
      }
    ]
  }
];

// Update statuses based on agent statuses
mockSmartConnections.forEach(connection => {
  connection.status = calculateSmartConnectionStatus(connection.agents);
});
