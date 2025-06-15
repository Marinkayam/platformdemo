
import { StatusBadge } from "@/components/common/StatusBadge";
import { PurchaseOrderStatus } from "@/types/purchase-orders";

interface PurchaseOrderStatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

export function PurchaseOrderStatusBadge({ status, className }: PurchaseOrderStatusBadgeProps) {
  return (
    <StatusBadge status={status} className={className} />
  );
}
