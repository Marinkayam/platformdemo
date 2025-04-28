
import { getBasicInvoiceData } from "./types";

export const rejectedInvoices = [
  getBasicInvoiceData(
    "16",
    "INV-100121311",
    "Intel",
    "09/15/2024",
    "Rejected by Buyer",
    31200.45,
    "09/15/2024",
    "Lady Gaga",
    { rejectedBy: "Buyer" }
  ),
  getBasicInvoiceData(
    "17",
    "INV-100121312",
    "AMD",
    "09/15/2024",
    "Rejected by Buyer",
    27800.90,
    "09/15/2024",
    "Camila",
    { rejectedBy: "Buyer" }
  ),
  getBasicInvoiceData(
    "18",
    "INV-100121313",
    "Microsoft",
    "09/20/2024",
    "Rejected by Monto",
    34560.75,
    "09/15/2024",
    "Taylor Swift",
    { rejectedBy: "Monto" }
  )
];
