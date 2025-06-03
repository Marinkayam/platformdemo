import { useState, useMemo } from "react";
import { Invoice } from "@/types/invoice";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";

export function useInvoiceFiltering(invoices: Invoice[], activeTab: string) {
  const [filters, setFilters] = useState<InvoiceFiltersType>({
    status: [],
    total: "All",
    dueDate: {
      from: "",
      to: "",
    },
    buyer: [],
    portal: [],
    transactionType: "All",
    owner: [],
    search: "",
  });
  
  // Check if a date is overdue
  const isOverdue = (dateString: string) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today
      return dueDate < today;
    } catch {
      return false;
    }
  };
  
  // Filter invoices based on active tab and filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice: Invoice) => {
      // First apply tab filter
      if (activeTab === "pending" && invoice.status !== "Pending Action") return false;
      if (activeTab === "overdue" && !isOverdue(invoice.dueDate)) return false;
      if (activeTab === "settled" && !["Paid", "Settled"].includes(invoice.status)) return false;
      
      // Then apply dropdown filters
      if (filters.status.length > 0 && !filters.status.includes(invoice.status)) return false;
      
      if (filters.buyer.length > 0 && !filters.buyer.includes(invoice.buyer)) return false;
      
      if (filters.portal.length > 0 && (!invoice.portal || !filters.portal.includes(invoice.portal))) return false;
      
      // Apply transaction type filter
      if (filters.transactionType !== "All") {
        if (filters.transactionType === "Invoice" && invoice.documentType === "Credit Memo") return false;
        if (filters.transactionType === "Credit Memo" && invoice.documentType !== "Credit Memo") return false;
      }
      
      // Apply owner filter
      if (filters.owner.length > 0 && !filters.owner.includes(invoice.owner)) return false;
      
      // Apply date range filter
      if (filters.dueDate.from || filters.dueDate.to) {
        try {
          const dueDate = new Date(invoice.dueDate);
          
          if (filters.dueDate.from) {
            const fromDate = new Date(filters.dueDate.from);
            if (dueDate < fromDate) return false;
          }
          
          if (filters.dueDate.to) {
            const toDate = new Date(filters.dueDate.to);
            toDate.setHours(23, 59, 59, 999); // End of the day
            if (dueDate > toDate) return false;
          }
        } catch {
          // Ignore invalid dates
        }
      }
      
      // Apply total filter
      if (filters.total !== "All") {
        const total = Math.abs(invoice.total); // Use absolute value for filtering
        if (filters.total === "Under $1000" && total >= 1000) return false;
        if (filters.total === "$1000-$10000" && (total < 1000 || total > 10000)) return false;
        if (filters.total === "Over $10000" && total <= 10000) return false;
      }
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          invoice.number.toLowerCase().includes(searchLower) ||
          invoice.buyer.toLowerCase().includes(searchLower) ||
          invoice.owner.toLowerCase().includes(searchLower) ||
          (invoice.portal && invoice.portal.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [invoices, activeTab, filters]);

  return {
    filters,
    setFilters,
    filteredInvoices
  };
}
