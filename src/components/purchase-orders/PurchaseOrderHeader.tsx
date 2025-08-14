
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { createBreadcrumbs } from "@/components/common/Breadcrumb";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { TabsNav } from "@/components/common/TabsNav";
import { PurchaseOrderActions } from "./PurchaseOrderActions";

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function PurchaseOrderHeader({
  tabs,
  activeTab,
  onTabChange,
  onFilterChange,
  purchaseOrderCount,
  searchValue,
  onSearchChange
}: PurchaseOrderHeaderProps) {
  return (
    <>
      <PageHeader 
        title="Purchase Orders" 
        subtitle="View and manage purchase order records synced from portals" 
        breadcrumbs={createBreadcrumbs.purchaseOrders()}
      />
      
      <TabsNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <PurchaseOrderFilters onFilterChange={onFilterChange} />
          <PurchaseOrderActions 
            purchaseOrderCount={purchaseOrderCount}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
        </div>
      </div>
    </>
  );
}
