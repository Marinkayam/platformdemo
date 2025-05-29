
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

  return (
    <div className="space-y-6 animate-fade-in">
      <PortalRecordsHeader 
        recordCount={allPortalRecords.length}
        filteredCount={filteredRecords.length}
      />
      
      <PortalRecordsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAllFilters}
        recordCount={filteredRecords.length}
      />
      
      <PortalRecordsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        allCount={allPortalRecords.length}
        filteredCount={filteredRecords.length}
      />
      
      <PortalRecordsTable portalRecords={filteredRecords} />
    </div>
  );
}
