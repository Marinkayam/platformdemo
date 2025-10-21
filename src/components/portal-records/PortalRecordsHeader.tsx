
import { PageHeader } from "@/components/common/PageHeader";
import { createBreadcrumbs } from "@/components/common/Breadcrumb";
import { useLocation } from "react-router-dom";
import { PortalRecordsActions } from "./PortalRecordsActions";
import { PortalRecordsTabs } from "./PortalRecordsTabs";
import { PortalRecordsFilters } from "./PortalRecordsFilters";
import { PortalRecordFilters } from "./filters/types";
import { UnmatchedTaskCenter } from "./UnmatchedTaskCenter";
import { ConflictTaskCenter } from "./ConflictTaskCenter";
import { PaymentReportUploadWizard } from "@/components/workspace/integration-hub/payment-report-upload/PaymentReportUploadWizard";
import { useState } from "react";

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
  unmatchedCount?: number;
  conflictCount?: number;
}

export function PortalRecordsHeader({
  recordCount,
  activeTab,
  tabs,
  onTabChange,
  onFilterChange,
  needsAttentionCount,
  searchValue,
  onSearchChange,
  unmatchedCount = 0,
  conflictCount = 0
}: PortalRecordsHeaderProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Convert activeTab to status for breadcrumb
  let status: string | undefined;
  if (activeTab === 'unmatched') {
    status = 'unmatched';
  } else if (activeTab === 'conflict') {
    status = 'conflicts';
  }

  const handleUploadReport = () => {
    setIsUploadModalOpen(true);
  };

  const handleBulkReview = () => {
    // TODO: Implement bulk conflict resolution
    console.log('Bulk review conflicts');
  };

  return (
    <>
      <PageHeader
        title={
          activeTab === 'unmatched'
            ? 'Unmatched Portal Invoices'
            : activeTab === 'conflict'
              ? 'Conflicted Portal Invoices'
              : 'Portal Records'
        }
        subtitle={
          activeTab === 'unmatched'
            ? 'Review these records to keep your ERP in sync. Actions you take here affect Smart Connections and future matching.'
            : activeTab === 'conflict'
              ? 'Review these records to keep your ERP in sync. Actions you take here affect Smart Connections and future matching.'
              : 'Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history.'
        }
        breadcrumbs={createBreadcrumbs.portalRecords(status)}
      />

      {/* Show unified task center for unmatched tab */}
      {activeTab === 'unmatched' && (
        <UnmatchedTaskCenter
          unmatchedCount={unmatchedCount}
          onUploadReport={handleUploadReport}
        />
      )}

      {/* Show conflict task center for conflict tab */}
      {activeTab === 'conflict' && (
        <ConflictTaskCenter
          conflictCount={conflictCount}
          lastReviewDays={3}
        />
      )}

      <PortalRecordsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="space-y-4">

        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0 overflow-hidden">
            <PortalRecordsFilters
              onFilterChange={onFilterChange}
              needsAttentionCount={needsAttentionCount}
            />
          </div>
          <div className="flex-shrink-0">
            <PortalRecordsActions
              recordCount={recordCount}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              forceCompact={true}
            />
          </div>
        </div>
      </div>

      <PaymentReportUploadWizard
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}
