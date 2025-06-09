export type ConnectionStatus = "Live" | "In Process" | "Unavailable" | "Inactive";
export type ValidationStatus = "Valid" | "Invalid" | "Pending";
export type PortalType = "Coupa" | "SAP Ariba" | "Tipalti" | "SAP" | "Oracle" | "Bill.com" | "Amazon Payee" | "Apple" | "Facturaxion" | "Fieldglass" | "iSupplier" | "KissFlow" | "Qualcomm" | "Sainsburys" | "Segment" | "Shopify" | "StoreNext" | "Taulia" | "Teradata" | "Tungsten" | "Walmart" | "AT&T" | "Oracle Procurement";

export interface SmartConnectionProps {
  status: ConnectionStatus;
  buyer: {
    name: string;
    id: string;
  };
  supplier: {
    name: string;
    id: string;
  };
  portal: {
    type: PortalType;
    reference: string;
    user?: string; // New field added for portal user
  };
  lastUpdated: string;
  exceptions?: string[];
}

export interface POInformationProps {
  number: string;
  status: ValidationStatus;
  customerName: string;
  portalInfo: {
    type: PortalType;
    reference: string;
  };
  orderDate: string;
  totalAmount: number;
  totalInvoiced: number;
  amountLeft: number;
  paymentTerms: string;
  currency: string;
  buyerReference: string;
}

export interface RelatedInvoiceProps {
  id: string;
  number: string;
  date: string;
  total: number;
  status: string;
  paymentStatus: string;
}
