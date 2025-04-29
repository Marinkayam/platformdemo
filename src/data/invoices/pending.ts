
import { getBasicInvoiceData } from "./types";

export const pendingInvoices = [
  getBasicInvoiceData(
    "1",
    "INV-100123322",
    "Adidas",
    "12/31/2024",
    "Pending Action",
    564534.55,
    "04/28/2024",
    "Camila",
    {
      subtotal: 513213.23,
      tax: 51321.32,
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "2",
    "INV-100231211",
    "Marvel",
    "12/31/2024",
    "Pending Action",
    12423,
    "04/26/2024",
    "Camila",
    {
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "3",
    "INV-100121298",
    "Amazon",
    "09/15/2024",
    "Pending Action",
    15020.34,
    "09/15/2024",
    "Camila",
    {
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "4",
    "INV-100121299",
    "Shimoni",
    "09/15/2024",
    "Pending Action",
    5202.15,
    "09/15/2024",
    "Rihana",
    {
      rejectedBy: "Monto"
    }
  ),
  getBasicInvoiceData(
    "5",
    "INV-100121300",
    "Nike",
    "09/15/2024",
    "Pending Action",
    8750.90,
    "09/15/2024",
    "Madona",
    {
      rejectedBy: "Buyer"
    }
  )
];
