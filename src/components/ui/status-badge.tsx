
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case "Pending Action":
        return "bg-red-100 text-red-700";
      case "Approved by Buyer":
        return "bg-blue-100 text-blue-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      case "External Submission":
        return "bg-blue-100 text-blue-700";
      case "Settled":
        return "bg-green-100 text-green-700";
      case "Awaiting SC":
        return "bg-purple-100 text-purple-700";
      case "Excluded":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        getBadgeStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}
