
import { SmartConnection } from "@/types/smartConnection";

export const mockSmartConnections: SmartConnection[] = [
  {
    id: "1",
    receivableCompany: "Acme Corp",
    payableCompany: "Supplier A",
    status: "Connected",
    lastSync: "2023-10-26T10:00:00Z",
    agents: [
      {
        id: "agent1",
        portalName: "SAP Ariba",
        portalUser: "user1@ariba.com",
        status: "Connected",
        type: "Monto",
        lastSync: "2023-10-26T10:00:00Z",
        issueCount: 0,
      },
      {
        id: "agent2",
        portalName: "Coupa",
        portalUser: "user2@coupa.com",
        status: "Validating",
        type: "Regular",
        lastSync: "2023-10-26T09:30:00Z",
        issueCount: 0,
      },
    ],
  },
  {
    id: "2",
    receivableCompany: "Tech Solutions",
    payableCompany: "Vendor B",
    status: "Disconnected",
    lastSync: "2023-10-25T15:30:00Z",
    agents: [
      {
        id: "agent3",
        portalName: "Oracle",
        portalUser: "user3@oracle.com",
        status: "Disconnected",
        type: "Regular",
        lastSync: "2023-10-25T15:30:00Z",
        issueCount: 2,
        issues: ["Invalid credentials", "Portal API timeout"],
      },
    ],
  },
  {
    id: "3",
    receivableCompany: "Global Industries",
    payableCompany: "Service Provider C",
    status: "Connected",
    lastSync: "2023-10-24T14:20:00Z",
    agents: [
      {
        id: "agent4",
        portalName: "Tipalti",
        portalUser: "user4@tipalti.com",
        status: "Connected",
        type: "Regular",
        lastSync: "2023-10-24T14:20:00Z",
        issueCount: 0,
      },
      {
        id: "agent5",
        portalName: "Amazon Payee",
        portalUser: "user5@amazon.com",
        status: "Connected",
        type: "Monto",
        lastSync: "2023-10-24T14:15:00Z",
        issueCount: 0,
      },
    ],
  },
  {
    id: "4",
    receivableCompany: "Manufacturing Co",
    payableCompany: "Raw Materials Ltd",
    status: "Connected",
    lastSync: "2023-10-20T11:00:00Z",
    agents: [
      {
        id: "agent6",
        portalName: "Bill",
        portalUser: "user6@bill.com",
        status: "Connected",
        type: "Regular",
        lastSync: "2023-10-20T11:00:00Z",
        issueCount: 0,
      },
    ],
  },
];
