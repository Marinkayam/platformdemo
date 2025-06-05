import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";

export const pendingInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-10021301",
    buyer: "Acme Corporation",
    dueDate: "2024-04-15",
    status: "Pending Action",
    total: 2350.25,
    creationDate: "2024-03-16",
    owner: "john.doe@example.com",
    assignee: "jane.smith@example.com",
    subtotal: 2000.00,
    tax: 350.25,
    paymentTerms: "Net 30",
    currency: "USD",
    poNumber: "PO-88991",
    taxId: "TAX-001",
    requesterEmail: "requester@acme.com",
    documentType: "Invoice",
    portal: "Ariba",
    hasExceptions: true,
    rejectedBy: "Monto",
    exceptions: [
      {
        id: "exc-po-closed-001",
        type: "PO_CLOSED",
        message: "PO status",
        details: "The PO is closed for invoicing",
        createdAt: "2024-03-16T10:30:00Z",
        resolved: false
      },
      {
        id: "exc-po-funds-001", 
        type: "PO_INSUFFICIENT_FUNDS",
        message: "PO funds",
        details: "The PO doesn't have enough available funds to cover the full invoice amount",
        createdAt: "2024-03-16T10:35:00Z",
        resolved: false
      }
    ]
  },
  {
    id: "2",
    number: "INV-20230402",
    buyer: "Tech Solutions Ltd",
    dueDate: "2024-04-20",
    status: "Pending Action",
    total: 1750.50,
    creationDate: "2024-03-22",
    owner: "sarah.wilson@example.com",
    assignee: "mike.johnson@example.com",
    subtotal: 1500.00,
    tax: 250.50,
    paymentTerms: "Net 15",
    currency: "USD",
    poNumber: "PO-99102",
    taxId: "TAX-002",
    requesterEmail: "procurement@techsolutions.com",
    documentType: "Invoice",
    portal: "Coupa",
    hasExceptions: true,
    rejectedBy: "Buyer",
    exceptions: [
      {
        id: "exc-po-line-items-001",
        type: "MISSING_INFORMATION",
        message: "PO Line Items",
        details: "Monto could not find or select PO line items that matches the invoice details",
        createdAt: "2024-03-22T10:30:00Z",
        resolved: false,
        missingFields: ["poLineItems"]
      }
    ]
  },
  {
    id: "3",
    number: "INV-30230522",
    buyer: "Global Enterprises",
    dueDate: "2024-05-10",
    status: "Pending Action",
    total: 3200.75,
    creationDate: "2024-04-11",
    owner: "david.clark@example.com",
    assignee: "emma.davis@example.com",
    subtotal: 2800.00,
    tax: 400.75,
    paymentTerms: "Net 45",
    currency: "USD",
    poNumber: "PO-77893",
    taxId: "TAX-003",
    requesterEmail: "billing@globalent.com",
    documentType: "Invoice",
    portal: "Bill",
    hasExceptions: true,
    isDuplicate: true,
    submitMethod: "ERP",
    submittedAt: "2024-04-11T09:30:00Z",
    exceptions: [
      {
        id: "exc-duplicate-001",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times with different details",
        createdAt: "2024-04-11T09:35:00Z",
        resolved: false
      }
    ]
  },
  {
    id: "3-duplicate",
    number: "INV-30230522",
    buyer: "NewCo Inc",
    dueDate: "2024-06-10",
    status: "Pending Action",
    total: 3350.00,
    creationDate: "2024-04-12",
    owner: "jane.smith@example.com",
    assignee: "mike.johnson@example.com",
    subtotal: 2900.00,
    tax: 450.00,
    paymentTerms: "Net 30",
    currency: "USD",
    poNumber: "PO-88994",
    taxId: "TAX-006",
    requesterEmail: "procurement@newco.com",
    documentType: "Invoice",
    portal: "Ariba",
    hasExceptions: true,
    isDuplicate: true,
    submitMethod: "Email",
    submittedAt: "2024-04-12T14:20:00Z",
    exceptions: [
      {
        id: "exc-duplicate-002",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times with different details",
        createdAt: "2024-04-12T14:25:00Z",
        resolved: false
      }
    ]
  },
  {
    id: "4",
    number: "INV-40230612",
    buyer: "European Partners GmbH",
    dueDate: "2024-06-05",
    status: "Pending Action",
    total: 4250.80,
    creationDate: "2024-05-07",
    owner: "anna.mueller@example.com",
    assignee: "carlos.rodriguez@example.com",
    subtotal: 3500.00,
    tax: 750.80,
    paymentTerms: "Net 30",
    currency: "EUR",
    poNumber: "PO-66784",
    taxId: "TAX-004",
    requesterEmail: "finance@europartners.de",
    documentType: "Invoice",
    portal: "Ariba",
    hasExceptions: true,
    exceptions: [
      {
        id: "exc-po-validation-001",
        type: "VALIDATION_ERROR",
        message: "PO Validation Rules",
        details: "PO status is NOT Open, PO total amount is NOT bigger than PO sub total",
        createdAt: "2024-05-07T10:30:00Z",
        resolved: false
      },
      {
        id: "exc-invoice-data-validation-001",
        type: "VALIDATION_ERROR",
        message: "Invoice Data Validation Rules",
        details: "Date format must be dd/mm/yyyy",
        createdAt: "2024-05-07T10:40:00Z",
        resolved: false
      }
    ]
  },
  {
    id: "5",
    number: "INV-10021111",
    buyer: "Espresso",
    dueDate: "2024-04-04",
    status: "Paid",
    total: 23412.22,
    creationDate: "2024-03-20",
    owner: "maria.garcia@example.com",
    assignee: undefined,
    subtotal: 20000.00,
    tax: 3412.22,
    paymentTerms: "Net 30",
    currency: "EUR",
    poNumber: "PO-55667",
    taxId: "TAX-005",
    requesterEmail: "accounting@espresso.com",
    documentType: "Invoice",
    portal: "Ariba",
    hasExceptions: false
  }
];
