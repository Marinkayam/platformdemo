
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";
import { UserX } from "lucide-react";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case "RTP Prepared":
        return "bg-violet-100 text-violet-600";
      case "Awaiting SC":
        return "bg-violet-100 text-violet-600";
      case "RTP Sent":
        return "bg-violet-100 text-violet-600";
      case "Pending Action":
        return "bg-red-100 text-red-600";
      case "Rejected by Buyer":
        return "bg-red-50 text-red-600";
      case "Rejected by Monto":
        return "bg-[#F3E8FF] text-[#9333EA]";
      case "Approved by Buyer":
        return "bg-orange-100 text-orange-600";
      case "External Submission":
        return "bg-blue-100 text-blue-600";
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Settled":
        return "bg-green-100 text-green-600";
      case "Partially Settled":
        return "bg-green-100 text-green-600";
      case "Excluded":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const isRejectedByBuyer = status === "Rejected by Buyer";
  const isRejectedByMonto = status === "Rejected by Monto";
  const showRejectionIcon = isRejectedByBuyer || isRejectedByMonto;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        getBadgeStyles(),
        className
      )}
    >
      {showRejectionIcon && <UserX className="h-3.5 w-3.5 mr-1.5" />}
      {isRejectedByMonto 
        ? "Monto" 
        : isRejectedByBuyer 
          ? "Buyer" 
          : status}
    </span>
  );
}
