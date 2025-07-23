
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  onPaymentSync: () => void;
}

export function InvoiceHeader({ 
  tabs, 
  activeTab, 
  onTabChange,
  onFilterChange,
  invoiceCount,
  onPaymentSync
}: InvoiceHeaderProps) {
  const getSubtitle = (activeTab: string) => {
    switch (activeTab) {
      case "pending":
        return "Pending Actions shows all Request-to-Pay that need your attention—whether waiting for approval, payment, or follow-up—so nothing slips through the cracks.";
      case "overdue":
        return "Overdue shows Request-to-Pay that have missed their expected payment date—helping you quickly spot delays and take action.";
      case "settled":
        return "Settled shows all Request-to-Pay that have been paid—giving you a clear view of completed transactions and cash flow.";
      default:
        return "Request-to-Pay in Monto are smart, trackable payment requests tied to invoices—helping teams sync data, track approvals, and manage payments in one place.";
    }
  };

  return (
    <>
      <PageHeader 
        title="Request-to-Pay" 
        subtitle={getSubtitle(activeTab)}
      />
      
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex justify-between items-center mb-6">
        <InvoiceFilters onFilterChange={onFilterChange} />
        <div className="flex items-center gap-3">
          <Button onClick={onPaymentSync} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Payment sync
          </Button>
          <InvoiceActions invoiceCount={invoiceCount} />
        </div>
      </div>
    </>
  );
}
