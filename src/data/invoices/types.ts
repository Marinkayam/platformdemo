
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";

export const getBasicInvoiceData = (
  id: string,
  number: string,
  buyer: string,
  dueDate: string,
  status: string,
  total: number,
  creationDate: string,
  owner: string,
  extras: Partial<Invoice> = {}
): Invoice => ({
  id,
  number,
  buyer,
  dueDate,
  status: status as Invoice['status'],
  total,
  creationDate,
  owner,
  currency: "USD",
  hasExceptions: extras.hasExceptions || false,
  documentType: extras.documentType || "Invoice",
  portal: extras.portal,
  isOverdue: extras.isOverdue || false,
  ...extras
});

// Test data for Overdue Invoices and Credit Memos
export const testInvoices = [
  // Overdue Invoices
  getBasicInvoiceData(
    "test-overdue-1",
    "INV-10032100",
    "Tesla",
    "2024-03-01",
    "Pending Action",
    18000.00,
    "2024-02-15",
    "Elon",
    {
      portal: "Coupa",
      isOverdue: true
    }
  ),
  getBasicInvoiceData(
    "test-overdue-2",
    "INV-10032101",
    "Apple",
    "2024-02-15",
    "Overdue",
    5200.00,
    "2024-01-30",
    "Camila",
    {
      portal: "Ariba",
      isOverdue: true
    }
  ),
  
  // Credit Memos
  getBasicInvoiceData(
    "test-cm-1",
    "CM-00021300",
    "Google",
    "2024-04-10",
    "Paid",
    -2000.00,
    "2024-03-25",
    "Lady Gaga",
    {
      documentType: "Credit Memo",
      portal: "Tipalti"
    }
  ),
  getBasicInvoiceData(
    "test-cm-2",
    "CM-00021301",
    "Nike",
    "2024-03-28",
    "Approved by Buyer",
    -450.00,
    "2024-03-10",
    "Madona",
    {
      documentType: "Credit Memo",
      portal: "Bill"
    }
  )
];
