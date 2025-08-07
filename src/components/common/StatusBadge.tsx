import { cn } from "@/lib/utils";
import { PurchaseOrderStatus } from "@/types/purchase-orders";

interface StatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

const statusConfig: Record<PurchaseOrderStatus, { label: string; textColor: string; bgColor: string }> = {
  new: { label: "New", textColor: "#7B59FF", bgColor: "#F3E8FF" },
  pending_approval: { label: "Pending Approval", textColor: "#F2AE40", bgColor: "#FFF8E1" },
  approved: { label: "Approved", textColor: "#007737", bgColor: "#E6F4EA" },
  rejected: { label: "Rejected", textColor: "#DF1C41", bgColor: "#FFEBEE" },
  cancelled: { label: "Cancelled", textColor: "#9CA3AF", bgColor: "#F3F4F6" },
  completed: { label: "Completed", textColor: "#7B59FF", bgColor: "#F3E8FF" },
  New: { label: "New", textColor: "#7B59FF", bgColor: "#F3E8FF" },
  "Partially Invoiced": { label: "Partially Invoiced", textColor: "#007737", bgColor: "#E6F4EA" },
  "Fully Invoiced": { label: "Fully Invoiced", textColor: "#007737", bgColor: "#E6F4EA" }
};

const DEFAULT_CONFIG = { label: "Unknown", textColor: "#9CA3AF", bgColor: "#F3F4F6" };

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || DEFAULT_CONFIG;

  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0",
        className
      )}
      style={{
        color: config.textColor,
        backgroundColor: config.bgColor,
        fontSize: '12px'
      }}
    >
      {config.label}
    </span>
  );
}