
export interface PortalRecord {
  id: string;
  portal: string;
  invoiceNumber: string;
  poNumber: string;
  buyer: string;
  matchStatus: 'Matched' | 'Unmatched' | 'Conflicted' | 'Pending' | '—';
  connectionStatus: 'Connected' | 'Disconnected' | 'Syncing';
  lastSynced: string;
  // Legacy fields kept for compatibility
  status?: 'Approved' | 'Paid' | 'Rejected' | 'Pending';
  matchType?: 'Primary' | 'Alternate';
  updated?: string;
  conflict?: boolean;
  total?: number;
  supplierName?: string;
  type?: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
  currency?: string;
  companyName?: string;
  accountName?: string;
  recordType?: string;
  lastSyncDate?: string;
}
