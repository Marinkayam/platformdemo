
import { PageHeader } from "@/components/common/PageHeader";
import { createBreadcrumbs } from "@/components/common/Breadcrumb";
import { useLocation } from "react-router-dom";
import { PortalRecordsActions } from "./PortalRecordsActions";
import { PortalRecordsTabs } from "./PortalRecordsTabs";
import { PortalRecordsFilters } from "./PortalRecordsFilters";
import { PortalRecordFilters } from "./filters/types";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface PortalRecordsHeaderProps {
  recordCount: number;
  activeTab: string;
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  onFilterChange: (filters: PortalRecordFilters) => void;
  needsAttentionCount: number;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function PortalRecordsHeader({
  recordCount,
  activeTab,
  tabs,
  onTabChange,
  onFilterChange,
  needsAttentionCount,
  searchValue,
  onSearchChange
}: PortalRecordsHeaderProps) {
  // Convert activeTab to status for breadcrumb
  let status: string | undefined;
  if (activeTab === 'unmatched') {
    status = 'unmatched';
  } else if (activeTab === 'conflict') {
    status = 'conflicts';
  }
  
  return (
    <>
      <PageHeader 
        title="Portal Records" 
        subtitle="Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history."
        breadcrumbs={createBreadcrumbs.portalRecords(status)}
      />
      
      <PortalRecordsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <PortalRecordsFilters
            onFilterChange={onFilterChange}
            needsAttentionCount={needsAttentionCount}
          />
          <PortalRecordsActions 
            recordCount={recordCount}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
        </div>
      </div>
    </>
  );
}
