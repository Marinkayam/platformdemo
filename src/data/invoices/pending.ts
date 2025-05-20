
import { getBasicInvoiceData } from "./types";
import { Exception } from "@/types/exception";

const poExceptions: Exception[] = [
  {
    id: "exc1",
    type: "PO_CLOSED",
    message: "PO is closed for invoicing",
    details: "The purchase order referenced in this invoice is marked as closed and cannot accept new invoices.",
    createdAt: "2024-04-27T10:15:30Z",
    resolved: false
  },
  {
    id: "exc2",
    type: "PO_INSUFFICIENT_FUNDS",
    message: "PO funds insufficient",
    details: "The remaining funds in the referenced purchase order are insufficient for this invoice amount.",
    createdAt: "2024-04-27T10:15:30Z",
    resolved: false
  }
];

const duplicateExceptions: Exception[] = [
  {
    id: "exc3",
    type: "DUPLICATE_INVOICE",
    message: "Duplicate invoice detected",
    details: "The system has found 2 other invoices with the same invoice number. Please review and resolve this duplication.",
    createdAt: "2024-04-28T14:22:45Z",
    resolved: false
  }
];

const dataExtractionException: Exception = {
  id: "exc4",
  type: "MISSING_INFORMATION",
  message: "Incorrect Data",
  details: "The invoice PDF contains invalid required information: Invoice Date, Customer Name",
  createdAt: "2024-05-20T10:00:00Z",
  resolved: false,
  missingFields: ["Invoice Date", "Customer Name"]
};

export const pendingInvoices = [
  getBasicInvoiceData(
    "1",
    "INV-100123322",
    "Adidas",
    "12/31/2024",
    "Pending Action",
    564534.55,
    "04/28/2024",
    "Camila",
    {
      subtotal: 513213.23,
      tax: 51321.32,
      rejectedBy: "Monto",
      exceptions: [dataExtractionException],
      hasExceptions: true,
      poNumber: "PO-987654"
    }
  ),
  getBasicInvoiceData(
    "2",
    "INV-100231211",
    "Marvel",
    "12/31/2024",
    "Pending Action",
    12423,
    "04/26/2024",
    "Camila",
    {
      rejectedBy: "Monto",
      exceptions: duplicateExceptions,
      hasExceptions: true,
      subtotal: 11294.55,
      tax: 1128.45,
      poNumber: "PO-123456"
    }
  ),
  getBasicInvoiceData(
    "3",
    "INV-100121298",
    "Amazon",
    "09/15/2024",
    "Pending Action",
    15020.34,
    "09/15/2024",
    "Camila",
    {
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "4",
    "INV-100121299",
    "Shimoni",
    "09/15/2024",
    "Pending Action",
    5202.15,
    "09/15/2024",
    "Rihana",
    {
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "5",
    "INV-100121300",
    "Nike",
    "09/15/2024",
    "Pending Action",
    8750.90,
    "09/15/2024",
    "Madona",
    {
      rejectedBy: "Buyer"
    }
  )
];
