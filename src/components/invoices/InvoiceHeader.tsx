
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
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
  return (
    <>
      <PageHeader 
        title="RTPs" 
        subtitle="RTPs (Real-Time Payments) in Monto are smart, trackable payment requests that sync invoice data across portals, enabling teams to monitor, validate, and settle transactions in real time." 
      />
      
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
