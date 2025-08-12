
import { getBasicInvoiceData } from "./types";

export const awaitingInvoices = [
  getBasicInvoiceData(
    "10",
    "INV-100121305",
    "Twitter",
    "09/15/2024",
    "Awaiting SC",
    9400.50,
    "09/15/2024",
    "Rihana"
  ),
  getBasicInvoiceData(
    "11",
    "INV-100121306",
    "LinkedIn",
    "09/15/2024",
    "Awaiting SC",
    12600.80,
    "09/15/2024",
    "Madona"
  ),
  getBasicInvoiceData(
    "12",
    "INV-100121307",
    "Netflix",
    "09/15/2024",
    "Awaiting SC",
    18900.35,
    "09/15/2024",
    "Lady Gaga"
  ),
  getBasicInvoiceData(
    "awaiting-1",
    "INV-20241214",
    "Dropbox Inc",
    "2024-12-30",
    "Awaiting SC",
    7200.25,
    "2024-11-30",
    "steve.wilson@example.com",
    {
      portal: "SAP Ariba",
      poNumber: "DB-112233",
      netTerms: "Net 30",
      submitMethod: "Portal",
      notes: [
        {
          id: "awaiting-note-1",
          content: "Smart Connection agent is currently syncing portal data.",
          createdAt: "2024-12-01T08:00:00Z",
          createdBy: "System",
          isRead: false,
          isNew: true
        }
      ]
    }
  ),
  getBasicInvoiceData(
    "awaiting-2",
    "INV-20241215",
    "Atlassian Corporation",
    "2025-01-02",
    "Awaiting SC",
    11500.00,
    "2024-12-02",
    "patricia.lee@example.com",
    {
      portal: "Coupa",
      poNumber: "AT-223344",
      netTerms: "Net 45",
      submitMethod: "API"
    }
  )
];
