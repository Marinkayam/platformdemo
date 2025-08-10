
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { PaymentReportUploadWizard } from "@/components/workspace/integration-hub/payment-report-upload/PaymentReportUploadWizard";
import { invoiceData } from "@/data/invoices";
import { useInvoiceFiltering } from "@/hooks/useInvoiceFiltering";

export default function Invoices() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentReportWizard, setShowPaymentReportWizard] = useState(false);
  
  // Set active tab based on URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    
    if (status === "pending") {
      setActiveTab("pending");
    } else if (status === "settled") {
      setActiveTab("settled");
    } else if (status === "overdue") {
      setActiveTab("overdue");
    } else {
      setActiveTab("all");
    }
  }, [location.search]);

  // Simulate loading effect for realistic UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds loading time

    return () => clearTimeout(timer);
  }, [activeTab]); // Reload when tab changes
  
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
  const settledCount = invoiceData.filter(invoice => ["Paid", "Settled"].includes(invoice.status)).length;
  
  // Update tabs with counts
  const tabsWithCounts = [
    { id: "all", label: "All Request-to-Pay", count: invoiceData.length },
    { id: "pending", label: "Pending Action", count: pendingCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
    { id: "settled", label: "Settled", count: settledCount },
  ];

  const handlePaymentSync = () => {
    setShowPaymentReportWizard(true);
  };

  const handleClosePaymentReportWizard = () => {
    setShowPaymentReportWizard(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0 px-3 sm:px-4 md:px-6 pt-6">
        <InvoiceHeader 
          tabs={tabsWithCounts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFilterChange={setFilters}
          invoiceCount={filteredInvoices.length}
          onPaymentSync={handlePaymentSync}
        />
      </div>
      
      <div className="flex-1 min-w-0 w-full px-3 sm:px-4 md:px-6">
        <InvoiceTable 
          invoices={filteredInvoices} 
          isPendingTab={activeTab === "pending"}
          isLoading={isLoading}
        />
      </div>

      <PaymentReportUploadWizard 
        isOpen={showPaymentReportWizard}
        onClose={handleClosePaymentReportWizard}
      />
    </div>
  );
}
