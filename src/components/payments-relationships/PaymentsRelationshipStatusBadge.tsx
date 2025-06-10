import { StatusBadge } from "@/components/ui/status-badge";

interface PaymentsRelationshipStatusBadgeProps {
  status: "Live" | "In Process" | "Unavailable" | "Disconnected" | "Inactive";
  className?: string;
}

export function PaymentsRelationshipStatusBadge({ status, className }: PaymentsRelationshipStatusBadgeProps) {
  return (
    <StatusBadge status={status} className={className} />
  );
}
