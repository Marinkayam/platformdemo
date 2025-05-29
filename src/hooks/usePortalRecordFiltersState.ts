
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

  return {
    filters,
    handleFilterChange,
    handleSearchChange
  };
}
