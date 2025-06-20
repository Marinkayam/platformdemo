
import { PortalUser } from "@/types/portalUser";

export const mockPortalUsersForTable: PortalUser[] = [
  {
    id: "2",
    portal: "Coupa",
    username: "user2@coupa.com",
    status: "Validating",
    userType: "Regular",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (50 * 1000)).toISOString(), // 50% progress
    isReadOnly: false,
  },
  {
    id: "4",
    portal: "Bill",
    username: "user4@bill.com",
    status: "Validating",
    userType: "Regular",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (30 * 1000)).toISOString(), // 30% progress
    isReadOnly: false,
  },
  {
    id: "5",
    portal: "Shopify",
    username: "user5@shopify.com",
    status: "Validating",
    userType: "Monto",
    linkedSmartConnections: 0,
    lastUpdated: new Date(Date.now() - (10 * 1000)).toISOString(), // 10% progress
    isReadOnly: true,
  },
  {
    id: "1",
    portal: "SAP Ariba",
    username: "user1@ariba.com",
    status: "Connected",
    userType: "Monto",
    linkedSmartConnections: 2,
    lastUpdated: "2023-10-26T10:00:00Z",
    isReadOnly: true,
  },
  {
    id: "3",
    portal: "Oracle",
    username: "user3@oracle.com",
    status: "Disconnected",
    userType: "Monto",
    linkedSmartConnections: 1,
    lastUpdated: "2023-10-25T15:30:00Z",
    isReadOnly: true,
  },
  {
    id: "6",
    portal: "Amazon",
    username: "user6@amazon.com",
    status: "Connected",
    userType: "Regular",
    linkedSmartConnections: 3,
    lastUpdated: "2023-10-20T11:00:00Z",
    isReadOnly: false,
  },
];
