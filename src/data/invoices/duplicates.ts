import { Invoice } from "@/types/invoice";
import { getBasicInvoiceData } from "./types";

export const duplicateInvoices: Invoice[] = [
  {
    ...getBasicInvoiceData(
      "dup1",
      "INV-100231211",
      "Marvel Entertainment",
      "12/31/2024",
      "Pending Action",
      12423.00,
      "04/26/2024",
      "Camila Rodriguez"
    ),
    subtotal: 11294.55,
    tax: 1128.45,
    paymentTerms: "Net 60",
    hasExceptions: true,
    isDuplicate: true,
    portal: "SAP Ariba",
    invoiceDate: "2024-04-20",
    netTerms: "Net 60",
    exceptions: [
      {
        id: "exc-duplicate-001",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times with different details",
        createdAt: "2024-04-26T09:35:00Z",
        resolved: false
      }
    ]
  },
  {
    ...getBasicInvoiceData(
      "dup2",
      "INV-100231211",
      "Marvel Studios LLC",
      "12/15/2024",
      "Approved by Buyer",
      12675.00,
      "04/24/2024",
      "John Matthews"
    ),
    subtotal: 11500.00,
    tax: 1175.00,
    paymentTerms: "Net 45",
    hasExceptions: false,
    isDuplicate: true,
    portal: "Coupa",
    invoiceDate: "2024-04-18",
    netTerms: "Net 45"
  },
  {
    ...getBasicInvoiceData(
      "dup3",
      "INV-100231400",
      "Disney Productions",
      "11/30/2024",
      "Pending Action",
      8567.33,
      "04/25/2024",
      "Sarah Johnson"
    ),
    subtotal: 7800.00,
    tax: 767.33,
    paymentTerms: "Net 30",
    hasExceptions: true,
    isDuplicate: true,
    portal: "Bill.com",
    invoiceDate: "2024-04-19",
    netTerms: "Net 30",
    exceptions: [
      {
        id: "exc-duplicate-002",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times",
        createdAt: "2024-04-25T14:20:00Z",
        resolved: false
      },
      {
        id: "exc-validation-001",
        type: "VALIDATION_ERROR",
        message: "Invoice Validation Error",
        details: "Invoice total does not match the sum of line items",
        createdAt: "2024-04-25T14:25:00Z",
        resolved: false
      }
    ]
  },
  {
    ...getBasicInvoiceData(
      "dup4",
      "INV-100231500",
      "Warner Bros Entertainment",
      "01/15/2025",
      "Pending Action",
      15234.67,
      "04/27/2024",
      "Michael Chen"
    ),
    subtotal: 13500.00,
    tax: 1734.67,
    paymentTerms: "Net 45",
    hasExceptions: true,
    isDuplicate: true,
    portal: "SAP Ariba",
    invoiceDate: "2024-04-21",
    netTerms: "Net 45",
    exceptions: [
      {
        id: "exc-duplicate-003",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number conflicts with existing invoice",
        createdAt: "2024-04-27T11:15:00Z",
        resolved: false
      }
    ]
  }
];