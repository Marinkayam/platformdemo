
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PortalRecordsHeader } from "@/components/portal-records/PortalRecordsHeader";
import { PortalRecordsFilters } from "@/components/portal-records/PortalRecordsFilters";
import { PortalRecordsTabs } from "@/components/portal-records/PortalRecordsTabs";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { usePortalRecordFiltering } from "@/hooks/usePortalRecordFiltering";
import { allPortalRecords } from "@/data/portalRecords";

export default function PortalRecords() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  
  // Set active tab based on URL parameter
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'unmatched') {
      setActiveTab('unmatched');
    } else if (status === 'conflicts') {
      setActiveTab('conflict');
    } else {
      setActiveTab('all');
    }
  }, [searchParams]);
  
  const {
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearAllFilters,
    needsAttentionCount
  } = usePortalRecordFiltering(allPortalRecords, activeTab);

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Calculate tab counts with new filtering logic
  const tabCounts = {
    all: allPortalRecords.filter(r => r.matchType === "Primary" || r.matchType === "Alternate").length,
    unmatched: allPortalRecords.filter(r => r.matchType === "Unmatched").length,
    conflict: allPortalRecords.filter(r => r.matchType === "Conflict").length,
  };

  const tabs = [
    { id: "all", label: "All Records", count: tabCounts.all },
    { id: "unmatched", label: "Found Without Match", count: tabCounts.unmatched },
    { id: "conflict", label: "Conflicts", count: tabCounts.conflict },
  ];

  return (
    <div className="space-y-6">
      <PortalRecordsHeader
        recordCount={allPortalRecords.length}
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        needsAttentionCount={needsAttentionCount}
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        unmatchedCount={tabCounts.unmatched}
      />
      
      <PortalRecordsTable records={filteredRecords} activeTab={activeTab} />
    </div>
  );
}
