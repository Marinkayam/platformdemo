
import { PortalRecord } from "@/types/portalRecord";

// Demo-focused portal records for onboarding clarity - Following the exact mockup rules
export const demoRecords: PortalRecord[] = [
  // ✅ Matched Example - Show both Invoice # and PO #, with full buyer + connection info
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
  // ⚠️ Unmatched Example (Invoice Only) - Show either Invoice OR PO (not both)
  {
    id: "PR-002",
    portal: "SAP Ariba",
    invoiceNumber: "INV-9999",
    poNumber: "—",
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
  // 🚫 Conflicted Example - Show both Invoice + PO, but status badge = Conflicted
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
  // 🟡 In Progress Example - Show invoice/PO if pulled, set status to — if linking not done yet
  {
    id: "PR-004",
    portal: "Coupa",
    invoiceNumber: "INV-7777",
    poNumber: "PO-4040",
    buyer: "DataMax",
    matchStatus: "—",
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
  // ❌ Disconnected Example - Show only portal name, all other fields —
  {
    id: "PR-005",
    portal: "SAP Ariba",
    invoiceNumber: "—",
    poNumber: "—",
    buyer: "—",
    matchStatus: "—",
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
