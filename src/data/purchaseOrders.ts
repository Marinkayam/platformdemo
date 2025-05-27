
import { PurchaseOrder } from "@/types/purchaseOrder";

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-2024-001",
    buyerName: "Acme Corporation",
    status: "New",
    portal: "SAP Ariba",
    total: 15000.00,
    invoicedAmount: 0,
    amountLeft: 15000.00,
    paymentTerms: "Net 30",
    orderDate: "2024-01-15",
    currency: "USD",
    shipmentNumbers: ["SH-001", "SH-002"],
    shipToAddress: {
      line1: "123 Business Ave",
      line2: "Suite 100",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-001",
        description: "Software License - Annual",
        quantity: 10,
        unitPrice: 1200.00,
        total: 12000.00
      },
      {
        id: "li-002",
        description: "Implementation Services",
        quantity: 1,
        unitPrice: 3000.00,
        total: 3000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-01-15T10:00:00Z"
  },
  {
    id: "po-002",
    poNumber: "PO-2024-002",
    buyerName: "TechStart Inc",
    status: "Partially Invoiced",
    portal: "Oracle iProcurement",
    total: 8500.00,
    invoicedAmount: 5000.00,
    amountLeft: 3500.00,
    paymentTerms: "Net 45",
    orderDate: "2024-01-20",
    currency: "USD",
    shipToAddress: {
      line1: "456 Innovation Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-003",
        description: "Consulting Services",
        quantity: 40,
        unitPrice: 150.00,
        total: 6000.00
      },
      {
        id: "li-004",
        description: "Software Maintenance",
        quantity: 1,
        unitPrice: 2500.00,
        total: 2500.00
      }
    ],
    relatedInvoices: ["inv-001"],
    lastUpdated: "2024-01-22T14:30:00Z"
  },
  {
    id: "po-003",
    poNumber: "PO-2024-003",
    buyerName: "Global Manufacturing",
    status: "Open",
    portal: "Coupa",
    total: 25000.00,
    invoicedAmount: 0,
    amountLeft: 25000.00,
    paymentTerms: "Net 60",
    orderDate: "2024-01-25",
    currency: "USD",
    shipToAddress: {
      line1: "789 Industrial Blvd",
      city: "Detroit",
      state: "MI",
      zipCode: "48201",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-005",
        description: "Manufacturing Equipment",
        quantity: 2,
        unitPrice: 10000.00,
        total: 20000.00
      },
      {
        id: "li-006",
        description: "Installation & Setup",
        quantity: 1,
        unitPrice: 5000.00,
        total: 5000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-01-25T09:15:00Z"
  },
  {
    id: "po-004",
    poNumber: "PO-2024-004",
    buyerName: "Retail Solutions LLC",
    status: "Fully Invoiced",
    portal: "Jaggaer",
    total: 12000.00,
    invoicedAmount: 12000.00,
    amountLeft: 0,
    paymentTerms: "Net 30",
    orderDate: "2024-01-10",
    currency: "USD",
    shipToAddress: {
      line1: "321 Commerce St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-007",
        description: "Point of Sale System",
        quantity: 5,
        unitPrice: 2000.00,
        total: 10000.00
      },
      {
        id: "li-008",
        description: "Training & Support",
        quantity: 1,
        unitPrice: 2000.00,
        total: 2000.00
      }
    ],
    relatedInvoices: ["inv-002", "inv-003"],
    lastUpdated: "2024-01-28T16:45:00Z"
  },
  {
    id: "po-005",
    poNumber: "PO-2024-005",
    buyerName: "Healthcare Systems",
    status: "Closed",
    portal: "SAP Ariba",
    total: 18000.00,
    invoicedAmount: 18000.00,
    amountLeft: 0,
    paymentTerms: "Net 15",
    orderDate: "2024-01-05",
    currency: "USD",
    shipToAddress: {
      line1: "555 Medical Center Dr",
      city: "Houston",
      state: "TX",
      zipCode: "77030",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-009",
        description: "Medical Software License",
        quantity: 20,
        unitPrice: 800.00,
        total: 16000.00
      },
      {
        id: "li-010",
        description: "Data Migration",
        quantity: 1,
        unitPrice: 2000.00,
        total: 2000.00
      }
    ],
    relatedInvoices: ["inv-004"],
    lastUpdated: "2024-01-30T11:20:00Z"
  }
];
