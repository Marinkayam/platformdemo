
import { useState, useMemo } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordFilters, defaultPortalRecordFilters } from "@/components/portal-records/filters/types";

export function usePortalRecordFiltering(data: PortalRecord[], activeTab: string) {
  const [filters, setFilters] = useState<PortalRecordFilters>(defaultPortalRecordFilters);
  const [searchTerm, setSearchTerm] = useState("");

  const needsAttentionRecords = useMemo(() => {
    return data.filter(record => 
      record.connectionStatus === 'Disconnected' ||
      record.type === 'Conflict' ||
      record.type === 'Unmatched'
    );
  }, [data]);

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

    // Apply record type filter
    if (filters.recordType.length > 0) {
      filtered = filtered.filter(record => record.type && filters.recordType.includes(record.type));
    }

    // Apply status filter
    if (filters.status !== "All") {
      filtered = filtered.filter(record => record.status === filters.status);
    }

    // Apply transaction type filter
    if (filters.transactionType !== "All") {
      // Note: This assumes we add transactionType field to PortalRecord type
      filtered = filtered.filter(record => record.recordType === filters.transactionType || filters.transactionType === "All");
    }

    // Apply due date filter
    if (filters.dueDate.from || filters.dueDate.to) {
      filtered = filtered.filter(record => {
        if (!record.lastSynced) return true;
        const recordDate = new Date(record.lastSynced);
        const fromDate = filters.dueDate.from ? new Date(filters.dueDate.from) : null;
        const toDate = filters.dueDate.to ? new Date(filters.dueDate.to) : null;
        
        if (fromDate && recordDate < fromDate) return false;
        if (toDate && recordDate > toDate) return false;
        return true;
      });
    }

    // Apply search filter
    if (filters.search || searchTerm) {
      const searchValue = filters.search || searchTerm;
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(record =>
        record.id.toLowerCase().includes(searchLower) ||
        record.portal.toLowerCase().includes(searchLower) ||
        record.buyer.toLowerCase().includes(searchLower) ||
        record.invoiceNumber.toLowerCase().includes(searchLower) ||
        record.poNumber.toLowerCase().includes(searchLower) ||
        (record.supplierName && record.supplierName.toLowerCase().includes(searchLower))
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
    clearAllFilters,
    needsAttentionCount: needsAttentionRecords.length
  };
}
