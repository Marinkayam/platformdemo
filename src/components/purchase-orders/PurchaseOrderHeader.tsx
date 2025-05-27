
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as FilterType } from "@/types/purchaseOrder";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor and track purchase orders discovered by Monto
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="relative">
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <PurchaseOrderFilters 
        onFilterChange={onFilterChange}
        purchaseOrderCount={purchaseOrderCount}
      />
    </div>
  );
}
