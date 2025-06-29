
import { PortalRecord } from "@/types/portalRecord";

export const invoiceSpecificRecords: PortalRecord[] = [
  // Invoice 1 - Multiple records (Primary + Alternate)
  {
    id: "pr-inv1-primary",
    portalRecordId: "123456",
    portal: "Coupa",
    buyer: "Acme Corporation",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "1",
    matchType: "Primary",
    total: 2350.20,
    currency: "USD",
    poNumber: "PO-2024-001",
    supplierName: "Tech Solutions Inc.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-15T10:30:00Z",
    status: "Approved",
    updated: "2024-01-15T10:30:00Z",
    conflict: false
  },
  {
    id: "pr-inv1-alternate",
    portalRecordId: "789012",
    portal: "SAP Ariba",
    buyer: "Acme Corporation",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "1",
    matchType: "Alternate",
    total: 2350.20,
    currency: "USD",
    poNumber: "PO-2024-001",
    supplierName: "Tech Solutions Inc.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-15T09:45:00Z",
    status: "Pending",
    updated: "2024-01-15T09:45:00Z",
    conflict: false
  },
  
  // Invoice 3 - Multiple records with conflict
  {
    id: "pr-inv3-primary",
    portalRecordId: "345678",
    portal: "Oracle",
    buyer: "Global Enterprises",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "3",
    matchType: "Primary",
    total: 1750.00,
    currency: "USD",
    poNumber: "PO-2024-003",
    supplierName: "Office Supplies Co.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-20T14:15:00Z",
    status: "Approved",
    updated: "2024-01-20T14:15:00Z",
    conflict: false
  },
  {
    id: "pr-inv3-alternate",
    portalRecordId: "901234",
    portal: "Bill.com",
    buyer: "Global Enterprises",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "3",
    matchType: "Alternate",
    total: 1800.00, // Different amount - causes conflict
    currency: "USD",
    poNumber: "PO-2024-003",
    supplierName: "Office Supplies Co.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-20T13:30:00Z",
    status: "Pending",
    updated: "2024-01-20T13:30:00Z",
    conflict: true
  },

  // Invoice 5 - Multiple records (3 records)
  {
    id: "pr-inv5-primary",
    portalRecordId: "567890",
    portal: "Coupa",
    buyer: "TechCorp Industries",
    portalStatus: "Paid",
    invoiceNumber: "5",
    matchType: "Primary",
    total: 4200.75,
    currency: "USD",
    poNumber: "PO-2024-005",
    supplierName: "Industrial Equipment Ltd.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-25T16:20:00Z",
    status: "Paid",
    updated: "2024-01-25T16:20:00Z",
    conflict: false
  },
  {
    id: "pr-inv5-alternate1",
    portalRecordId: "234567",
    portal: "SAP Ariba",
    buyer: "TechCorp Industries",
    portalStatus: "Paid",
    invoiceNumber: "5",
    matchType: "Alternate",
    total: 4200.75,
    currency: "USD",
    poNumber: "PO-2024-005",
    supplierName: "Industrial Equipment Ltd.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-25T15:45:00Z",
    status: "Approved",
    updated: "2024-01-25T15:45:00Z",
    conflict: false
  },
  {
    id: "pr-inv5-alternate2",
    portalRecordId: "890123",
    portal: "Tipalti",
    buyer: "TechCorp Industries",
    portalStatus: "Settled",
    invoiceNumber: "5",
    matchType: "Alternate",
    total: 4200.75,
    currency: "USD",
    poNumber: "PO-2024-005",
    supplierName: "Industrial Equipment Ltd.",
    connectionStatus: "Connected",
    lastSynced: "2024-01-25T14:30:00Z",
    status: "Pending",
    updated: "2024-01-25T14:30:00Z",
    conflict: false
  },

  // Invoice 7 - Multiple records
  {
    id: "pr-inv7-primary",
    portalRecordId: "456789",
    portal: "Oracle",
    buyer: "Manufacturing Corp",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "7",
    matchType: "Primary",
    total: 3200.50,
    currency: "USD",
    poNumber: "PO-2024-007",
    supplierName: "Raw Materials Inc.",
    connectionStatus: "Connected",
    lastSynced: "2024-02-01T11:10:00Z",
    status: "Approved",
    updated: "2024-02-01T11:10:00Z",
    conflict: false
  },
  {
    id: "pr-inv7-alternate",
    portalRecordId: "012345",
    portal: "SAP Fieldglass",
    buyer: "Manufacturing Corp",
    portalStatus: "Approved by Buyer",
    invoiceNumber: "7",
    matchType: "Alternate",
    total: 3200.50,
    currency: "USD",
    poNumber: "PO-2024-007",
    supplierName: "Raw Materials Inc.",
    connectionStatus: "Connected",
    lastSynced: "2024-02-01T10:25:00Z",
    status: "Pending",
    updated: "2024-02-01T10:25:00Z",
    conflict: false
  },

  // Invoice 10 - Multiple records
  {
    id: "pr-inv10-primary",
    portalRecordId: "678901",
    portal: "Bill.com",
    buyer: "Service Solutions LLC",
    portalStatus: "Settled",
    invoiceNumber: "10",
    matchType: "Primary",
    total: 1825.30,
    currency: "USD",
    poNumber: "PO-2024-010",
    supplierName: "Consulting Group",
    connectionStatus: "Connected",
    lastSynced: "2024-02-05T13:40:00Z",
    status: "Paid",
    updated: "2024-02-05T13:40:00Z",
    conflict: false
  },
  {
    id: "pr-inv10-alternate",
    portalRecordId: "345012",
    portal: "Coupa",
    buyer: "Service Solutions LLC",
    portalStatus: "Partially Settled",
    invoiceNumber: "10",
    matchType: "Alternate",
    total: 1825.30,
    currency: "USD",
    poNumber: "PO-2024-010",
    supplierName: "Consulting Group",
    connectionStatus: "Connected",
    lastSynced: "2024-02-05T12:55:00Z",
    status: "Approved",
    updated: "2024-02-05T12:55:00Z",
    conflict: false
  }
];

// Helper function to get invoices with multiple portal records
export const getInvoicesWithMultipleRecords = () => {
  const invoiceGroups = invoiceSpecificRecords.reduce((acc, record) => {
    const invoiceNum = record.invoiceNumber;
    if (!acc[invoiceNum]) {
      acc[invoiceNum] = [];
    }
    acc[invoiceNum].push(record);
    return acc;
  }, {} as Record<string, PortalRecord[]>);

  return Object.entries(invoiceGroups)
    .filter(([_, records]) => records.length > 1)
    .map(([invoiceNumber, records]) => ({
      invoiceNumber,
      recordCount: records.length,
      records: records.map(r => ({
        portalRecordId: r.portalRecordId,
        portal: r.portal,
        matchType: r.matchType,
        status: r.status
      }))
    }));
};
