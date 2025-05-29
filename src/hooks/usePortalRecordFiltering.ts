
import { useState, useMemo } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordFilters, defaultPortalRecordFilters } from "@/components/portal-records/filters/types";

export function usePortalRecordFiltering(data: PortalRecord[], activeTab: string) {
  const [filters, setFilters] = useState<PortalRecordFilters>(defaultPortalRecordFilters);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = useMemo(() => {
    let filtered = [...data];

    // Filter by active tab (type)
    if (activeTab !== "all") {
      const typeMap: Record<string, string> = {
        "primary": "Primary",
        "alternate": "Alternate", 
        "unmatched": "Unmatched",
        "conflict": "Conflict"
      };
      
      if (typeMap[activeTab]) {
        filtered = filtered.filter(record => record.type === typeMap[activeTab]);
      }
    }

    // Apply portal filter
    if (filters.portal.length > 0) {
      filtered = filtered.filter(record => filters.portal.includes(record.portal));
    }

    // Apply buyer filter
    if (filters.buyer.length > 0) {
      filtered = filtered.filter(record => filters.buyer.includes(record.buyer));
    }

    // Apply status filter
    if (filters.status !== "All") {
      filtered = filtered.filter(record => record.status === filters.status);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.id.toLowerCase().includes(searchLower) ||
        record.portal.toLowerCase().includes(searchLower) ||
        record.buyer.toLowerCase().includes(searchLower) ||
        record.invoiceNumber.toLowerCase().includes(searchLower) ||
        record.poNumber.toLowerCase().includes(searchLower) ||
        record.supplierName.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [data, activeTab, filters, searchTerm]);

  const clearAllFilters = () => {
    setFilters(defaultPortalRecordFilters);
    setSearchTerm("");
  };

  return {
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearAllFilters
  };
}
