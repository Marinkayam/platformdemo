
import { useState } from "react";
import { PortalRecordsHeader } from "@/components/portal-records/PortalRecordsHeader";
import { PortalRecordsFilters } from "@/components/portal-records/PortalRecordsFilters";
import { PortalRecordsTabs } from "@/components/portal-records/PortalRecordsTabs";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { usePortalRecordFiltering } from "@/hooks/usePortalRecordFiltering";
import { allPortalRecords } from "@/data/portalRecords";

export default function PortalRecords() {
  const [activeTab, setActiveTab] = useState("all");
  
  const {
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearAllFilters
  } = usePortalRecordFiltering(allPortalRecords, activeTab);

  // Calculate tab counts
  const tabCounts = {
    all: allPortalRecords.length,
    primary: allPortalRecords.filter(r => r.type === "Primary").length,
    alternate: allPortalRecords.filter(r => r.type === "Alternate").length,
    unmatched: allPortalRecords.filter(r => r.type === "Unmatched").length,
    conflict: allPortalRecords.filter(r => r.type === "Conflict").length,
  };

  const tabs = [
    { id: "all", label: "All Records", count: tabCounts.all },
    { id: "primary", label: "Primary", count: tabCounts.primary },
    { id: "alternate", label: "Alternate", count: tabCounts.alternate },
    { id: "unmatched", label: "Unmatched", count: tabCounts.unmatched },
    { id: "conflict", label: "Conflicts", count: tabCounts.conflict },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PortalRecordsHeader 
        recordCount={allPortalRecords.length}
      />
      
      <PortalRecordsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <PortalRecordsFilters
        onFilterChange={setFilters}
      />
      
      <PortalRecordsTable portalRecords={filteredRecords} />
    </div>
  );
}
