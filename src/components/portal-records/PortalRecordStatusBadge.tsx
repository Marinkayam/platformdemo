import { StatusBadge } from "@/components/ui/status-badge";

interface PortalRecordStatusBadgeProps {
  status: string;
  className?: string;
}

export function PortalRecordStatusBadge({ status, className }: PortalRecordStatusBadgeProps) {
  return (
    <StatusBadge status={status} className={className} />
  );
}
