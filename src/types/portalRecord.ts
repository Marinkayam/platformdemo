export interface PortalRecord {
  id: string;
  portal: string;
  status: 'Approved' | 'Paid' | 'Rejected' | 'Pending';
  matchType: 'Primary' | 'Alternate';
  updated: string;
  conflict: boolean;
  invoiceNumber: string;
  buyer: string;
  total: number;
  poNumber: string;
  supplierName: string;
  type: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
  currency?: string;
  companyName: string;
  accountName: string;
  recordType: string;
  connectionStatus: string;
  lastSyncDate: string;
}
