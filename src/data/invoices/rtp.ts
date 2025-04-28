
import { getBasicInvoiceData } from "./types";

export const rtpInvoices = [
  // RTP Prepared
  getBasicInvoiceData(
    "14",
    "INV-100121309",
    "Adobe",
    "09/15/2024",
    "RTP Prepared",
    23400.90,
    "09/15/2024",
    "Rihana"
  ),
  // RTP Sent
  getBasicInvoiceData(
    "15",
    "INV-100121310",
    "Samsung",
    "09/15/2024",
    "RTP Sent",
    42600.70,
    "09/15/2024",
    "Madona"
  )
];
