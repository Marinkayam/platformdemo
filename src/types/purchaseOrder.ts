
export type PurchaseOrderStatus = 
  | "New" 
  | "Open" 
  | "Closed" 
  | "Partially Invoiced" 
  | "Fully Invoiced";

export interface PurchaseOrderLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  buyerName: string;
  status: PurchaseOrderStatus;
  portal: string;
  total: number;
  invoicedAmount: number;
  amountLeft: number;
  paymentTerms: string;
  orderDate: string;
  currency: string;
  shipmentNumbers?: string[];
  shipToAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  lineItems: PurchaseOrderLineItem[];
  relatedInvoices: string[]; // Invoice IDs
  lastUpdated: string;
}

export interface PurchaseOrderFilters {
  buyerName?: string;
  portal?: string;
  status?: PurchaseOrderStatus;
  poNumber?: string;
}
