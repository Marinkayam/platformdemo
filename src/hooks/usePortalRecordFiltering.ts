
import { useState, useMemo } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordFilters, defaultPortalRecordFilters } from "@/components/portal-records/filters/types";

export function usePortalRecordFiltering(data: PortalRecord[], activeTab: string) {
  const [filters, setFilters] = useState<PortalRecordFilters>(defaultPortalRecordFilters);
  const [searchTerm, setSearchTerm] = useState("");

  const needsAttentionRecords = useMemo(() => {
    return data.filter(record => 
      record.connectionStatus === 'Disconnected' ||
      record.matchType === 'Conflict' ||
      record.matchType === 'Unmatched'
    );
  }, [data]);

  const filteredRecords = useMemo(() => {
    let filtered = [...data];

    // Filter by active tab (simplified to 3 tabs)
    if (activeTab !== "all") {
      if (activeTab === "unmatched") {
        filtered = filtered.filter(record => record.matchType === "Unmatched");
      } else if (activeTab === "conflict") {
        filtered = filtered.filter(record => record.matchType === "Conflict");
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

    // Apply record type filter (using matchType)
    if (filters.recordType.length > 0) {
      filtered = filtered.filter(record => filters.recordType.includes(record.matchType));
    }

    // Apply status filter (using portalStatus)
    if (filters.status !== "All") {
      filtered = filtered.filter(record => record.portalStatus === filters.status || filters.status === "All");
    }

    // Apply transaction type filter
    if (filters.transactionType !== "All") {
      filtered = filtered.filter(record => record.recordType === filters.transactionType || filters.transactionType === "All");
    }

    // Apply due date filter
    if (filters.dueDate.from || filters.dueDate.to) {
      filtered = filtered.filter(record => {
        if (!record.lastSynced || record.lastSynced === "—" || record.lastSynced === "In Progress") return true;
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
        record.portalRecordId.toLowerCase().includes(searchLower) ||
        record.portal.toLowerCase().includes(searchLower) ||
        record.buyer.toLowerCase().includes(searchLower) ||
        (record.invoiceNumber && record.invoiceNumber.toLowerCase().includes(searchLower)) ||
        record.poNumber.toLowerCase().includes(searchLower) ||
        record.supplierName.toLowerCase().includes(searchLower)
      );
    }

    // Sort filtered records to prioritize unmatched and conflict records
    return filtered.sort((a, b) => {
      const priorityOrder = { 'Unmatched': 0, 'Conflict': 1, 'Primary': 2, 'Alternate': 3 };
      const aPriority = priorityOrder[a.matchType] ?? 4;
      const bPriority = priorityOrder[b.matchType] ?? 4;
      return aPriority - bPriority;
    });
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
