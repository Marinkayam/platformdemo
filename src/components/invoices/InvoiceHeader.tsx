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
  return (
    <>
      <PageHeader 
        title="RTPs" 
        subtitle="RTPs (Request to Pay) in Monto are smart, trackable payment requests linked to invoices. They allow teams to sync data across portals, monitor approval status, and streamline the payment process — all in one place." 
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
