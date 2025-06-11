import { cn } from "@/lib/utils";
import { PurchaseOrderStatus } from "@/types/purchase-orders";

interface StatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

const statusConfig: Record<PurchaseOrderStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  pending_approval: { label: "Pending Approval", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
  completed: { label: "Completed", color: "bg-purple-100 text-purple-800" },
  New: { label: "New", color: "bg-blue-50 text-blue-600" },
  "Partially Invoiced": { label: "Partially Invoiced", color: "bg-orange-100 text-orange-800" },
  "Fully Invoiced": { label: "Fully Invoiced", color: "bg-green-50 text-green-700" }
};

const DEFAULT_CONFIG = { label: "Unknown", color: "bg-gray-200 text-gray-600" };

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || DEFAULT_CONFIG;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
} 