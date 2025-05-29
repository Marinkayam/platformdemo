
export interface PortalRecord {
  id: string;
  portal: string;
  status: 'Approved' | 'Paid' | 'Rejected' | 'Pending';
  matchType: 'Primary' | 'Alternate';
  updated: string;
  conflict: boolean;
  invoiceNumber: string;
}
