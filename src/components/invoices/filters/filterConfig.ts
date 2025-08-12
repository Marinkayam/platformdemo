/**
 * Configuration file for invoice filter options
 * This makes it easier to update or extend filter options without modifying component logic
 */

export const filterConfig = {
  statusOptions: [
    "Pending Action", 
    "Approved by Buyer", 
    "RTP Prepared",
    "RTP Sent",
    "Paid", 
    "External Submission", 
    "Settled", 
    "Awaiting SC", 
    "Excluded", 
    "Overdue"
  ],
  
  totalOptions: [
    "All", 
    "Under $1000", 
    "$1000-$10000", 
    "Over $10000"
  ],
  
  buyerOptions: [
    "Adidas", 
    "Marvel", 
    "Amazon", 
    "Apple", 
    "Samsung", 
    "Golda", 
    "Figma", 
    "BMX", 
    "Netflix", 
    "Tesla", 
    "Google", 
    "Nike"
  ],
  
  portalOptions: [
    "SAP Ariba", 
    "Coupa", 
    "Bill.com", 
    "Tipalti",
    "Amazon Payee",
    "Apple",
    "SAP",
    "Facturaxion",
    "Fieldglass",
    "iSupplier",
    "KissFlow",
    "Qualcomm",
    "Sainsburys",
    "Segment",
    "Shopify",
    "StoreNext",
    "Taulia",
    "Teradata",
    "Tungsten",
    "Walmart",
    "Oracle Procurement",
  ],
  
  transactionOptions: [
    "All", 
    "Invoice", 
    "Credit Memo"
  ],
  
  ownerOptions: [
    "Elon", 
    "Camila", 
    "Lady Gaga", 
    "Madona", 
    "John", 
    "Jane", 
    "Robert", 
    "Sarah"
  ],

  sourceOptions: [
    "Created from Payment Report",
    "Created from A/R Report"
  ]
};
