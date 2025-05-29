
import { PurchaseOrder } from "@/types/purchaseOrder";

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-88991",
    buyerName: "Acme Corporation", 
    status: "New",
    portal: "SAP Ariba",
    total: 25000.00,
    invoicedAmount: 0.00,
    amountLeft: 25000.00,
    paymentTerms: "Net 30",
    createdDate: "2024-01-15",
    dueDate: "2024-02-15",
    description: "Office supplies and equipment for Q1",
    owner: "John Smith" // Changed from email to name
  },
  {
    id: "po-002", 
    poNumber: "PO-99102",
    buyerName: "Tech Solutions Ltd",
    status: "Partially Invoiced",
    portal: "Coupa",
    total: 15000.00,
    invoicedAmount: 7500.00,
    amountLeft: 7500.00,
    paymentTerms: "Net 15",
    createdDate: "2024-01-20",
    dueDate: "2024-02-05",
    description: "Software licensing and support services",
    owner: "Sarah Wilson" // Changed from email to name
  },
  {
    id: "po-003",
    poNumber: "PO-77893", 
    buyerName: "Global Enterprises",
    status: "Fully Invoiced",
    portal: "Jaggaer",
    total: 35000.00,
    invoicedAmount: 35000.00,
    amountLeft: 0.00,
    paymentTerms: "Net 45",
    createdDate: "2024-01-10",
    dueDate: "2024-02-25",
    description: "Manufacturing equipment and parts",
    owner: "David Clark" // Changed from email to name
  },
  {
    id: "po-004",
    poNumber: "PO-66784",
    buyerName: "European Partners GmbH", 
    status: "New",
    portal: "SAP Ariba",
    total: 42000.00,
    invoicedAmount: 0.00,
    amountLeft: 42000.00,
    paymentTerms: "Net 30",
    createdDate: "2024-01-25",
    dueDate: "2024-02-25",
    description: "Consulting services and project management",
    owner: "Anna Mueller" // Changed from email to name
  },
  {
    id: "po-005",
    poNumber: "PO-55667",
    buyerName: "Retail Chain Inc",
    status: "Partially Invoiced",
    portal: "Oracle",
    total: 28000.00,
    invoicedAmount: 14000.00,
    amountLeft: 14000.00,
    paymentTerms: "Net 20",
    createdDate: "2024-02-01",
    dueDate: "2024-02-21",
    description: "Inventory management system upgrade",
    owner: "Maria Garcia" // Changed from email to name
  }
];
