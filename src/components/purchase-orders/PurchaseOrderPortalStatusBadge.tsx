import { cn } from "@/lib/utils";
import { PortalStatus } from "@/types/purchase-orders";

interface PurchaseOrderPortalStatusBadgeProps {
  status: PortalStatus;
  className?: string;
}

const portalStatusColors = {
  Connected: {
    text: '#007737',
    background: '#E6F4EA'
  },
  Disconnected: {
    text: '#DF1C41',
    background: '#FFEBEE'
  },
  Syncing: {
    text: '#D48806',
    background: '#FFF8E1'
  },
  Error: {
    text: '#FF5722',
    background: '#FFEBEE'
  },
  Pending: {
    text: '#9CA3AF',
    background: '#F3F4F6'
  }
} as const;

export function PurchaseOrderPortalStatusBadge({ status, className }: PurchaseOrderPortalStatusBadgeProps) {
  const colors = portalStatusColors[status];
  
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
      {status}
    </span>
  );
}