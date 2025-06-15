import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { TabsNav } from "@/components/common/TabsNav";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface PurchaseOrderHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onFilterChange: (filters: PurchaseOrderFiltersType) => void;
  purchaseOrderCount: number;
}

export function PurchaseOrderHeader({
  tabs,
  activeTab,
  onTabChange,
  onFilterChange,
  purchaseOrderCount
}: PurchaseOrderHeaderProps) {
  return (
    <>
      <PageHeader 
        title="Purchase Orders" 
        subtitle="View and manage purchase order records synced from portals" 
      />
      
      <TabsNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      <div className="flex justify-between items-center mb-6">
        <PurchaseOrderFilters onFilterChange={onFilterChange} />
      </div>
    </>
  );
} 