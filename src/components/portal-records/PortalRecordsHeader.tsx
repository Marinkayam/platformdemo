
import { PageHeader } from "@/components/common/PageHeader";
import { createBreadcrumbs } from "@/components/common/Breadcrumb";
import { useLocation } from "react-router-dom";
import { PortalRecordsActions } from "./PortalRecordsActions";

interface PortalRecordsHeaderProps {
  recordCount: number;
  activeTab: string;
}

export function PortalRecordsHeader({
  recordCount,
  activeTab
}: PortalRecordsHeaderProps) {
  // Convert activeTab to status for breadcrumb
  let status: string | undefined;
  if (activeTab === 'unmatched') {
    status = 'unmatched';
  } else if (activeTab === 'conflict') {
    status = 'conflicts';
  }
  
  return (
    <div className="flex justify-between items-start mb-4">
      <PageHeader 
        title="Portal Records" 
        subtitle="Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history."
        breadcrumbs={createBreadcrumbs.portalRecords(status)}
      />
      <PortalRecordsActions recordCount={recordCount} />
    </div>
  );
}
