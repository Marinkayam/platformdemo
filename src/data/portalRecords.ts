import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";

// Portal names for variety
const portals = ["SAP Ariba", "Coupa", "Bill.com", "Tipalti", "Oracle", "SAP Fieldglass"];
const statuses: PortalRecord['status'][] = ["Approved", "Paid", "Rejected", "Pending"];

// Generate portal records for each invoice
const generatePortalRecordsForInvoice = (invoice: any, index: number): PortalRecord[] => {
  const records: PortalRecord[] = [];
  const numRecords = Math.floor(Math.random() * 5) + 1; // 1-5 records per invoice
  
  for (let i = 0; i < numRecords; i++) {
    const isConflict = Math.random() < 0.15; // 15% chance of conflict
    const portal = portals[Math.floor(Math.random() * portals.length)];
    
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
      type: isConflict ? "Conflict" : (i === 0 ? "Primary" : "Alternate"),
      currency: invoice.currency || "USD",
      connectionStatus: status === 'Approved' ? 'Connected' : 'Disconnected',
      lastSyncDate: updatedDate.toISOString().split('T')[0],
      companyName: invoice.buyer,
      accountName: `${invoice.buyer} Account`,
      recordType: i === 0 ? 'PO' : 'Invoice',
    };
    
    records.push(record);
  }
  
  return records;
};

// Generate portal records for all invoices
export const portalRecordsData: PortalRecord[] = invoiceData.flatMap((invoice, index) => 
  generatePortalRecordsForInvoice(invoice, index)
);

// Original manual records (keeping a few for consistency)
const manualRecords: PortalRecord[] = [
  {
    id: "PR-001",
    portal: "SAP Ariba",
    status: "Approved",
    matchType: "Primary",
    updated: "2024-04-15",
    conflict: false,
    invoiceNumber: "10021301",
    buyer: "Acme Corporation",
    total: 2350.00,
    poNumber: "PO-88991",
    supplierName: "Acme Corporation",
    type: "Primary",
    currency: "USD",
    connectionStatus: "Connected",
    accountName: "Acme Corp",
    recordType: "PO",
    lastSyncDate: "2024-04-15",
    companyName: "Acme Corporation",
  },
  {
    id: "PR-002",
    portal: "Coupa",
    status: "Paid",
    matchType: "Primary",
    updated: "2024-04-14",
    conflict: false,
    invoiceNumber: "10021302",
    buyer: "Global Enterprises",
    total: 1875.50,
    poNumber: "PO-77825",
    supplierName: "Global Enterprises Inc",
    type: "Primary",
    currency: "USD",
    connectionStatus: "Connected",
    accountName: "Global Ent. Primary",
    recordType: "Invoice",
    lastSyncDate: "2024-04-14",
    companyName: "Global Enterprises",
  }
];

// Combine generated and manual records
export const allPortalRecords = [...portalRecordsData, ...manualRecords];
