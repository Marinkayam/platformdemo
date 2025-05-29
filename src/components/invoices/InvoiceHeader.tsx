
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";
import { InvoiceActions } from "@/components/invoices/InvoiceActions";

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
  return (
    <>
      <div className="mb-4">
        <h1 className="text-[32px] font-semibold text-gray-900">RTP's</h1>
        <p className="text-[16px] text-gray-600 mt-1">Manage and track Real-Time Payment requests</p>
      </div>
      
      <InvoiceTabs
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
