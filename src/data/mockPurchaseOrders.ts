// Mock PO data for validation testing
export const mockPurchaseOrders = [
  {
    id: "po-001",
    poNumber: "PO-2024-001",
    status: "approved", // Maps to "Open"
    currency: "USD",
    totalAmount: 1000000, // Increased to accommodate large invoice
    invoicedAmount: 50000,
    pendingAmount: 0,
    buyer: "TechCorp",
    supplier: "Global Supplies Inc"
  },
  {
    id: "po-002",
    poNumber: "PO-2024-002",
    status: "completed", // Maps to "Closed"
    currency: "USD",
    totalAmount: 5000,
    invoicedAmount: 5000,
    pendingAmount: 0,
    buyer: "Acme Corp",
    supplier: "Widget Co"
  },
  {
    id: "po-003",
    poNumber: "PO-2024-003",
    status: "approved", // Maps to "Open"
    currency: "EUR", // Different currency for mismatch testing
    totalAmount: 8000,
    invoicedAmount: 2000,
    pendingAmount: 1000,
    buyer: "EuroTech",
    supplier: "Continental Supplies"
  },
  {
    id: "po-004",
    poNumber: "PO-2024-004",
    status: "approved", // Maps to "Open"
    currency: "USD",
    totalAmount: 15000,
    invoicedAmount: 14500, // Low TRA for testing insufficient funds
    pendingAmount: 0,
    buyer: "MegaCorp",
    supplier: "Industrial Solutions"
  },
  {
    id: "po-005",
    poNumber: "PO-2024-005",
    status: "cancelled",
    currency: "USD",
    totalAmount: 20000,
    invoicedAmount: 0,
    pendingAmount: 0,
    buyer: "BigBiz Inc",
    supplier: "Premium Vendors"
  },
  {
    id: "po-006",
    poNumber: "PO-2024-006",
    status: "approved", // Maps to "Open"
    currency: "USD",
    totalAmount: 850000,
    invoicedAmount: 50000,
    pendingAmount: 0,
    buyer: "TechCorp",
    supplier: "Adobe"
  },
  {
    id: "po-007",
    poNumber: "PO-2024-007",
    status: "approved", // Maps to "Open"
    currency: "USD",
    totalAmount: 1200000,
    invoicedAmount: 100000,
    pendingAmount: 0,
    buyer: "MegaCorp",
    supplier: "Adobe"
  }
];

// Helper function to calculate TRA
export const calculateTRA = (po: typeof mockPurchaseOrders[0]) => {
  return po.totalAmount - po.invoicedAmount - po.pendingAmount;
};

// Helper function to find PO by number
export const findPOByNumber = (poNumber: string) => {
  return mockPurchaseOrders.find(po => po.poNumber === poNumber);
};

// Status mapping for Monto alignment
export const poStatusMap: Record<string, string> = {
  'approved': 'Open',
  'completed': 'Closed',
  'cancelled': 'Cancelled',
  'Partially Invoiced': 'Partially Invoiced',
  'Fully Invoiced': 'Fully Invoiced'
};