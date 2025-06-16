
import { useState, useCallback } from "react";
import { PortalRecordFilters, defaultPortalRecordFilters } from "@/components/portal-records/filters/types";

export function usePortalRecordFiltersState(onFilterChange: (filters: PortalRecordFilters) => void) {
  const [filters, setFilters] = useState<PortalRecordFilters>(defaultPortalRecordFilters);

  const handleFilterChange = useCallback((key: keyof PortalRecordFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleSearchChange = useCallback((value: string) => {
    handleFilterChange("search", value);
  }, [handleFilterChange]);

  const handleRemoveFilter = useCallback((key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (key.startsWith("portal-")) {
      newFilters.portal = newFilters.portal.filter(p => p !== value);
    } else if (key.startsWith("buyer-")) {
      newFilters.buyer = newFilters.buyer.filter(b => b !== value);
    } else if (key === "status") {
      newFilters.status = "All";
    } else if (key === "type") {
      newFilters.type = "All";
    } else if (key === "search") {
      newFilters.search = "";
    } else if (key === "needsAttention") {
      newFilters.needsAttention = false;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultPortalRecordFilters);
    onFilterChange(defaultPortalRecordFilters);
  }, [onFilterChange]);

  return {
    filters,
    handleFilterChange,
    handleSearchChange,
    handleRemoveFilter,
    handleResetFilters
  };
}
