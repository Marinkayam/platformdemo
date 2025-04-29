
import { SmartConnectionProps, POInformationProps, RelatedInvoiceProps } from "./types";

export const mockSmartConnection: SmartConnectionProps = {
  status: "Live",
  buyer: {
    name: "Acme Corporation",
    id: ""
  },
  supplier: {
    name: "Global Supplies Ltd",
    id: ""
  },
  portal: {
    type: "Coupa",
    reference: ""
  },
  lastUpdated: "2025-04-28T15:23:44Z"
};

export const mockConnectionWithIssue: SmartConnectionProps = {
  ...mockSmartConnection,
  status: "Unavailable",
  exceptions: [
    "Portal User Credentials are missing",
    "Last sync attempt failed at 15:23"
  ]
};

export const mockPOInformation: POInformationProps = {
  number: "",
  status: "Valid",
  customerName: "Acme Corporation",
  portalInfo: {
    type: "Coupa",
    reference: ""
  },
  orderDate: "2025-03-15",
  totalAmount: 15000,
  totalInvoiced: 7500,
  amountLeft: 7500,
  paymentTerms: "Net 30",
  currency: "USD",
  buyerReference: ""
};

export const mockRelatedInvoices: RelatedInvoiceProps[] = [
  {
    id: "1",
    number: "INV-001",
    date: "2025-04-10",
    total: 3500,
    status: "Approved",
    paymentStatus: "Paid"
  },
  {
    id: "2",
    number: "INV-002",
    date: "2025-04-20",
    total: 4000,
    status: "Processing",
    paymentStatus: "Pending"
  }
];
