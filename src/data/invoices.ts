
import { Invoice } from "@/types/invoice";

export const invoiceData: Invoice[] = [
  // 5 Pending Action
  {
    id: "1",
    number: "INV-100123322",
    buyer: "Adidas",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 564534.55,
    creationDate: "04/28/2024",
    owner: "Camila",
    subtotal: 513213.23,
    tax: 51321.32,
    currency: "USD"
  },
  {
    id: "2",
    number: "INV-100231211",
    buyer: "Marvel",
    dueDate: "12/31/2024",
    status: "Pending Action",
    total: 12423,
    creationDate: "04/26/2024",
    owner: "Camila",
    currency: "USD"
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
    currency: "USD"
  },
  {
    id: "4",
    number: "INV-100121299",
    buyer: "Shimoni",
    dueDate: "09/15/2024",
    status: "Pending Action",
    total: 5202.15,
    creationDate: "09/15/2024",
    owner: "Rihana",
    currency: "USD"
  },
  {
    id: "5",
    number: "INV-100121300",
    buyer: "Nike",
    dueDate: "09/15/2024",
    status: "Pending Action",
    total: 8750.90,
    creationDate: "09/15/2024",
    owner: "Madona",
    currency: "USD"
  },
  
  // 3 Paid
  {
    id: "6",
    number: "INV-100121301",
    buyer: "Google",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 45000.00,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    currency: "USD"
  },
  {
    id: "7",
    number: "INV-100121302",
    buyer: "Microsoft",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 32150.75,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    currency: "USD"
  },
  {
    id: "8",
    number: "INV-100121303",
    buyer: "Apple",
    dueDate: "09/15/2024",
    status: "Paid",
    total: 28900.45,
    creationDate: "09/15/2024",
    owner: "Madona",
    currency: "USD"
  },
  
  // 1 Settled
  {
    id: "9",
    number: "INV-100121304",
    buyer: "Facebook",
    dueDate: "09/15/2024",
    status: "Settled",
    total: 67800.25,
    creationDate: "09/15/2024",
    owner: "Camila",
    currency: "USD"
  },
  
  // 3 Awaiting SC
  {
    id: "10",
    number: "INV-100121305",
    buyer: "Twitter",
    dueDate: "09/15/2024",
    status: "Awaiting SC",
    total: 9400.50,
    creationDate: "09/15/2024",
    owner: "Rihana",
    currency: "USD"
  },
  {
    id: "11",
    number: "INV-100121306",
    buyer: "LinkedIn",
    dueDate: "09/15/2024",
    status: "Awaiting SC",
    total: 12600.80,
    creationDate: "09/15/2024",
    owner: "Madona",
    currency: "USD"
  },
  {
    id: "12",
    number: "INV-100121307",
    buyer: "Netflix",
    dueDate: "09/15/2024",
    status: "Awaiting SC",
    total: 18900.35,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    currency: "USD"
  },
  
  // 1 Excluded
  {
    id: "13",
    number: "INV-100121308",
    buyer: "Spotify",
    dueDate: "09/15/2024",
    status: "Excluded",
    total: 4500.60,
    creationDate: "09/15/2024",
    owner: "Camila",
    currency: "USD"
  },
  
  // 1 RTP Prepared
  {
    id: "14",
    number: "INV-100121309",
    buyer: "Adobe",
    dueDate: "09/15/2024",
    status: "RTP Prepared",
    total: 23400.90,
    creationDate: "09/15/2024",
    owner: "Rihana",
    currency: "USD"
  },
  
  // 1 RTP Sent
  {
    id: "15",
    number: "INV-100121310",
    buyer: "Samsung",
    dueDate: "09/15/2024",
    status: "RTP Sent",
    total: 42600.70,
    creationDate: "09/15/2024",
    owner: "Madona",
    currency: "USD"
  },
  
  // 2 Rejected by Buyer
  {
    id: "16",
    number: "INV-100121311",
    buyer: "Intel",
    dueDate: "09/15/2024",
    status: "Rejected by Buyer",
    total: 31200.45,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    rejectedBy: "Buyer",
    currency: "USD"
  },
  {
    id: "17",
    number: "INV-100121312",
    buyer: "AMD",
    dueDate: "09/15/2024",
    status: "Rejected by Buyer",
    total: 27800.90,
    creationDate: "09/15/2024",
    owner: "Camila",
    rejectedBy: "Buyer",
    currency: "USD"
  },
  
  // 1 Approved by Buyer
  {
    id: "18",
    number: "INV-100121313",
    buyer: "Oracle",
    dueDate: "09/15/2024",
    status: "Approved by Buyer",
    total: 54300.25,
    creationDate: "09/15/2024",
    owner: "Rihana",
    currency: "USD"
  },
  
  // 1 External Submission
  {
    id: "19",
    number: "INV-100121314",
    buyer: "Cisco",
    dueDate: "09/15/2024",
    status: "External Submission",
    total: 37900.60,
    creationDate: "09/15/2024",
    owner: "Madona",
    currency: "USD"
  },
  
  // 1 Partially Settled
  {
    id: "20",
    number: "INV-100121315",
    buyer: "IBM",
    dueDate: "09/15/2024",
    status: "Partially Settled",
    total: 48600.80,
    creationDate: "09/15/2024",
    owner: "Lady Gaga",
    currency: "USD"
  }
];
