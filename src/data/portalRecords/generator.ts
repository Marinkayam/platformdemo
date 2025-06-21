
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { portals, connectionStatuses, statuses } from "./types";

// Generate portal records for each invoice
export const generatePortalRecordsForInvoice = (invoice: any, index: number): PortalRecord[] => {
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
    
    // Determine portal status
    let portalStatus: PortalRecord['portalStatus'];
    if (connectionStatus === 'Disconnected') {
      portalStatus = 'Error';
    } else if (connectionStatus === 'Syncing') {
      portalStatus = 'Pending';
    } else {
      portalStatus = Math.random() < 0.8 ? 'Active' : 'Inactive';
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
      portalRecordId: `PRC-2025-${String(index * 10 + i + 1).padStart(3, '0')}`,
      portal,
      buyer: invoice.buyer,
      portalStatus,
      invoiceNumber: invoice.id,
      matchType: i === 0 ? "Primary" : "Alternate",
      total: Math.round(amount * 100) / 100,
      currency: invoice.currency || "USD",
      poNumber: `PO-${Math.floor(Math.random() * 99999) + 10000}`,
      supplierName: invoice.buyer,
      connectionStatus,
      lastSynced: `Jun 15, 2025  ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      
      // Legacy compatibility fields
      status,
      updated: updatedDate.toISOString().split('T')[0],
      conflict: isConflict,
      type: recordType,
      companyName: invoice.buyer,
      accountName: `${invoice.buyer} Account`,
      recordType: i === 0 ? 'PO' : 'Invoice',
      matchStatus: isConflict ? "Conflicted" : (isUnmatched ? "Unmatched" : "Matched"),
      lastSyncDate: updatedDate.toISOString().split('T')[0]
    };
    
    records.push(record);
  }
  
  return records;
};

// Generate portal records for all invoices
export const generatePortalRecordsData = (): PortalRecord[] => {
  return invoiceData.flatMap((invoice, index) => 
    generatePortalRecordsForInvoice(invoice, index)
  );
};
