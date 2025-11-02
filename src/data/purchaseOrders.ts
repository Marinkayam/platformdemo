import { PurchaseOrder } from "@/types/purchase-orders";

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-88991",
    buyerName: "Acme Corporation",
    status: "new",
    rawStatus: "New",
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
    lastUpdated: "2024-01-15",
    portalStatus: "Connected"
  },
  {
    id: "po-002",
    poNumber: "PO-99102",
    buyerName: "Tech Solutions Ltd",
    status: "Partially Invoiced",
    rawStatus: "Partially invoiced",
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
    lastUpdated: "2024-01-25",
    portalStatus: "Syncing"
  },
  {
    id: "po-003",
    poNumber: "PO-77893",
    buyerName: "Global Enterprises",
    status: "Fully Invoiced",
    rawStatus: "100% invoiced",
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
    lastUpdated: "2024-02-01",
    portalStatus: "Connected"
  },
  {
    id: "po-004",
    poNumber: "PO-66784",
    buyerName: "European Partners GmbH",
    status: "new",
    rawStatus: "Approved",
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
    lastUpdated: "2024-01-25",
    portalStatus: "Error"
  },
  {
    id: "po-005",
    poNumber: "PO-55667",
    buyerName: "Retail Chain Inc",
    status: "Partially Invoiced",
    rawStatus: "Part inv",
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
    lastUpdated: "2024-02-05",
    portalStatus: "Connected"
  },
  {
    id: "po-006",
    poNumber: "PO-44558",
    buyerName: "Manufacturing Co",
    status: "new",
    rawStatus: "Created",
    portal: "Coupa",
    total: 18500.00,
    invoicedAmount: 0.00,
    amountLeft: 18500.00,
    paymentTerms: "Net 30",
    orderDate: "2024-02-05",
    createdDate: "2024-02-05",
    dueDate: "2024-03-07",
    description: "Raw materials for production line",
    owner: "Robert Johnson",
    currency: "USD",
    shipToAddress: {
      line1: "555 Factory Rd",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-009",
        description: "Steel components",
        quantity: 100,
        unitPrice: 150.00,
        total: 15000.00
      },
      {
        id: "li-010",
        description: "Assembly hardware",
        quantity: 1,
        unitPrice: 3500.00,
        total: 3500.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-02-05",
    portalStatus: "Pending"
  },
  {
    id: "po-007",
    poNumber: "PO-33449",
    buyerName: "Healthcare Systems LLC",
    status: "Fully Invoiced",
    rawStatus: "Completed",
    portal: "SAP Ariba",
    total: 52000.00,
    invoicedAmount: 52000.00,
    amountLeft: 0.00,
    paymentTerms: "Net 45",
    orderDate: "2024-01-30",
    createdDate: "2024-01-30",
    dueDate: "2024-03-15",
    description: "Medical equipment and installation",
    owner: "Dr. Lisa Chen",
    currency: "USD",
    shipToAddress: {
      line1: "200 Medical Center Dr",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-011",
        description: "Medical monitoring equipment",
        quantity: 3,
        unitPrice: 15000.00,
        total: 45000.00
      },
      {
        id: "li-012",
        description: "Installation and training",
        quantity: 1,
        unitPrice: 7000.00,
        total: 7000.00
      }
    ],
    relatedInvoices: ["INV-2024-005", "INV-2024-006"],
    lastUpdated: "2024-02-10",
    portalStatus: "Connected"
  },
  {
    id: "po-008",
    poNumber: "PO-22340",
    buyerName: "Education District",
    status: "Partially Invoiced",
    rawStatus: "Partial payment",
    portal: "Jaggaer",
    total: 31000.00,
    invoicedAmount: 15500.00,
    amountLeft: 15500.00,
    paymentTerms: "Net 30",
    orderDate: "2024-02-08",
    createdDate: "2024-02-08",
    dueDate: "2024-03-10",
    description: "Educational technology and software",
    owner: "Jennifer Adams",
    currency: "USD",
    shipToAddress: {
      line1: "1000 School District Blvd",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-013",
        description: "Educational software licenses",
        quantity: 50,
        unitPrice: 500.00,
        total: 25000.00
      },
      {
        id: "li-014",
        description: "Training and support",
        quantity: 1,
        unitPrice: 6000.00,
        total: 6000.00
      }
    ],
    relatedInvoices: ["INV-2024-007"],
    lastUpdated: "2024-02-12",
    portalStatus: "Disconnected"
  },
  {
    id: "po-009",
    poNumber: "PO-11231",
    buyerName: "Financial Services Corp",
    status: "new",
    rawStatus: "Pending approval",
    portal: "Oracle",
    total: 67000.00,
    invoicedAmount: 0.00,
    amountLeft: 67000.00,
    paymentTerms: "Net 30",
    orderDate: "2024-02-10",
    createdDate: "2024-02-10",
    dueDate: "2024-03-12",
    description: "Security infrastructure and compliance tools",
    owner: "Michael Brown",
    currency: "USD",
    shipToAddress: {
      line1: "777 Financial Plaza",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-015",
        description: "Security software suite",
        quantity: 1,
        unitPrice: 45000.00,
        total: 45000.00
      },
      {
        id: "li-016",
        description: "Compliance monitoring tools",
        quantity: 1,
        unitPrice: 22000.00,
        total: 22000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-02-10",
    portalStatus: "Syncing"
  },
  {
    id: "po-010",
    poNumber: "PO-00122",
    buyerName: "Logistics Partners",
    status: "Partially Invoiced",
    rawStatus: "In progress",
    portal: "Coupa",
    total: 43500.00,
    invoicedAmount: 21750.00,
    amountLeft: 21750.00,
    paymentTerms: "Net 15",
    orderDate: "2024-02-12",
    createdDate: "2024-02-12",
    dueDate: "2024-02-27",
    description: "Fleet management and tracking systems",
    owner: "Amanda Rodriguez",
    currency: "USD",
    shipToAddress: {
      line1: "888 Logistics Way",
      city: "Atlanta",
      state: "GA",
      zipCode: "30301",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-017",
        description: "GPS tracking devices",
        quantity: 25,
        unitPrice: 1200.00,
        total: 30000.00
      },
      {
        id: "li-018",
        description: "Fleet management software",
        quantity: 1,
        unitPrice: 13500.00,
        total: 13500.00
      }
    ],
    relatedInvoices: ["INV-2024-008"],
    lastUpdated: "2024-02-14",
    portalStatus: "Connected"
  },
  {
    id: "po-011",
    poNumber: "PO-99988",
    buyerName: "Construction Services Inc",
    status: "completed",
    rawStatus: "Closed",
    portal: "SAP Ariba",
    total: 85000.00,
    invoicedAmount: 85000.00,
    amountLeft: 0.00,
    paymentTerms: "Net 30",
    orderDate: "2023-12-15",
    createdDate: "2023-12-15",
    dueDate: "2024-01-15",
    description: "Construction materials and equipment - Project completed",
    owner: "James Thompson",
    currency: "USD",
    shipToAddress: {
      line1: "500 Construction Ave",
      city: "Denver",
      state: "CO",
      zipCode: "80201",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-019",
        description: "Building materials",
        quantity: 1,
        unitPrice: 60000.00,
        total: 60000.00
      },
      {
        id: "li-020",
        description: "Construction equipment rental",
        quantity: 1,
        unitPrice: 25000.00,
        total: 25000.00
      }
    ],
    relatedInvoices: ["INV-2024-009", "INV-2024-010"],
    lastUpdated: "2024-01-30",
    portalStatus: "Connected"
  },
  {
    id: "po-012",
    poNumber: "PO-88877",
    buyerName: "Marketing Agency Ltd",
    status: "cancelled",
    rawStatus: "Cancelled",
    portal: "Coupa",
    total: 12500.00,
    invoicedAmount: 0.00,
    amountLeft: 0.00,
    paymentTerms: "Net 30",
    orderDate: "2024-02-05",
    createdDate: "2024-02-05",
    dueDate: "2024-03-07",
    description: "Marketing campaign materials - Cancelled due to budget reallocation",
    owner: "Emily White",
    currency: "USD",
    shipToAddress: {
      line1: "300 Marketing Plaza",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-021",
        description: "Marketing materials",
        quantity: 1,
        unitPrice: 8500.00,
        total: 8500.00
      },
      {
        id: "li-022",
        description: "Promotional items",
        quantity: 1,
        unitPrice: 4000.00,
        total: 4000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-02-08",
    portalStatus: "Disconnected"
  },
  {
    id: "po-013",
    poNumber: "PO-77766",
    buyerName: "Tech Innovations Corp",
    status: "completed",
    rawStatus: "Closed",
    portal: "Jaggaer",
    total: 95000.00,
    invoicedAmount: 95000.00,
    amountLeft: 0.00,
    paymentTerms: "Net 45",
    orderDate: "2023-11-20",
    createdDate: "2023-11-20",
    dueDate: "2024-01-05",
    description: "Server infrastructure upgrade - Successfully completed",
    owner: "Kevin Park",
    currency: "USD",
    shipToAddress: {
      line1: "1200 Tech Center",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-023",
        description: "Server hardware",
        quantity: 5,
        unitPrice: 15000.00,
        total: 75000.00
      },
      {
        id: "li-024",
        description: "Installation and configuration",
        quantity: 1,
        unitPrice: 20000.00,
        total: 20000.00
      }
    ],
    relatedInvoices: ["INV-2024-011", "INV-2024-012"],
    lastUpdated: "2024-01-20",
    portalStatus: "Connected"
  },
  {
    id: "po-014",
    poNumber: "PO-66655",
    buyerName: "Retail Solutions Group",
    status: "cancelled",
    rawStatus: "Cancelled",
    portal: "Oracle",
    total: 28000.00,
    invoicedAmount: 0.00,
    amountLeft: 0.00,
    paymentTerms: "Net 30",
    orderDate: "2024-01-28",
    createdDate: "2024-01-28",
    dueDate: "2024-02-28",
    description: "Point of sale systems - Cancelled due to vendor change",
    owner: "Patricia Martinez",
    currency: "USD",
    shipToAddress: {
      line1: "650 Retail Blvd",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    lineItems: [
      {
        id: "li-025",
        description: "POS terminals",
        quantity: 10,
        unitPrice: 2500.00,
        total: 25000.00
      },
      {
        id: "li-026",
        description: "Software licenses",
        quantity: 1,
        unitPrice: 3000.00,
        total: 3000.00
      }
    ],
    relatedInvoices: [],
    lastUpdated: "2024-02-02",
    portalStatus: "Error"
  }
];