
import { InvoiceFilters as InvoiceFiltersType } from "./filters/types";
import { FilterControls } from "./filters/FilterControls";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { SearchSection } from "./filters/SearchSection";
import { useInvoiceFiltersState } from "@/hooks/useInvoiceFiltersState";

interface InvoiceFiltersProps {
  onFilterChange: (filters: InvoiceFiltersType) => void;
}

export function InvoiceFilters({ onFilterChange }: InvoiceFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleRemoveFilter,
    handleResetFilters
  } = useInvoiceFiltersState(onFilterChange);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterControls 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <SearchSection
          searchTerm={filters.search}
          onSearchChange={(value) => handleFilterChange("search", value)}
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

export type { InvoiceFiltersType };
