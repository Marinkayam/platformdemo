
import { TabsNav } from "@/components/common/TabsNav";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";
import { InvoiceActions } from "@/components/invoices/InvoiceActions";
import { PageHeader } from "@/components/common/PageHeader";

interface InvoiceHeaderProps {
  tabs: {
    id: string;
    label: string;
    count: number;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onFilterChange: (filters: InvoiceFiltersType) => void;
  invoiceCount: number;
}

export function InvoiceHeader({ 
  tabs, 
  activeTab, 
  onTabChange,
  onFilterChange,
  invoiceCount
}: InvoiceHeaderProps) {
  const getSubtitle = (activeTab: string) => {
    switch (activeTab) {
      case "pending":
        return "Pending Actions shows all RTPs that need your attention—whether waiting for approval, payment, or follow-up—so nothing slips through the cracks.";
      case "overdue":
        return "Overdue shows RTPs that have missed their expected payment date—helping you quickly spot delays and take action.";
      case "settled":
        return "Settled shows all RTPs that have been paid—giving you a clear view of completed transactions and cash flow.";
      default:
        return "RTPs in Monto are smart, trackable payment requests tied to invoices—helping teams sync data, track approvals, and manage payments in one place.";
    }
  };

  return (
    <>
      <PageHeader 
        title="RTPs" 
        subtitle={getSubtitle(activeTab)}
      />
      
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex justify-between items-center mb-6">
        <InvoiceFilters onFilterChange={onFilterChange} />
        <InvoiceActions invoiceCount={invoiceCount} />
      </div>
    </>
  );
}
