
import { cn } from "@/lib/utils";

interface PurchaseOrderStatusBadgeProps {
  status: string;
  className?: string;
}

export function PurchaseOrderStatusBadge({ status, className }: PurchaseOrderStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes("new")) {
      return "bg-purple-100 text-purple-600";
    }
    if (lowerStatus.includes("fully invoiced")) {
      return "bg-green-100 text-green-600";
    }
    if (lowerStatus.includes("partially invoiced")) {
      return "bg-blue-100 text-blue-600";
    }
    
    return "bg-gray-100 text-gray-600";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  );
}
