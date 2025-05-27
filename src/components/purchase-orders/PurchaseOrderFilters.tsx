
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { FilterControls } from "./filters/FilterControls";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { SearchSection } from "./filters/SearchSection";
import { usePurchaseOrderFiltersState } from "@/hooks/usePurchaseOrderFiltersState";

interface PurchaseOrderFiltersProps {
  onFilterChange: (filters: PurchaseOrderFiltersType) => void;
}

export function PurchaseOrderFilters({ onFilterChange }: PurchaseOrderFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleRemoveFilter,
    handleResetFilters
  } = usePurchaseOrderFiltersState(onFilterChange);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterControls 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <SearchSection
          searchTerm={filters.poNumber}
          onSearchChange={(value) => handleFilterChange("poNumber", value)}
          onResetFilters={handleResetFilters}
        />
      </div>
      
      <ActiveFiltersList 
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  );
}

export type { PurchaseOrderFiltersType };
