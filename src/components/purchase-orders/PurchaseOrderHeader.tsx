import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { PurchaseOrderFilters } from "./PurchaseOrderFilters";
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      
      <div className="border-b mb-6">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="flex space-x-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "py-3 px-1 relative font-medium text-sm",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <div className="flex items-center">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs",
                      activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                    )}>
                      {tab.count}
                    </span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-between items-center mb-6">
        <PurchaseOrderFilters onFilterChange={onFilterChange} />
      </div>
    </>
  );
} 