
import { getBasicInvoiceData } from "./types";

export const excludedInvoices = [
  getBasicInvoiceData(
    "13",
    "INV-100121308",
    "Spotify",
    "09/15/2024",
    "Excluded",
    4500.60,
    "09/15/2024",
    "Camila",
    {
      poNumber: "SPO-445678"
    }
  ),
  getBasicInvoiceData(
    "excluded-1",
    "INV-20241216",
    "DocuSign Inc", 
    "2024-12-31",
    "Excluded",
    3200.00,
    "2024-12-01",
    "mark.thompson@example.com",
    {
      portal: "Bill.com",
      poNumber: "DS-334455",
      netTerms: "Net 30",
      submitMethod: "Email",
      notes: [
        {
          id: "excluded-note-1",
          content: "Excluded due to duplicate invoice detection.",
          createdAt: "2024-12-01T10:00:00Z",
          createdBy: "System",
          isRead: false,
          isNew: true
        }
      ]
    }
  ),
  getBasicInvoiceData(
    "excluded-2",
    "INV-20241217",
    "Slack Technologies LLC",
    "2025-01-05",
    "Excluded",
    5800.75,
    "2024-12-05",
    "laura.martinez@example.com",
    {
      portal: "Tipalti",
      poNumber: "SL-445566",
      netTerms: "Net 15", 
      submitMethod: "Portal Upload"
    }
  )
];
