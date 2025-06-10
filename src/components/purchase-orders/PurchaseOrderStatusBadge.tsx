import { StatusBadge } from "@/components/ui/status-badge";
import { PurchaseOrderStatus } from "@/types/purchaseOrder";

interface PurchaseOrderStatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

export function PurchaseOrderStatusBadge({ status, className }: PurchaseOrderStatusBadgeProps) {
  return (
    <StatusBadge status={status} className={className} />
  );
}
