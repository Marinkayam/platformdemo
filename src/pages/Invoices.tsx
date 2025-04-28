
import { useState } from "react";
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
import { InvoiceFilters, InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { invoiceData } from "@/data/invoices";
import { Invoice } from "@/types/invoice";

const tabs = [
  { id: "all", label: "All Invoices" },
  { id: "pending", label: "Pending Action", count: 8 },
  { id: "cleared", label: "Cleared" },
];

export default function Invoices() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<InvoiceFiltersType>({
    status: "All",
    total: "All",
    dueDate: "All",
    buyer: "All",
    search: ""
  });
  
  // Filter invoices based on active tab and filters
  const filteredInvoices = invoiceData.filter((invoice: Invoice) => {
    // First apply tab filter
    if (activeTab === "pending" && invoice.status !== "Pending Action") return false;
    if (activeTab === "cleared" && !["Paid", "Settled"].includes(invoice.status)) return false;
    
    // Then apply dropdown filters
    if (filters.status !== "All" && invoice.status !== filters.status) return false;
    if (filters.buyer !== "All" && invoice.buyer !== filters.buyer) return false;
    
    // Apply total filter
    if (filters.total !== "All") {
      const total = invoice.total;
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
        invoice.owner.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Invoices</h1>
      
      <InvoiceTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <InvoiceFilters onFilterChange={setFilters} />
      
      <InvoiceTable invoices={filteredInvoices} />
    </div>
  );
}
