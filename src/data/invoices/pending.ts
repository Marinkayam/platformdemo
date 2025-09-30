import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";
import { getBasicInvoiceData } from "./types";

export const pendingInvoices: Invoice[] = [
  {
    ...getBasicInvoiceData(
      "inv-40230612",
      "INV-40230612",
      "Adobe",
      "2024-12-20",
      "Pending Action",
      75000.00,
      "2024-12-01",
      "adobe.finance@adobe.com"
    ),
    assignee: "procurement@company.com",
    subtotal: 75000.00,
    tax: 0.00,
    paymentTerms: "Net 30",
    taxId: "TAX-ADOBE-001",
    poNumber: "ADO-778899",
    requesterEmail: "procurement@company.com",
    hasExceptions: true,
    rejectedBy: "Monto" as const,
    invoiceDate: "01-12-2024", // Wrong format to trigger exception
    netTerms: "Net 30",
    exceptions: [
      {
        id: "exc-po-status-001",
        type: "PO_VALIDATION",
        message: "PO status is NOT Open",
        details: "The purchase order status must be Open to process this invoice",
        createdAt: "2024-12-01T10:00:00Z",
        resolved: false
      },
      {
        id: "exc-po-amount-001",
        type: "PO_VALIDATION",
        message: "PO total amount is NOT bigger than PO sub total",
        details: "The purchase order amount validation failed",
        createdAt: "2024-12-01T10:00:00Z",
        resolved: false
      },
      {
        id: "exc-date-format-001",
        type: "INVOICE_DATA",
        message: "Date format must be dd/mm/yyyy",
        details: "Invoice date is in incorrect format. Expected: dd/mm/yyyy",
        createdAt: "2024-12-01T10:00:00Z",
        resolved: false
      }
    ]
  },
  {
    ...getBasicInvoiceData(
      "1",
      "INV-10021301",
      "Acme Corporation",
      "2024-04-15",
      "Pending Action",
      2350.25,
      "2024-03-16",
      "john.doe@example.com"
    ),
    assignee: "jane.smith@example.com",
    subtotal: 2000.00,
    tax: 350.25,
    paymentTerms: "Net 30",
    taxId: "TAX-001",
    poNumber: "ACM-123456",
    requesterEmail: "requester@acme.com",
    hasExceptions: true,
    rejectedBy: "Monto" as const,
    invoiceDate: "2024-03-10",
    netTerms: "Net 30",
    exceptions: [
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
    ...getBasicInvoiceData(
      "2",
      "INV-20230402",
      "Tech Solutions Ltd",
      "2024-04-20",
      "Pending Action",
      1750.50,
      "2024-03-22",
      "sarah.wilson@example.com"
    ),
    assignee: "mike.johnson@example.com",
    subtotal: 1500.00,
    tax: 250.50,
    paymentTerms: "Net 15",
    taxId: "TAX-002",
    requesterEmail: "procurement@techsolutions.com",
    portal: "Coupa",
    poNumber: "TEC-987654",
    hasExceptions: true,
    rejectedBy: "Buyer" as const,
    invoiceDate: "2024-03-18",
    netTerms: "Net 15",
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
    ...getBasicInvoiceData(
      "3",
      "INV-30230522",
      "Global Enterprises",
      "2024-05-10",
      "Pending Action",
      3200.75,
      "2024-04-11",
      "david.clark@example.com"
    ),
    assignee: "emma.davis@example.com",
    subtotal: 2800.00,
    tax: 400.75,
    paymentTerms: "Net 45",
    taxId: "TAX-003",
    requesterEmail: "billing@globalent.com",
    portal: "Bill.com",
    poNumber: "GLO-445566",
    hasExceptions: true,
    isDuplicate: true,
    submitMethod: "ERP",
    submittedAt: "2024-04-11T09:30:00Z",
    invoiceDate: "2024-04-05",
    netTerms: "Net 45",
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
    ...getBasicInvoiceData(
      "3-duplicate",
      "INV-30230522",
      "NewCo Inc",
      "2024-06-10",
      "Pending Action",
      3350.00,
      "2024-04-12",
      "jane.smith@example.com"
    ),
    assignee: "mike.johnson@example.com",
    subtotal: 2900.00,
    tax: 450.00,
    paymentTerms: "Net 30",
    taxId: "TAX-006",
    requesterEmail: "procurement@newco.com",
    portal: "SAP Ariba",
    poNumber: "NEW-112233",
    hasExceptions: true,
    isDuplicate: true,
    submitMethod: "Email",
    submittedAt: "2024-04-12T14:20:00Z",
    invoiceDate: "2024-04-08",
    netTerms: "Net 30",
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
    ...getBasicInvoiceData(
      "4",
      "INV-40230612",
      "European Partners GmbH",
      "2024-06-05",
      "Pending Action",
      4250.80,
      "2024-05-07",
      "anna.mueller@example.com"
    ),
    assignee: "carlos.rodriguez@example.com",
    subtotal: 3500.00,
    tax: 750.80,
    paymentTerms: "Net 30",
    currency: "EUR",
    taxId: "TAX-004",
    requesterEmail: "finance@europartners.de",
    portal: "SAP Ariba",
    poNumber: "EUR-334455",
    hasExceptions: true,
    invoiceDate: "2024-05-01",
    netTerms: "Net 30",
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
    ...getBasicInvoiceData(
      "5",
      "INV-10021111",
      "Espresso",
      "2024-04-04",
      "Paid",
      23412.22,
      "2024-03-20",
      "maria.garcia@example.com"
    ),
    assignee: undefined,
    subtotal: 20000.00,
    tax: 3412.22,
    paymentTerms: "Net 30",
    currency: "EUR",
    taxId: "TAX-005",
    requesterEmail: "accounting@espresso.com",
    portal: "SAP Ariba",
    poNumber: "ESP-776655",
    hasExceptions: false,
    invoiceDate: "2024-03-15",
    netTerms: "Net 30"
  },
  {
    ...getBasicInvoiceData(
      "6",
      "INV-10032100",
      "TechCorp Solutions",
      "2024-05-15",
      "Pending Action",
      5750.00,
      "2024-04-10",
      "alex.thompson@example.com"
    ),
    assignee: "sarah.davis@example.com",
    subtotal: 5000.00,
    tax: 750.00,
    paymentTerms: "Net 30",
    taxId: "TAX-007",
    requesterEmail: "billing@techcorp.com",
    portal: "Oracle Procurement",
    poNumber: "TCC-889900",
    hasExceptions: true,
    rejectedBy: "Buyer" as const,
    invoiceDate: "2024-04-05",
    netTerms: "Net 30",
    exceptions: [
      {
        id: "exc-extra-data-001",
        type: "EXTRA_DATA",
        message: "Extra Data Required",
        details: "Additional information is required to process this invoice",
        createdAt: "2024-04-10T11:00:00Z",
        resolved: false,
        missingFields: ["additionalNotes", "projectCode"]
      }
    ]
  },
  {
    ...getBasicInvoiceData(
      "7",
      "INV-25020154",
      "FastBuy Corp",
      "2024-05-20",
      "Pending Action",
      1234.56,
      "2024-04-15",
      "michael.brown@example.com"
    ),
    assignee: "lisa.wilson@example.com",
    subtotal: 1050.00,
    tax: 184.56,
    paymentTerms: "Net 15",
    taxId: "TAX-008",
    requesterEmail: "invoicing@fastbuy.com",
    portal: "Bill.com",
    poNumber: "FBC-223344",
    hasExceptions: false,
    invoiceDate: "2024-04-10",
    netTerms: "Net 15",
    dueDate: "2024-04-25"
  }
];