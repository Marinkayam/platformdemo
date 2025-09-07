import { cn } from "@/lib/utils";
import { PurchaseOrderStatus } from "@/types/purchase-orders";
import { BADGE_COLORS, getStatusColor } from "@/lib/badge-colors";

interface StatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

const statusMapping: Record<PurchaseOrderStatus, string> = {
  new: "new",
  pending_approval: "pending approval", 
  approved: "approved by buyer",
  rejected: "rejected by buyer",
  cancelled: "excluded",
  completed: "settled",
  New: "new",
  "Partially Invoiced": "partially invoiced",
  "Fully Invoiced": "fully invoiced"
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const mappedStatus = statusMapping[status] || status;
  const colors = getStatusColor(mappedStatus);
  
  // Get display label from original status
  const getDisplayLabel = (status: PurchaseOrderStatus): string => {
    const labelMap: Record<PurchaseOrderStatus, string> = {
      new: "New",
      pending_approval: "Pending Approval", 
      approved: "Approved",
      rejected: "Rejected",
      cancelled: "Cancelled",
      completed: "Completed",
      New: "New",
      "Partially Invoiced": "Partially Invoiced",
      "Fully Invoiced": "Fully Invoiced"
    };
    return labelMap[status] || String(status);
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0",
        className
      )}
      style={{
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: '12px'
      }}
    >
      {getDisplayLabel(status)}
    </span>
  );
}