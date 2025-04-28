
import { Invoice } from "@/types/invoice";

export const invoiceData: Invoice[] = [
  {
    id: "1",
    number: "INV-100123322",
    buyer: "Adidas",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 564534.55,
    creationDate: "04/28/2024",
    owner: "Camila"
  },
  {
    id: "2",
    number: "INV-100231211",
    buyer: "Marvel",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 12423,
    creationDate: "04/26/2024",
    owner: "Camila"
  },
  {
    id: "3",
    number: "INV-100121298",
    buyer: "Amazon",
    dueDate: "09/15/2024",
    status: "Pending Action",
    total: 15020.34,
    creationDate: "09/15/2024",
    owner: "Camila",
    hasWarning: true
  },
  {
    id: "4",
    number: "INV-100121299",
    buyer: "Shimoni",
    dueDate: "09/15/2024",
    status: "Pending Action",
    total: 5202.15,
    creationDate: "09/15/2024",
    owner: "Rihana"
  },
  {
    id: "5",
    number: "INV-100231298",
    buyer: "Apple",
    dueDate: "09/15/2024",
    status: "Approved by Buyer",
    total: 5000,
    creationDate: "09/15/2024",
    owner: "Madona"
  },
  {
    id: "6",
    number: "INV-100123342",
    buyer: "Samsung",
    dueDate: "09/15/2024",
    status: "Approved by Buyer",
    total: 2000,
    creationDate: "09/15/2024",
    owner: "Lady Gaga"
  },
  {
    id: "7",
    number: "INV-100121298",
    buyer: "Golda",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 150,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    hasWarning: true
  },
  {
    id: "8",
    number: "INV-100121242",
    buyer: "Figma",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 1423424.12,
    creationDate: "09/15/2024",
    owner: "Lady Gaga"
  },
  {
    id: "9",
    number: "INV-100121212",
    buyer: "BMX",
    dueDate: "09/15/2024",
    status: "External Submission",
    total: 5,
    creationDate: "09/15/2024",
    owner: "Lady Gaga"
  },
  {
    id: "10",
    number: "INV-100121211",
    buyer: "Apple",
    dueDate: "09/15/2024",
    status: "Settled",
    total: 513,
    creationDate: "09/15/2024",
    owner: "Madona"
  },
  {
    id: "11",
    number: "INV-100121291",
    buyer: "Netflix",
    dueDate: "09/15/2024",
    status: "Awaiting SC",
    total: 5000,
    creationDate: "09/15/2024",
    owner: "Madona"
  },
  {
    id: "12",
    number: "INV-100121281",
    buyer: "Amazon",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 12100,
    creationDate: "09/15/2024",
    owner: "Madona"
  }
];
