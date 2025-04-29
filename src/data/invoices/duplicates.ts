
import { Invoice } from "@/types/invoice";

export const duplicateInvoices: Invoice[] = [
  {
    id: "dup1",
    number: "INV-100231211",
    buyer: "Marvel",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 12423.00,
    creationDate: "04/26/2024",
    owner: "Camila",
    subtotal: 11294.55,
    tax: 1128.45,
    currency: "USD",
    poNumber: "PO-123456",
    paymentTerms: "Net 60",
    hasExceptions: true,
    documentType: "Invoice"
  },
  {
    id: "dup2",
    number: "INV-100231211",
    buyer: "Marvel",
    dueDate: "12/15/2024",
    status: "External Submission",
    total: 12423.00,
    creationDate: "04/24/2024",
    owner: "John",
    subtotal: 11294.55,
    tax: 1128.45,
    currency: "USD",
    poNumber: "PO-123456",
    paymentTerms: "Net 60",
    documentType: "Invoice"
  },
  {
    id: "dup3",
    number: "INV-100231211",
    buyer: "Marvel Studios",
    dueDate: "01/15/2025",
    status: "External Submission",
    total: 12423.00,
    creationDate: "04/22/2024",
    owner: "Sarah",
    subtotal: 11294.55,
    tax: 1128.45,
    currency: "USD",
    poNumber: "PO-123456",
    paymentTerms: "Net 90",
    documentType: "Invoice"
  }
];
