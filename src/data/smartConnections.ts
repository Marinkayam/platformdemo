
import { SmartConnection } from "@/types/smartConnection";

export const mockSmartConnections: SmartConnection[] = [
  {
    id: "1",
    receivableCompany: "Acme Corp",
    payableCompany: "Supplier A",
    receivableEntity: "Acme Corp",
    payableEntity: "Supplier A",
    receivableErp: "SAP",
    payableErp: "Oracle",
    status: "Connected",
    lastSync: "2023-10-26T10:00:00Z",
    isActive: true,
    buyer: {
      name: "Acme Corp",
      id: "buyer-1"
    },
    supplier: {
      name: "Supplier A",
      id: "supplier-1"
    },
    portal: {
      type: "SAP Ariba",
      reference: "ref-1",
      user: "user1@ariba.com"
    },
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
    receivableEntity: "Tech Solutions",
    payableEntity: "Vendor B",
    receivableErp: "Oracle",
    payableErp: "SAP",
    status: "Disconnected",
    lastSync: "2023-10-25T15:30:00Z",
    isActive: false,
    buyer: {
      name: "Tech Solutions",
      id: "buyer-2"
    },
    supplier: {
      name: "Vendor B",
      id: "supplier-2"
    },
    portal: {
      type: "Oracle",
      reference: "ref-2",
      user: "user3@oracle.com"
    },
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
    receivableEntity: "Global Industries",
    payableEntity: "Service Provider C",
    receivableErp: "Workday",
    payableErp: "NetSuite",
    status: "Connected",
    lastSync: "2023-10-24T14:20:00Z",
    isActive: true,
    buyer: {
      name: "Global Industries",
      id: "buyer-3"
    },
    supplier: {
      name: "Service Provider C",
      id: "supplier-3"
    },
    portal: {
      type: "Tipalti",
      reference: "ref-3",
      user: "user4@tipalti.com"
    },
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
    receivableEntity: "Manufacturing Co",
    payableEntity: "Raw Materials Ltd",
    receivableErp: "Microsoft Dynamics",
    payableErp: "QuickBooks",
    status: "Connected",
    lastSync: "2023-10-20T11:00:00Z",
    isActive: true,
    buyer: {
      name: "Manufacturing Co",
      id: "buyer-4"
    },
    supplier: {
      name: "Raw Materials Ltd",
      id: "supplier-4"
    },
    portal: {
      type: "Bill",
      reference: "ref-4",
      user: "user6@bill.com"
    },
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
