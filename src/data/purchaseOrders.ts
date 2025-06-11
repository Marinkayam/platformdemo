import { PurchaseOrder } from "@/types/purchase-orders";

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-88991",
    buyerName: "Acme Corporation", 
    status: "New",
    portal: "SAP Ariba",
    total: 25000.00,
    invoicedAmount: 0.00,
    amountLeft: 25000.00,
    paymentTerms: "Net 30",
    orderDate: "2024-01-15",
    createdDate: "2024-01-15",
    dueDate: "2024-02-15",
    description: "Office supplies and equipment for Q1",
    owner: "John Smith",
    currency: "USD",
    shipToAddress: {
      line1: "123 Business St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-001",
        description: "Office chairs",
        quantity: 10,
        unitPrice: 250.00,
        total: 2500.00
      },
      {
        id: "li-002", 
        description: "Desk supplies",
        quantity: 1,
        unitPrice: 22500.00,
        total: 22500.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-01-15"
  },
  {
    id: "po-002", 
    poNumber: "PO-99102",
    buyerName: "Tech Solutions Ltd",
    status: "Partially Invoiced",
    portal: "Coupa",
    total: 15000.00,
    invoicedAmount: 7500.00,
    amountLeft: 7500.00,
    paymentTerms: "Net 15",
    orderDate: "2024-01-20",
    createdDate: "2024-01-20",
    dueDate: "2024-02-05",
    description: "Software licensing and support services",
    owner: "Sarah Wilson",
    currency: "USD",
    shipToAddress: {
      line1: "456 Tech Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-003",
        description: "Software licenses",
        quantity: 5,
        unitPrice: 3000.00,
        total: 15000.00
      }
    ],
    relatedInvoices: ["INV-2024-001"],
    lastUpdated: "2024-01-25"
  },
  {
    id: "po-003",
    poNumber: "PO-77893", 
    buyerName: "Global Enterprises",
    status: "Fully Invoiced",
    portal: "Jaggaer",
    total: 35000.00,
    invoicedAmount: 35000.00,
    amountLeft: 0.00,
    paymentTerms: "Net 45",
    orderDate: "2024-01-10",
    createdDate: "2024-01-10",
    dueDate: "2024-02-25",
    description: "Manufacturing equipment and parts",
    owner: "David Clark",
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
        id: "li-004",
        description: "Manufacturing equipment",
        quantity: 2,
        unitPrice: 15000.00,
        total: 30000.00
      },
      {
        id: "li-005",
        description: "Replacement parts",
        quantity: 1,
        unitPrice: 5000.00,
        total: 5000.00
      }
    ],
    relatedInvoices: ["INV-2024-002", "INV-2024-003"],
    lastUpdated: "2024-02-01"
  },
  {
    id: "po-004",
    poNumber: "PO-66784",
    buyerName: "European Partners GmbH", 
    status: "New",
    portal: "SAP Ariba",
    total: 42000.00,
    invoicedAmount: 0.00,
    amountLeft: 42000.00,
    paymentTerms: "Net 30",
    orderDate: "2024-01-25",
    createdDate: "2024-01-25",
    dueDate: "2024-02-25",
    description: "Consulting services and project management",
    owner: "Anna Mueller",
    currency: "EUR",
    shipToAddress: {
      line1: "Hauptstraße 123",
      city: "Berlin",
      state: "Berlin",
      zipCode: "10115",
      country: "Germany"
    },
    lineItems: [
      {
        id: "li-006",
        description: "Consulting services",
        quantity: 1,
        unitPrice: 42000.00,
        total: 42000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-01-25"
  },
  {
    id: "po-005",
    poNumber: "PO-55667",
    buyerName: "Retail Chain Inc",
    status: "Partially Invoiced",
    portal: "Oracle",
    total: 28000.00,
    invoicedAmount: 14000.00,
    amountLeft: 14000.00,
    paymentTerms: "Net 20",
    orderDate: "2024-02-01",
    createdDate: "2024-02-01",
    dueDate: "2024-02-21",
    description: "Inventory management system upgrade",
    owner: "Maria Garcia",
    currency: "USD",
    shipToAddress: {
      line1: "321 Retail Plaza",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-007",
        description: "Inventory management software",
        quantity: 1,
        unitPrice: 20000.00,
        total: 20000.00
      },
      {
        id: "li-008",
        description: "Implementation services",
        quantity: 1,
        unitPrice: 8000.00,
        total: 8000.00
      }
    ],
    relatedInvoices: ["INV-2024-004"],
    lastUpdated: "2024-02-05"
  }
];
