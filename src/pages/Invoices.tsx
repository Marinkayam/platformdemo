
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { invoiceData } from "@/data/invoices";
import { useInvoiceFiltering } from "@/hooks/useInvoiceFiltering";

export default function Invoices() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  
  // Set active tab based on URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    
    if (status === "pending") {
      setActiveTab("pending");
    } else if (status === "cleared") {
      setActiveTab("cleared");
    } else if (status === "overdue") {
      setActiveTab("overdue");
    } else {
      setActiveTab("all");
    }
  }, [location.search]);
  
  // Use custom hook for filtering
  const { filters, setFilters, filteredInvoices } = useInvoiceFiltering(invoiceData, activeTab);

  // Calculate counts for tabs
  const isOverdue = (dateString: string) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today;
    } catch {
      return false;
    }
  };

  const pendingCount = invoiceData.filter(invoice => invoice.status === "Pending Action").length;
  const overdueCount = invoiceData.filter(invoice => isOverdue(invoice.dueDate)).length;
  const clearedCount = invoiceData.filter(invoice => ["Paid", "Settled"].includes(invoice.status)).length;
  
  // Update tabs with counts
  const tabsWithCounts = [
    { id: "all", label: "All Invoices", count: invoiceData.length },
    { id: "pending", label: "Pending Action", count: pendingCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
    { id: "cleared", label: "Cleared", count: clearedCount },
  ];

  return (
    <div>
      <InvoiceHeader 
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        invoiceCount={filteredInvoices.length}
      />
      
      <InvoiceTable 
        invoices={filteredInvoices} 
        isPendingTab={activeTab === "pending"}
      />
    </div>
  );
}
