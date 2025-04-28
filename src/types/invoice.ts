
export interface Invoice {
  id: string;
  number: string;
  buyer: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
  creationDate: string;
  owner: string;
  hasWarning?: boolean;
}

export type InvoiceStatus = 
  | 'Pending Action'
  | 'Approved by Buyer'
  | 'Paid'
  | 'External Submission'
  | 'Settled'
  | 'Awaiting SC'
  | 'Excluded';
