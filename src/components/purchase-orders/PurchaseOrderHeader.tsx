
import { PurchaseOrderTabs } from "./PurchaseOrderTabs";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as FilterType } from "./filters/types";
import { PurchaseOrderActions } from "./PurchaseOrderActions";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface PurchaseOrderHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFilterChange: (filters: FilterType) => void;
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
      <h1 className="text-[32px] font-semibold text-gray-900 mb-4">Purchase Orders</h1>
      
      <PurchaseOrderTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex justify-between items-center mb-6">
        <PurchaseOrderFilters onFilterChange={onFilterChange} />
        <PurchaseOrderActions purchaseOrderCount={purchaseOrderCount} />
      </div>
    </>
  );
}
