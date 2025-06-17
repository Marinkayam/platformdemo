
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";

// Portal names for variety
const portals = ["SAP Ariba", "Coupa", "Bill.com", "Tipalti", "Oracle", "SAP Fieldglass"];
const statuses: PortalRecord['status'][] = ["Approved", "Paid", "Rejected", "Pending"];
const connectionStatuses: PortalRecord['connectionStatus'][] = ["Connected", "Disconnected", "Syncing"];

// Generate portal records for each invoice
const generatePortalRecordsForInvoice = (invoice: any, index: number): PortalRecord[] => {
  const records: PortalRecord[] = [];
  const numRecords = Math.floor(Math.random() * 5) + 1; // 1-5 records per invoice
  
  for (let i = 0; i < numRecords; i++) {
    const isConflict = Math.random() < 0.15; // 15% chance of conflict
    const isUnmatched = Math.random() < 0.10; // 10% chance of unmatched
    const portal = portals[Math.floor(Math.random() * portals.length)];
    
    // Determine connection status
    let connectionStatus: PortalRecord['connectionStatus'];
    if (Math.random() < 0.15) {
      connectionStatus = "Disconnected";
    } else if (Math.random() < 0.10) {
      connectionStatus = "Syncing";
    } else {
      connectionStatus = "Connected";
    }
    
    // Determine status based on invoice status
    let status: PortalRecord['status'];
    if (invoice.status === 'Paid' || invoice.status === 'Settled') {
      status = Math.random() < 0.8 ? 'Paid' : 'Approved';
    } else if (invoice.status === 'Rejected by Buyer' || invoice.status === 'Rejected by Monto') {
      status = 'Rejected';
    } else if (invoice.status === 'RTP Sent' || invoice.status === 'RTP Prepared') {
      status = Math.random() < 0.6 ? 'Pending' : 'Approved';
    } else {
      status = statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    // Generate realistic amounts (with some variation for conflicts)
    const baseAmount = invoice.total;
    const amount = isConflict ? baseAmount * (0.8 + Math.random() * 0.4) : baseAmount;
    
    // Generate dates within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const updatedDate = new Date();
    updatedDate.setDate(updatedDate.getDate() - daysAgo);
    
    let recordType: PortalRecord['type'];
    if (isConflict) {
      recordType = "Conflict";
    } else if (isUnmatched) {
      recordType = "Unmatched";
    } else {
      recordType = i === 0 ? "Primary" : "Alternate";
    }
    
    const record: PortalRecord = {
      id: `PR-${String(index * 10 + i + 1).padStart(3, '0')}`,
      portal,
      status,
      matchType: i === 0 ? "Primary" : "Alternate",
      updated: updatedDate.toISOString().split('T')[0],
      conflict: isConflict,
      invoiceNumber: invoice.id,
      buyer: invoice.buyer,
      total: Math.round(amount * 100) / 100,
      poNumber: `PO-${Math.floor(Math.random() * 99999) + 10000}`,
      supplierName: invoice.buyer,
      type: recordType,
      currency: invoice.currency || "USD",
      connectionStatus,
      lastSyncDate: updatedDate.toISOString().split('T')[0],
      companyName: invoice.buyer,
      accountName: `${invoice.buyer} Account`,
      recordType: i === 0 ? 'PO' : 'Invoice',
      matchStatus: isConflict ? "Conflicted" : (isUnmatched ? "Unmatched" : "Matched"),
      lastSynced: `Jun 15, 2025  ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
    };
    
    records.push(record);
  }
  
  return records;
};

// Generate portal records for all invoices
export const portalRecordsData: PortalRecord[] = invoiceData.flatMap((invoice, index) => 
  generatePortalRecordsForInvoice(invoice, index)
);

// Demo-focused portal records for onboarding clarity
const demoRecords: PortalRecord[] = [
  {
    id: "PR-001",
    portal: "Coupa",
    invoiceNumber: "INV-1234",
    poNumber: "PO-9981",
    buyer: "BuyerCo",
    matchStatus: "Matched",
    connectionStatus: "Connected",
    lastSynced: "Jun 15, 2025  14:23",
    // Legacy compatibility fields
    status: "Approved",
    matchType: "Primary",
    updated: "2024-06-15",
    conflict: false,
    total: 2350.00,
    supplierName: "BuyerCo",
    type: "Primary",
    currency: "USD",
    companyName: "BuyerCo",
    accountName: "BuyerCo Account",
    recordType: "Invoice",
    lastSyncDate: "2024-06-15"
  },
  {
    id: "PR-002",
    portal: "SAP Ariba",
    invoiceNumber: "INV-9999",
    poNumber: "PO-2134",
    buyer: "FastBuy",
    matchStatus: "Unmatched",
    connectionStatus: "Connected",
    lastSynced: "Jun 15, 2025  13:10",
    // Legacy compatibility fields
    status: "Pending",
    matchType: "Primary",
    updated: "2024-06-15",
    conflict: false,
    total: 1875.50,
    supplierName: "FastBuy",
    type: "Unmatched",
    currency: "USD",
    companyName: "FastBuy",
    accountName: "FastBuy Account",
    recordType: "Invoice",
    lastSyncDate: "2024-06-15"
  },
  {
    id: "PR-003",
    portal: "Bill.com",
    invoiceNumber: "INV-5555",
    poNumber: "PO-8888",
    buyer: "OceanMart",
    matchStatus: "Conflicted",
    connectionStatus: "Connected",
    lastSynced: "Jun 15, 2025  11:02",
    // Legacy compatibility fields
    status: "Pending",
    matchType: "Primary",
    updated: "2024-06-15",
    conflict: true,
    total: 3250.75,
    supplierName: "OceanMart",
    type: "Conflict",
    currency: "USD",
    companyName: "OceanMart",
    accountName: "OceanMart Account",
    recordType: "Invoice",
    lastSyncDate: "2024-06-15"
  },
  {
    id: "PR-004",
    portal: "Coupa",
    invoiceNumber: "INV-7777",
    poNumber: "PO-4040",
    buyer: "DataMax",
    matchStatus: "Pending",
    connectionStatus: "Syncing",
    lastSynced: "In Progress",
    // Legacy compatibility fields
    status: "Pending",
    matchType: "Primary",
    updated: "2024-06-15",
    conflict: false,
    total: 1500.00,
    supplierName: "DataMax",
    type: "Primary",
    currency: "USD",
    companyName: "DataMax",
    accountName: "DataMax Account",
    recordType: "Invoice",
    lastSyncDate: "2024-06-15"
  },
  {
    id: "PR-005",
    portal: "SAP Ariba",
    invoiceNumber: "—",
    poNumber: "—",
    buyer: "—",
    matchStatus: "Pending",
    connectionStatus: "Disconnected",
    lastSynced: "—",
    // Legacy compatibility fields
    status: "Rejected",
    matchType: "Primary",
    updated: "2024-06-15",
    conflict: false,
    total: 0,
    supplierName: "Unknown",
    type: "Unmatched",
    currency: "USD",
    companyName: "Unknown",
    accountName: "Unknown Account",
    recordType: "Invoice",
    lastSyncDate: "2024-06-15"
  }
];

// Export demo records for consistency
export const allPortalRecords = demoRecords;
