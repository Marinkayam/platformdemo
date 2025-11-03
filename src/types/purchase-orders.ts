export type PurchaseOrderStatus =
  | "new"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "cancelled"
  | "completed"
  | "Partially Invoiced"
  | "Fully Invoiced"
  | "open";

export type PortalStatus = 
  | "Connected"
  | "Disconnected" 
  | "Syncing"
  | "Error"
  | "Pending";

export type PurchaseOrderLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  currency?: string;
  taxRate?: number;
  taxAmount?: number;
  accountCode?: string;
  invoicedAmount?: number;
  remainingAmount?: number;
};

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  status: PurchaseOrderStatus;
  rawStatus: string; // The actual raw status from the portal
  // Fields from mock data and used in table
  buyerName: string;
  portal: string;
  total: number;
  invoicedAmount: number;
  amountLeft: number;
  paymentTerms: string;
  orderDate: string;
  createdDate: string;
  owner?: string;
  description?: string;
  shipToAddress?: {
    line1: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    line2?: string;
  };
  lastUpdated?: string;

  // Fields from detail page type (made optional to be compatible with table mock data)
  supplier?: {
    id: string;
    name: string;
    code: string;
  };
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  grandTotal?: number;
  notes?: string;
  pdfUrl?: string;

  // Common fields
  dueDate: string;
  currency: string;
  lineItems: PurchaseOrderLineItem[];
  relatedInvoices?: string[] | {
    id: string;
    invoiceNumber: string;
    status: string;
    amount: number;
    currency: string;
    dueDate: string;
  }[];
  vatTaxId?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  portalStatus?: PortalStatus;
  hasPdfPreview?: boolean;
}; 