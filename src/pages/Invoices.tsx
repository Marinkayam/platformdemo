
import { useState } from "react";
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { invoiceData } from "@/data/invoices";

const tabs = [
  { id: "all", label: "All Invoices" },
  { id: "pending", label: "Pending Action", count: 8 },
  { id: "cleared", label: "Cleared" },
];

export default function Invoices() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter invoices based on active tab
  const filteredInvoices = invoiceData.filter((invoice) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return invoice.status === "Pending Action";
    if (activeTab === "cleared") return ["Paid", "Settled"].includes(invoice.status);
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
      
      <InvoiceFilters />
      
      <InvoiceTable invoices={filteredInvoices} />
    </div>
  );
}
