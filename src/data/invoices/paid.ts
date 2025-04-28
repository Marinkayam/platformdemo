
import { getBasicInvoiceData } from "./types";

export const paidInvoices = [
  getBasicInvoiceData(
    "6",
    "INV-100121301",
    "Google",
    "09/15/2024",
    "Paid",
    45000.00,
    "09/15/2024",
    "Lady Gaga"
  ),
  getBasicInvoiceData(
    "7",
    "INV-100121302",
    "Microsoft",
    "09/15/2024",
    "Paid",
    32150.75,
    "09/15/2024",
    "Lady Gaga"
  ),
  getBasicInvoiceData(
    "8",
    "INV-100121303",
    "Apple",
    "09/15/2024",
    "Paid",
    28900.45,
    "09/15/2024",
    "Madona"
  )
];
