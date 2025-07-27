import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";

export const getBasicInvoiceData = (
  id: string,
  number: string,
  buyer: string,
  dueDate: string,
  status: string,
  total: number,
  creationDate: string,
  owner: string,
  extras: Partial<Invoice> = {}
): Invoice => {
  const baseInvoiceDate = new Date(creationDate);
  const defaultInvoiceDate = new Date(baseInvoiceDate.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000); // 0-14 days before creation
  
  const netTermsOptions = ["Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt", "Net 10"];
  const defaultNetTerms = netTermsOptions[Math.floor(Math.random() * netTermsOptions.length)];
  
  const poNumbers = [`PO-${Math.floor(Math.random() * 999999) + 100000}`, `P${Math.floor(Math.random() * 999999) + 100000}`, `${buyer.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9999) + 1000}`];
  const defaultPONumber = poNumbers[Math.floor(Math.random() * poNumbers.length)];

  const portals = ["Coupa", "SAP Ariba", "Oracle Procurement", "Tipalti", "Bill.com"];
  const defaultPortal = portals[Math.floor(Math.random() * portals.length)];

  return {
    id,
    number,
    buyer,
    dueDate,
    status: status as Invoice['status'],
    total,
    creationDate,
    owner,
    currency: "USD",
    hasExceptions: extras.hasExceptions || false,
    documentType: extras.documentType || "Invoice",
    portal: extras.portal || defaultPortal as Invoice['portal'],
    isOverdue: extras.isOverdue || false,
    poNumber: extras.poNumber || defaultPONumber,
    invoiceDate: extras.invoiceDate || defaultInvoiceDate.toISOString().split('T')[0],
    netTerms: extras.netTerms || defaultNetTerms,
    ...extras
  };
};

// Test data for Overdue Invoices and Credit Memos
export const testInvoices = [
  // Overdue Invoices with Extra Data Exception
  getBasicInvoiceData(
    "test-overdue-1",
    "INV-10032100",
    "Tesla",
    "2024-03-01",
    "Pending Action",
    18000.00,
    "2024-02-15",
    "Elon",
    {
      portal: "Coupa",
      isOverdue: true,
      hasExceptions: true,
      submitMethod: "Payment Report",
      notes: [
        {
          id: "note-1",
          content: "Payment report shows discrepancy in amount. Please verify with accounting team.",
          createdAt: "2024-02-16T09:15:00Z",
          createdBy: "Sarah Wilson",
          isRead: false,
          isNew: true
        },
        {
          id: "note-2", 
          content: "Buyer requested additional documentation for this high-value invoice.",
          createdAt: "2024-02-17T14:30:00Z",
          createdBy: "John Smith",
          isRead: false,
          isNew: false
        }
      ],
      exceptions: [
        {
          id: "exc-extra-data-001",
          type: "EXTRA_DATA",
          message: "Missing Data",
          details: "Required information is missing from the invoice's additional data: Invoice Date, Customer Name",
          createdAt: "2024-02-15T10:30:00Z",
          resolved: false
        }
      ]
    }
  ),
  
  // Credit Memos
  getBasicInvoiceData(
    "test-cm-1",
    "CM-00021300",
    "Google",
    "2024-04-10",
    "Paid",
    -2000.00,
    "2024-03-25",
    "Lady Gaga",
    {
      documentType: "Credit Memo",
      portal: "Tipalti",
      submitMethod: "A/R Report",
      notes: [
        {
          id: "note-3",
          content: "A/R Report indicates this credit memo needs urgent processing.",
          createdAt: "2024-03-26T11:45:00Z",
          createdBy: "Lady Gaga",
          isRead: false,
          isNew: true
        }
      ]
    }
  ),
  getBasicInvoiceData(
    "test-cm-2",
    "CM-00021301",
    "Nike",
    "2024-03-28",
    "Paid", // Updated from "Approved by Buyer" to "Paid"
    -450.00,
    "2024-03-10",
    "Madona",
    {
      documentType: "Credit Memo",
      portal: "Bill.com",
      submitMethod: "A/R Report",
      notes: [
        {
          id: "note-3",
          content: "A/R Report indicates this credit memo needs urgent processing.",
          createdAt: "2024-03-26T11:45:00Z",
          createdBy: "Lady Gaga",
          isRead: false,
          isNew: true
        }
      ]
    }
  ),

  // Additional test invoices with notes and source indicators
  getBasicInvoiceData(
    "test-payment-report-1",
    "INV-10032200",
    "Amazon",
    "2024-04-15",
    "Approved by Buyer",
    25000.00,
    "2024-04-01",
    "John",
    {
      portal: "Oracle Procurement",
      submitMethod: "Payment Report",
      notes: [
        {
          id: "note-4",
          content: "Payment report validation completed successfully.",
          createdAt: "2024-04-02T08:30:00Z",
          createdBy: "Sarah Wilson",
          isRead: false,
          isNew: false
        },
        {
          id: "note-5",
          content: "Approved for payment - amount verified against payment report.",
          createdAt: "2024-04-03T16:20:00Z",
          createdBy: "Elon",
          isRead: false,
          isNew: true
        }
      ]
    }
  ),

  getBasicInvoiceData(
    "test-regular-1",
    "INV-10032300",
    "Apple",
    "2024-04-20",
    "Pending Action",
    12500.00,
    "2024-04-05",
    "Jane",
    {
      portal: "SAP Ariba",
      submitMethod: "Portal Upload",
      notes: [
        {
          id: "note-6",
          content: "Missing supporting documentation - requested from vendor.",
          createdAt: "2024-04-06T10:15:00Z",
          createdBy: "Robert",
          isRead: false,
          isNew: true
        }
      ]
    }
  )
];
