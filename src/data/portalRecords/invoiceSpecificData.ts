
import { PortalRecord } from "@/types/portalRecord";

// Specific portal records for demo invoices
export const invoiceSpecificRecords: PortalRecord[] = [
  // Invoice ID "5" records (this matches the current route /invoices/5)
  {
    id: "PR-081",
    portalRecordId: "PRC-2025-081",
    portal: "Coupa",
    buyer: "TechCorp",
    portalStatus: "Active",
    invoiceNumber: "5", // Match the invoice ID from route
    matchType: "Primary", // Only one Primary per invoice
    total: 2850.00,
    currency: "USD",
    poNumber: "PO-7890",
    supplierName: "TechCorp",
    connectionStatus: "Connected",
    lastSynced: "Jun 15, 2025  14:23",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-06-15",
    conflict: false,
    type: "Primary",
    companyName: "TechCorp",
    accountName: "TechCorp Account",
    recordType: "Invoice",
    lastSyncDate: "2025-06-15"
  },
  {
    id: "PR-082",
    portalRecordId: "PRC-2025-082",
    portal: "Coupa",
    buyer: "TechCorp",
    portalStatus: "Active",
    invoiceNumber: "5", // Match the invoice ID from route
    matchType: "Alternate", // This is Alternate, not Primary
    total: 2850.00,
    currency: "USD",
    poNumber: "PO-7891",
    supplierName: "TechCorp",
    connectionStatus: "Connected",
    lastSynced: "May 20, 2025  10:15",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-05-20",
    conflict: false,
    type: "Alternate",
    companyName: "TechCorp",
    accountName: "TechCorp Account",
    recordType: "Invoice",
    lastSyncDate: "2025-05-20"
  },
  // INV-10021111 records
  {
    id: "PR-083",
    portalRecordId: "PRC-2025-083",
    portal: "Coupa",
    buyer: "TechCorp",
    portalStatus: "Active",
    invoiceNumber: "INV-10021111",
    matchType: "Primary", // Primary for INV-10021111
    total: 2850.00,
    currency: "USD",
    poNumber: "PO-7892",
    supplierName: "TechCorp",
    connectionStatus: "Connected",
    lastSynced: "Jun 15, 2025  14:23",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-06-15",
    conflict: false,
    type: "Primary",
    companyName: "TechCorp",
    accountName: "TechCorp Account",
    recordType: "Invoice",
    lastSyncDate: "2025-06-15"
  },
  {
    id: "PR-084",
    portalRecordId: "PRC-2025-084",
    portal: "Coupa",
    buyer: "TechCorp",
    portalStatus: "Active",
    invoiceNumber: "INV-10021111",
    matchType: "Alternate", // Alternate for INV-10021111
    total: 2850.00,
    currency: "USD",
    poNumber: "PO-7893",
    supplierName: "TechCorp",
    connectionStatus: "Connected",
    lastSynced: "May 20, 2025  10:15",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-05-20",
    conflict: false,
    type: "Alternate",
    companyName: "TechCorp",
    accountName: "TechCorp Account",
    recordType: "Invoice",
    lastSyncDate: "2025-05-20"
  },
  // INV-100121305 records
  {
    id: "PR-091",
    portalRecordId: "PRC-2025-091",
    portal: "SAP Ariba",
    buyer: "GlobalTech",
    portalStatus: "Active",
    invoiceNumber: "INV-100121305",
    matchType: "Primary", // Primary for INV-100121305
    total: 4200.00,
    currency: "USD",
    poNumber: "PO-5543",
    supplierName: "GlobalTech",
    connectionStatus: "Connected",
    lastSynced: "Jun 14, 2025  16:42",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-06-14",
    conflict: false,
    type: "Primary",
    companyName: "GlobalTech",
    accountName: "GlobalTech Account",
    recordType: "Invoice",
    lastSyncDate: "2025-06-14"
  },
  {
    id: "PR-092",
    portalRecordId: "PRC-2025-092",
    portal: "SAP Ariba",
    buyer: "GlobalTech",
    portalStatus: "Active",
    invoiceNumber: "INV-100121305",
    matchType: "Alternate", // Alternate for INV-100121305
    total: 4200.00,
    currency: "USD",
    poNumber: "PO-5544",
    supplierName: "GlobalTech",
    connectionStatus: "Connected",
    lastSynced: "Jun 01, 2025  09:30",
    
    // Legacy compatibility fields
    matchStatus: "Matched",
    status: "Paid",
    updated: "2025-06-01",
    conflict: false,
    type: "Alternate",
    companyName: "GlobalTech",
    accountName: "GlobalTech Account",
    recordType: "Invoice",
    lastSyncDate: "2025-06-01"
  },
  {
    id: "PR-093",
    portalRecordId: "PRC-2025-093",
    portal: "SAP Ariba",
    buyer: "GlobalTech",
    portalStatus: "Active",
    invoiceNumber: "INV-100121305",
    matchType: "Conflict", // Alternate (conflict) for INV-100121305
    total: 4150.00, // Slightly different amount to show conflict
    currency: "USD",
    poNumber: "PO-5545",
    supplierName: "GlobalTech",
    connectionStatus: "Connected",
    lastSynced: "May 28, 2025  14:20",
    
    // Legacy compatibility fields
    matchStatus: "Conflicted",
    status: "Paid",
    updated: "2025-05-28",
    conflict: true,
    type: "Conflict",
    companyName: "GlobalTech",
    accountName: "GlobalTech Account",
    recordType: "Invoice",
    lastSyncDate: "2025-05-28"
  }
];
