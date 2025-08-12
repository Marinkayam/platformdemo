
import { InvoiceFilters as InvoiceFiltersType } from "./filters/types";
import { FilterControls } from "./filters/FilterControls";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { useInvoiceFiltersState } from "@/hooks/useInvoiceFiltersState";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <FilterControls 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-9 pr-4 h-9 border rounded-md w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[260px] transition-all duration-300 ease-in-out text-[14px]"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 flex items-center gap-1"
            onClick={handleResetFilters}
          >
            <RefreshCw className="h-3 w-3" />
            <span className="text-[14px]">Reset</span>
          </Button>
        )}
      </div>
      
      <ActiveFiltersList 
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  );
}

export type { InvoiceFiltersType };
