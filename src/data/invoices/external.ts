
import { getBasicInvoiceData } from "./types";

export const externalInvoices = [
  getBasicInvoiceData(
    "19",
    "INV-100121314",
    "Cisco",
    "09/15/2024",
    "External Submission",
    37900.60,
    "09/15/2024",
    "Madona"
  ),
  getBasicInvoiceData(
    "ext1",
    "INV-20241204",
    "Google LLC",
    "2024-12-20",
    "External Submission",
    22400.00,
    "2024-11-20",
    "david.kim@example.com",
    {
      portal: "Bill.com",
      poNumber: "EXT-445566",
      netTerms: "Net 15",
      submitMethod: "Portal Upload"
    }
  ),
  getBasicInvoiceData(
    "ext2",
    "INV-20241205",
    "Salesforce Inc",
    "2024-12-25",
    "External Submission",
    18750.25,
    "2024-11-25",
    "emily.rodriguez@example.com",
    {
      portal: "Tipalti",
      poNumber: "SF-789012",
      netTerms: "Net 30",
      submitMethod: "API"
    }
  )
];
