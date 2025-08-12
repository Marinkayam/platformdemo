
import { getBasicInvoiceData } from "./types";

export const settledInvoices = [
  getBasicInvoiceData(
    "9",
    "INV-100121304",
    "Facebook",
    "09/15/2024",
    "Settled",
    67800.25,
    "09/15/2024",
    "Camila"
  ),
  getBasicInvoiceData(
    "settled-1",
    "INV-20241211",
    "LinkedIn Corporation",
    "2024-12-22",
    "Settled",
    15600.75,
    "2024-11-22",
    "jennifer.adams@example.com",
    {
      portal: "Oracle Procurement",
      poNumber: "LI-889900",
      netTerms: "Net 30",
       submitMethod: "Portal Upload"
    }
  ),
  getBasicInvoiceData(
    "settled-2", 
    "INV-20241212",
    "Shopify Inc",
    "2024-12-25",
    "Settled",
    12300.00,
    "2024-11-25",
    "carlos.rodriguez@example.com",
    {
      portal: "Tipalti",
      poNumber: "SH-990011",
      netTerms: "Net 45",
      submitMethod: "Email"
    }
  ),
  getBasicInvoiceData(
    "settled-3",
    "INV-20241213", 
    "Uber Technologies",
    "2024-12-28",
    "Settled",
    8950.50,
    "2024-11-28",
    "amanda.taylor@example.com",
    {
      portal: "Coupa",
      poNumber: "UB-101122",
      netTerms: "Net 60",
      submitMethod: "Portal Upload"
    }
  )
];
