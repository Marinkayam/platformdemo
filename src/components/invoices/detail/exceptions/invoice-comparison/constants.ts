
import { Invoice } from "@/types/invoice";

export const COMPARISON_FIELDS = [
  { key: 'number' as keyof Invoice, label: 'Invoice Number' },
  { key: 'buyer' as keyof Invoice, label: 'Buyer' },
  { key: 'creationDate' as keyof Invoice, label: 'Creation Date' },
  { key: 'dueDate' as keyof Invoice, label: 'Due Date' },
  { key: 'total' as keyof Invoice, label: 'Total Amount' },
  { key: 'status' as keyof Invoice, label: 'Status' },
  { key: 'owner' as keyof Invoice, label: 'Owner' },
  { key: 'poNumber' as keyof Invoice, label: 'PO Number' },
  { key: 'paymentTerms' as keyof Invoice, label: 'Payment Terms' },
];
