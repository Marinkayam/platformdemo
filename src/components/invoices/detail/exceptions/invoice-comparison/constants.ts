
import { Invoice } from "@/types/invoice";

export const COMPARISON_FIELDS = [
  { key: 'creationDate' as keyof Invoice, label: 'Issue Date' },
  { key: 'total' as keyof Invoice, label: 'Total' },
  { key: 'status' as keyof Invoice, label: 'Status' },
  { key: 'exceptions' as keyof Invoice, label: 'Exceptions' },
];

export const STEP_LABELS = [
  "Select invoices",
  "Compare details",
  "Confirm choice"
];
