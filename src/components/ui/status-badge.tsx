
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
  dueDate?: string;
}

export function StatusBadge({ status, className, dueDate }: StatusBadgeProps) {
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
        return "bg-red-100 text-red-600";
      case "Rejected by Monto":
        return "bg-purple-100 text-purple-600";
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

  const getTooltipContent = () => {
    switch (status) {
      case "Paid":
        return "Invoice has been paid in full";
      case "Pending Action":
        return "Invoice requires attention or action";
      case "Settled":
        return "Payment has been settled";
      case "Rejected by Buyer":
        return "Invoice was rejected by the buyer";
      case "Rejected by Monto":
        return "Invoice was rejected by Monto";
      case "Approved by Buyer":
        return "Invoice has been approved by the buyer";
      case "External Submission":
        return "Invoice submitted through external system";
      case "RTP Prepared":
        return "Real-time payment has been prepared";
      case "RTP Sent":
        return "Real-time payment has been sent";
      case "Awaiting SC":
        return "Awaiting smart connection";
      case "Excluded":
        return "Invoice has been excluded from processing";
      default:
        return `Status: ${status}`;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-help",
              getBadgeStyles(),
              className
            )}
          >
            {status}
          </span>
        </TooltipTrigger>
        <TooltipContent className="rounded-md">
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
