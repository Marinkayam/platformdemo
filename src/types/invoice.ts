import { Exception } from "./exception";

export interface Invoice {
  id: string;
  number: string;
  buyer: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
  creationDate: string;
  owner: string;
  assignee?: string;
  rejectedBy?: 'Monto' | 'Buyer';
  hasWarning?: boolean;
  subtotal?: number;
  tax?: number;
  paymentTerms?: string;
  currency?: string;
  poNumber?: string;
  taxId?: string;
  requesterEmail?: string;
  documentType?: 'Invoice' | 'Credit Memo';
  portal?: 'Ariba' | 'Coupa' | 'Bill' | 'Tipalti';
  isOverdue?: boolean;
  lineItems?: LineItem[];
  attachments?: Attachment[];
  exceptions?: Exception[];
  hasExceptions?: boolean;
  isDuplicate?: boolean;
  submitMethod?: 'ERP' | 'Email' | 'Portal Upload' | 'API';
  submittedAt?: string;
}

export type InvoiceStatus = 
  | 'RTP Prepared'
  | 'Awaiting SC'
  | 'RTP Sent'
  | 'Pending Action'
  | 'Rejected by Buyer'
  | 'Rejected by Monto'
  | 'Approved by Buyer'
  | 'External Submission'
  | 'Paid'
  | 'Settled'
  | 'Partially Settled'
  | 'Excluded';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'audio' | 'video' | 'document';
  url: string;
}
