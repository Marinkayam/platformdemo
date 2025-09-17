import { SmartConnection } from "@/types/smartConnection";

// Helper function to calculate Smart Connection status based on agent statuses
const calculateSmartConnectionStatus = (agents: { status: string }[]): "Connected" | "Connecting" | "Needs Attention" | "Disconnected" | "Inactive" => {
  if (agents.length === 0) return "Needs Attention";
  
  // Check if any agent is disconnected/error
  if (agents.some(agent => agent.status === "Disconnected" || agent.status === "Error")) {
    return "Needs Attention";
  }
  
  // Check if any agent is in process (validating or building)
  if (agents.some(agent => agent.status === "Validating" || agent.status === "Building")) {
    return "Connecting";
  }
  
  // If all agents are connected
  if (agents.every(agent => agent.status === "Connected")) {
    return "Connected";
  }
  
  return "Needs Attention";
};

export const mockSmartConnections: SmartConnection[] = [
  {
    id: "1",
    receivableEntity: "DataFlow Inc.",
    payableEntity: "Monto Corp",
    receivableErp: "NetSuite",
    payableErp: "SAP",
    status: "Connected",
    agentCount: 2,
    lastUpdated: "2025-05-12",
    isActive: true,
    agents: [
      {
        id: "a1",
        portalName: "SAP Ariba",
        type: "External",
        status: "Connected",
        portalUser: "john.doe@microsoft.com",
        role: "Submit Invoice"
      },
      {
        id: "a2",
        portalName: "Coupa",
        type: "External",
        status: "Connected",
        portalUser: "jane.smith@apple.com",
        role: "Monitor Invoice"
      }
    ],
    buyer: { name: "DataFlow Inc." },
    supplier: { name: "Monto Corp" },
    portal: { type: "SAP Ariba", user: "john.doe@microsoft.com" }
  },
  {
    id: "2",
    receivableEntity: "Google LLC",
    payableEntity: "Amazon Inc.",
    receivableErp: "Oracle",
    payableErp: "Workday",
    status: "Connecting",
    agentCount: 1,
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
    ],
    buyer: { name: "Google LLC" },
    supplier: { name: "Amazon Inc." },
    portal: { type: "Oracle Portal", user: "admin@amazon.com" }
  },
  {
    id: "3",
    receivableEntity: "Meta Platforms",
    payableEntity: "Tesla Inc.",
    receivableErp: "Sage",
    payableErp: "QuickBooks",
    status: "Needs Attention",
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
    ],
    buyer: { name: "Meta Platforms" },
    supplier: { name: "Tesla Inc." },
    portal: { type: "SAP Ariba", user: "finance@tesla.com" }
  },
  {
    id: "4",
    receivableEntity: "Netflix Inc.",
    payableEntity: "Spotify AB",
    receivableErp: "Xero",
    payableErp: "FreshBooks",
    status: "Connecting",
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
    ],
    buyer: { name: "Netflix Inc." },
    supplier: { name: "Spotify AB" },
    portal: { type: "Coupa", user: "support@spotify.com" }
  },
  {
    id: "5",
    receivableEntity: "ACME Inc.",
    payableEntity: "Target Corp",
    receivableErp: "NetSuite",
    payableErp: "SAP",
    status: "Needs Attention",
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
    ],
    buyer: { name: "ACME Inc." },
    supplier: { name: "Target Corp" },
    portal: { type: "SAP Ariba", user: "procurement@target.com" }
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
    ],
    buyer: { name: "TechSoft LLC" },
    supplier: { name: "Walmart Inc." },
    portal: { type: "Tradeshift", user: "vendor@walmart.com" }
  },
  {
    id: "7",
    receivableEntity: "Samsung Electronics",
    payableEntity: "Best Buy Co.",
    receivableErp: "SAP",
    payableErp: "Oracle",
    status: "Needs Attention",
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
    ],
    buyer: { name: "Samsung Electronics" },
    supplier: { name: "Best Buy Co." },
    portal: { type: "SAP Ariba", user: "procurement@bestbuy.com" }
  },
  {
    id: "8",
    receivableEntity: "IBM Corp",
    payableEntity: "HP Inc.",
    receivableErp: "Workday",
    payableErp: "NetSuite",
    status: "Needs Attention",
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
    ],
    buyer: { name: "IBM Corp" },
    supplier: { name: "HP Inc." },
    portal: { type: "Coupa", user: "finance@hp.com" }
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
