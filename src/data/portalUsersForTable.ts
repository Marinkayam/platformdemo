
import { PortalUser } from "@/types/portalUser";

export const mockPortalUsersForTable: PortalUser[] = [
  {
    id: "2",
    portal: "Coupa",
    username: "user2@coupa.com",
    status: "Validating",
    userType: "Customer User",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (50 * 1000)).toISOString(), // 50% progress
    isReadOnly: false,
  },
  {
    id: "4",
    portal: "Bill",
    username: "user4@bill.com",
    status: "Validating",
    userType: "Customer User",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (30 * 1000)).toISOString(), // 30% progress
    isReadOnly: false,
  },
  {
    id: "5",
    portal: "Shopify",
    username: "user5@shopify.com",
    status: "Validating",
    userType: "Monto User",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (10 * 1000)).toISOString(), // 10% progress
    isReadOnly: true,
  },
  {
    id: "1",
    portal: "SAP Ariba",
    username: "user1@ariba.com",
    status: "Connected",
    userType: "Monto User",
    linkedSmartConnections: 2,
    lastUpdated: "2023-10-26T10:00:00Z",
    isReadOnly: true,
  },
  {
    id: "3",
    portal: "Oracle",
    username: "user3@oracle.com",
    status: "Disconnected",
    userType: "Monto User",
    linkedSmartConnections: 1,
    lastUpdated: "2023-10-25T15:30:00Z",
    isReadOnly: true,
    issue: "Invalid password. Login credentials have expired.",
  },
  {
    id: "6",
    portal: "Amazon",
    username: "user6@amazon.com",
    status: "Connected",
    userType: "Customer User",
    linkedSmartConnections: 3,
    lastUpdated: "2023-10-20T11:00:00Z",
    isReadOnly: false,
  },
  {
    id: "7",
    portal: "Tipalti",
    username: "user7@tipalti.com",
    status: "Disconnected",
    userType: "Customer User",
    linkedSmartConnections: 0,
    lastUpdated: "2023-10-19T14:20:00Z",
    isReadOnly: false,
    issue: "Portal URL has changed. Please update the connection settings.",
  },
];
