
import { InvoiceFilters as InvoiceFiltersType } from "./filters/types";
import { FilterControls } from "./filters/FilterControls";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { useInvoiceFiltersState } from "@/hooks/useInvoiceFiltersState";
import { Search, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  // Check if any filters are active
  const hasActiveFilters = 
    (Array.isArray(filters.status) && filters.status.length > 0) ||
    (Array.isArray(filters.buyer) && filters.buyer.length > 0) ||
    (Array.isArray(filters.portal) && filters.portal.length > 0) ||
    filters.transactionType !== "All" ||
    (Array.isArray(filters.owner) && filters.owner.length > 0) ||
    (Array.isArray(filters.source) && filters.source.length > 0) ||
    filters.dueDate.from !== "" ||
    filters.dueDate.to !== "" ||
    filters.search !== "";

  return (
    <div className="flex items-center gap-2">
      <FilterControls 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export type { InvoiceFiltersType };
