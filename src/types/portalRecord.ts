
export interface PortalRecord {
  id: string;
  portalRecordId: string;
  portal: string;
  buyer: string;
  portalStatus: 'Approved by Buyer' | 'Rejected by Buyer' | 'Paid' | 'Settled' | 'Partially Settled' | 'Pending Approval';
  invoiceNumber?: string; // Optional for unmatched records
  matchType: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
  total: number;
  currency: 'USD' | 'EUR' | 'GBP';
  poNumber: string;
  supplierName: string;
   connectionStatus: 'Connected' | 'Disconnected' | 'Syncing';
   lastSynced: string;
   invoiceDate?: string;
   dueDate?: string;
   netTerms?: string;
   promiseToPay?: string;
   issueDate?: string;
   paymentTerms?: string;
   subtotal?: number;
   taxTotal?: number;
   portalCreationDate?: string;
   createdAt?: string;

  // Legacy fields kept for compatibility
  matchStatus?: 'Matched' | 'Unmatched' | 'Conflicted' | 'Pending' | '—';
  status?: 'Approved' | 'Paid' | 'Rejected' | 'Pending';
  updated?: string;
  conflict?: boolean;
  type?: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
  companyName?: string;
  accountName?: string;
  recordType?: string;
  lastSyncDate?: string;
}
