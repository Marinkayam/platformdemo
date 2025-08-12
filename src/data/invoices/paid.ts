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
    "Lady Gaga",
    {
      portal: "Amazon Payee"
    }
  ),
  getBasicInvoiceData(
    "7",
    "INV-100121302",
    "Microsoft",
    "09/15/2024",
    "Paid",
    32150.75,
    "09/15/2024",
    "Lady Gaga",
    {
      portal: "Apple"
    }
  ),
  getBasicInvoiceData(
    "8",
    "INV-100121303",
    "Apple",
    "09/15/2024",
    "Paid",
    28900.45,
    "09/15/2024",
    "Madona",
    {
      portal: "SAP Ariba"
    }
  ),
  getBasicInvoiceData(
    "paid-1",
    "INV-20241208",
    "Netflix Inc",
    "2024-12-15",
    "Paid",
    9500.00,
    "2024-11-15",
    "john.martinez@example.com",
    {
      portal: "Coupa",
      poNumber: "NF-556677",
      netTerms: "Net 30",
      submitMethod: "Portal"
    }
  ),
  getBasicInvoiceData(
    "paid-2",
    "INV-20241209",
    "Spotify Technology",
    "2024-12-18",
    "Paid",
    6750.25,
    "2024-11-18",
    "maria.garcia@example.com",
    {
      portal: "Bill.com",
      poNumber: "SP-667788",
      netTerms: "Net 15",
      submitMethod: "Email"
    }
  ),
  getBasicInvoiceData(
    "paid-3",
    "INV-20241210",
    "Twitter Inc",
    "2024-12-20",
    "Paid",
    4200.50,
    "2024-11-20",
    "robert.johnson@example.com",
    {
      portal: "SAP Ariba",
      poNumber: "TW-778899",
      netTerms: "Net 45",
      submitMethod: "API"
    }
  )
];
