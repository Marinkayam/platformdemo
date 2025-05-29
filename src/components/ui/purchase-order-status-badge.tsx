
import { cn } from "@/lib/utils";
import { PurchaseOrderStatus } from "@/types/purchaseOrder";

interface PurchaseOrderStatusBadgeProps {
  status: PurchaseOrderStatus;
  className?: string;
}

export function PurchaseOrderStatusBadge({ status, className }: PurchaseOrderStatusBadgeProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case "New":
        return "bg-gray-100 text-gray-600";
      case "Open":
        return "bg-blue-100 text-blue-600";
      case "Closed":
        return "bg-gray-100 text-gray-600";
      case "Partially Invoiced":
        return "bg-yellow-100 text-yellow-600";
      case "Fully Invoiced":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium whitespace-nowrap",
        getBadgeStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}
