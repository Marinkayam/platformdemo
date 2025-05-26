
import { SmartConnection } from "@/types/smartConnection";

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
    agentCount: 1,
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
    agentCount: 0,
    lastUpdated: "2025-05-08",
    isActive: false,
    agents: []
  },
  {
    id: "4",
    receivableEntity: "Netflix Inc.",
    payableEntity: "Spotify AB",
    receivableErp: "Xero",
    payableErp: "FreshBooks",
    status: "Disconnected",
    agentCount: 1,
    lastUpdated: "2025-05-05",
    isActive: true,
    agents: [
      {
        id: "a4",
        portalName: "FreshBooks Portal",
        type: "Monto",
        status: "Error",
        portalUser: "support@spotify.com",
        role: "Monitor Invoice"
      }
    ]
  }
];
