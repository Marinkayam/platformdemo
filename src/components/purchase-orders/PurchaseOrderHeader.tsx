
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PurchaseOrderTabs } from "./PurchaseOrderTabs";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { PageHeader } from "@/components/common/PageHeader";

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
    <div className="mb-6 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Purchase Orders" 
          subtitle="View and manage purchase order records synced from portals" 
        />
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add PO
        </Button>
      </div>

      <PurchaseOrderTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <PurchaseOrderFilters onFilterChange={onFilterChange} />
    </div>
  );
}
