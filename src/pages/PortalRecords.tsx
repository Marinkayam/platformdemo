
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PortalRecordsHeader } from "@/components/portal-records/PortalRecordsHeader";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { portalRecordsData } from "@/data/portalRecords";
import { usePortalRecordFiltering } from "@/hooks/usePortalRecordFiltering";

export default function PortalRecords() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  
  // Set active tab based on URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    
    if (type === "primary") {
      setActiveTab("primary");
    } else if (type === "alternate") {
      setActiveTab("alternate");
    } else if (type === "unmatched") {
      setActiveTab("unmatched");
    } else if (type === "conflict") {
      setActiveTab("conflict");
    } else {
      setActiveTab("all");
    }
  }, [location.search]);
  
  // Use custom hook for filtering
  const { filters, setFilters, filteredPortalRecords } = usePortalRecordFiltering(portalRecordsData, activeTab);

  // Calculate counts for tabs
  const primaryCount = portalRecordsData.filter(record => record.type === "Primary").length;
  const alternateCount = portalRecordsData.filter(record => record.type === "Alternate").length;
  const unmatchedCount = portalRecordsData.filter(record => record.type === "Unmatched").length;
  const conflictCount = portalRecordsData.filter(record => record.type === "Conflict").length;
  
  const tabsWithCounts = [
    { id: "all", label: "All Records", count: portalRecordsData.length },
    { id: "primary", label: "Primary", count: primaryCount },
    { id: "alternate", label: "Alternate", count: alternateCount },
    { id: "unmatched", label: "Unmatched", count: unmatchedCount },
    { id: "conflict", label: "Conflict", count: conflictCount },
  ];

  return (
    <div>
      <PortalRecordsHeader 
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={setFilters}
        recordCount={filteredPortalRecords.length}
      />
      
      <PortalRecordsTable 
        portalRecords={filteredPortalRecords} 
      />
    </div>
  );
}
