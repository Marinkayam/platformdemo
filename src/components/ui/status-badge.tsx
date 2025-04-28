
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
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Approved by Buyer":
        return "bg-[#E3F2FD] text-[#1976D2]";
      case "Paid":
        return "bg-[#E6F4EA] text-[#2E7D32]";
      case "External Submission":
        return "bg-[#E1F5FE] text-[#0288D1]";
      case "Settled":
        return "bg-[#F1F8E9] text-[#558B2F]";
      case "Awaiting SC":
        return "bg-[#F3E5F5] text-[#8E24AA]";
      case "Excluded":
        return "bg-[#ECEFF1] text-[#607D8B]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap",
        getBadgeStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}
