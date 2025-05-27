
import { SmartConnection } from "@/types/smartConnection";

// Helper function to calculate Smart Connection status based on agent statuses
const calculateSmartConnectionStatus = (agents: any[]): "Live" | "In Process" | "Unavailable" | "Disconnected" | "Inactive" => {
  if (agents.length === 0) return "Unavailable";
  
  // Check if any agent is disconnected/error
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
        portalName: "SAP Ariba",
        type: "Monto",
        status: "Connected",
        portalUser: "john.doe@microsoft.com",
        role: "Submit Invoice"
      },
      {
        id: "a2",
        portalName: "Coupa",
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
        portalName: "Oracle Portal",
        type: "External",
        status: "Connected",
        portalUser: "admin@amazon.com",
        role: "Both"
      },
      {
        id: "a4",
        portalName: "Tradeshift",
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
        portalName: "SAP Ariba",
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
        portalName: "Coupa",
        type: "Monto",
        status: "Building",
        portalUser: "support@spotify.com",
        role: "Monitor Invoice"
      },
      {
        id: "a7",
        portalName: "Oracle Portal",
        type: "Monto",
        status: "Building",
        portalUser: "billing@netflix.com",
        role: "Submit Invoice"
      }
    ]
  },
  {
    id: "5",
    receivableEntity: "ACME Inc.",
    payableEntity: "Target Corp",
    receivableErp: "NetSuite",
    payableErp: "SAP",
    status: "Unavailable",
    agentCount: 2,
    lastUpdated: "2025-05-06",
    isActive: true,
    agents: [
      {
        id: "a8",
        portalName: "SAP Ariba",
        type: "Monto",
        status: "Connected",
        portalUser: "procurement@target.com",
        role: "Submit Invoice"
      },
      {
        id: "a9",
        portalName: "Coupa",
        type: "Monto",
        status: "Disconnected",
        portalUser: "finance@acme.com",
        role: "Monitor Invoice"
      }
    ]
  },
  {
    id: "6",
    receivableEntity: "TechSoft LLC",
    payableEntity: "Walmart Inc.",
    receivableErp: "Oracle",
    payableErp: "Workday",
    status: "Inactive",
    agentCount: 1,
    lastUpdated: "2025-05-01",
    isActive: false,
    agents: [
      {
        id: "a10",
        portalName: "Tradeshift",
        type: "Monto",
        status: "Connected",
        portalUser: "vendor@walmart.com",
        role: "Both"
      }
    ]
  },
  {
    id: "7",
    receivableEntity: "Samsung Electronics",
    payableEntity: "Best Buy Co.",
    receivableErp: "SAP",
    payableErp: "Oracle",
    status: "Unavailable",
    agentCount: 2,
    lastUpdated: "2025-05-03",
    isActive: true,
    agents: [
      {
        id: "a11",
        portalName: "SAP Ariba",
        type: "External",
        status: "Disconnected",
        portalUser: "procurement@bestbuy.com",
        role: "Submit Invoice"
      },
      {
        id: "a12",
        portalName: "Oracle Commerce",
        type: "External",
        status: "Disconnected",
        portalUser: "vendor@samsung.com",
        role: "Monitor Invoice"
      }
    ]
  },
  {
    id: "8",
    receivableEntity: "IBM Corp",
    payableEntity: "HP Inc.",
    receivableErp: "Workday",
    payableErp: "NetSuite",
    status: "Unavailable",
    agentCount: 1,
    lastUpdated: "2025-05-02",
    isActive: true,
    agents: [
      {
        id: "a13",
        portalName: "Coupa",
        type: "External",
        status: "Disconnected",
        portalUser: "finance@hp.com",
        role: "Both"
      }
    ]
  }
];

// Update statuses based on agent statuses
mockSmartConnections.forEach(connection => {
  if (connection.isActive) {
    connection.status = calculateSmartConnectionStatus(connection.agents);
  } else {
    connection.status = "Inactive";
  }
});
