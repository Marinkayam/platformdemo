
import { getBasicInvoiceData } from "./types";

export const approvedInvoices = [
  getBasicInvoiceData(
    "ap1",
    "INV-20241201",
    "Microsoft Corp",
    "2024-12-31",
    "Approved by Buyer",
    15750.00,
    "2024-12-01",
    "sarah.johnson@example.com",
    {
      portal: "SAP Ariba",
      poNumber: "PO-887654",
      netTerms: "Net 30",
      submitMethod: "Email"
    }
  ),
  getBasicInvoiceData(
    "ap2", 
    "INV-20241202",
    "Amazon Web Services",
    "2024-12-28",
    "Approved by Buyer", 
    28960.50,
    "2024-11-28",
    "michael.chen@example.com",
    {
      portal: "Coupa",
      poNumber: "PO-998877",
      netTerms: "Net 45",
      submitMethod: "Portal"
    }
  ),
  getBasicInvoiceData(
    "ap3",
    "INV-20241203", 
    "Oracle Corporation",
    "2025-01-15",
    "Approved by Buyer",
    45200.75,
    "2024-12-01",
    "lisa.wang@example.com",
    {
      portal: "Oracle Procurement", 
      poNumber: "ORC-556677",
      netTerms: "Net 60",
      submitMethod: "EDI"
    }
  )
];
