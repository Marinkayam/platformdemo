
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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function InvoiceHeader({ 
  tabs, 
  activeTab, 
  onTabChange,
  onFilterChange,
  invoiceCount,
  onPaymentSync,
  searchValue,
  onSearchChange
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
    <div className="w-full max-w-[1350px]">
      <div className="mb-6">
        <div className="flex items-start mb-2 gap-8">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Request-to-Pay</h1>
          </div>
          <div className="flex-shrink-0">
            <Button onClick={onPaymentSync} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Payment sync
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 max-w-3xl">
          {getSubtitle(activeTab)}
        </p>
      </div>
      
      <TabsNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex items-center justify-between gap-4">
        <InvoiceFilters onFilterChange={onFilterChange} />
        <InvoiceActions 
          invoiceCount={invoiceCount}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  );
}
