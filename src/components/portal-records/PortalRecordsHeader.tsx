
import { PageHeader } from "@/components/common/PageHeader";
import { createBreadcrumbs } from "@/components/common/Breadcrumb";
import { useLocation } from "react-router-dom";
import { PortalRecordsActions } from "./PortalRecordsActions";

interface PortalRecordsHeaderProps {
  recordCount: number;
}

export function PortalRecordsHeader({
  recordCount
}: PortalRecordsHeaderProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  
  return (
    <div className="flex justify-between items-start mb-4">
      <PageHeader 
        title="Portal Records" 
        subtitle="Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history."
        breadcrumbs={createBreadcrumbs.portalRecords(status || undefined)}
      />
      <PortalRecordsActions recordCount={recordCount} />
    </div>
  );
}
