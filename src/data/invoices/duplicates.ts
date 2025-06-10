
import { Invoice } from "@/types/invoice";

export const duplicateInvoices: Invoice[] = [
  {
    id: "dup1",
    number: "INV-100231211",
    buyer: "Marvel Entertainment",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 12423.00,
    creationDate: "04/26/2024",
    owner: "Camila Rodriguez",
    subtotal: 11294.55,
    tax: 1128.45,
    currency: "USD",
    poNumber: "PO-123456",
    paymentTerms: "Net 60",
    hasExceptions: true,
    documentType: "Invoice",
    isDuplicate: true,
    portal: "SAP Ariba",
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
    id: "dup2",
    number: "INV-100231211",
    buyer: "Marvel Studios LLC",
    dueDate: "12/15/2024",
    status: "Approved by Buyer",
    total: 12675.00,
    creationDate: "04/24/2024",
    owner: "John Matthews",
    subtotal: 11500.00,
    tax: 1175.00,
    currency: "USD",
    poNumber: "PO-123456",
    paymentTerms: "Net 45",
    documentType: "Invoice",
    hasExceptions: false,
    isDuplicate: true,
    portal: "Coupa"
  },
  {
    id: "dup3",
    number: "INV-100231211",
    buyer: "Marvel Comics International",
    dueDate: "01/15/2025",
    status: "Pending Action",
    total: 11890.50,
    creationDate: "04/22/2024",
    owner: "Sarah Chen",
    subtotal: 10800.00,
    tax: 1090.50,
    currency: "USD",
    poNumber: "PO-123457",
    paymentTerms: "Net 90",
    documentType: "Invoice",
    hasExceptions: true,
    isDuplicate: true,
    portal: "Bill.com",
    exceptions: [
      {
        id: "exc-duplicate-003",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times with different details",
        createdAt: "2024-04-22T14:25:00Z",
        resolved: false
      },
      {
        id: "exc-amount-mismatch-003",
        type: "VALIDATION_ERROR",
        message: "Amount Mismatch",
        details: "Invoice total does not match PO expected amount",
        createdAt: "2024-04-22T14:30:00Z",
        resolved: false
      }
    ]
  },
  {
    id: "dup4",
    number: "INV-100231211",
    buyer: "Marvel Digital Services",
    dueDate: "11/30/2024",
    status: "Pending Action",
    total: 13100.25,
    creationDate: "04/28/2024",
    owner: "Michael Torres",
    subtotal: 11900.00,
    tax: 1200.25,
    currency: "USD",
    poNumber: "PO-123458",
    paymentTerms: "Net 30",
    documentType: "Invoice",
    hasExceptions: true,
    isDuplicate: true,
    portal: "SAP Ariba",
    exceptions: [
      {
        id: "exc-duplicate-004",
        type: "DUPLICATE_INVOICE",
        message: "Duplicate Invoice Detected",
        details: "This invoice number has been submitted multiple times with different details",
        createdAt: "2024-04-28T11:15:00Z",
        resolved: false
      }
    ]
  }
];
