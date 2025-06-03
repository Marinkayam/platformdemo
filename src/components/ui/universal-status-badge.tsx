
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UniversalStatusBadgeProps {
  status: string;
  type?: "invoice" | "portal" | "purchase-order" | "smart-connection" | "auto";
  className?: string;
}

export function UniversalStatusBadge({ status, type = "auto", className }: UniversalStatusBadgeProps) {
  const getStatusStyles = (status: string, type: string) => {
    const lowerStatus = status.toLowerCase();
    
    // Auto-detect type if not specified
    if (type === "auto") {
      if (lowerStatus.includes("live") || lowerStatus.includes("connected")) {
        type = "smart-connection";
      } else if (lowerStatus.includes("invoiced") || lowerStatus.includes("new") && !lowerStatus.includes("rtp")) {
        type = "purchase-order";
      } else if (lowerStatus.includes("approved") || lowerStatus.includes("rejected") || lowerStatus.includes("pending") && !lowerStatus.includes("rtp")) {
        type = "portal";
      } else {
        type = "invoice";
      }
    }
    
    // Specific check for "Pending Action" - must be red
    if (lowerStatus === "pending action") {
      return "bg-red-100 text-red-600 border-red-200";
    }
    
    // Common success states
    if (lowerStatus.includes("paid") || lowerStatus.includes("settled") || lowerStatus.includes("live") || lowerStatus.includes("connected")) {
      return "bg-green-100 text-green-600 border-green-200";
    }
    
    // Common error/rejection states
    if (lowerStatus.includes("rejected") || lowerStatus.includes("error") || lowerStatus.includes("disconnected") || lowerStatus.includes("unavailable")) {
      return "bg-red-100 text-red-600 border-red-200";
    }
    
    // Common warning states (excluding "Pending Action")
    if (lowerStatus.includes("pending") || lowerStatus.includes("awaiting") || lowerStatus.includes("validating") || lowerStatus.includes("building")) {
      return "bg-yellow-100 text-yellow-600 border-yellow-200";
    }
    
    // Type-specific styling
    switch (type) {
      case "invoice":
        if (lowerStatus.includes("rtp prepared") || lowerStatus.includes("rtp sent")) {
          return "bg-violet-100 text-violet-600 border-violet-200";
        }
        if (lowerStatus.includes("approved")) {
          return "bg-orange-100 text-orange-600 border-orange-200";
        }
        if (lowerStatus.includes("external")) {
          return "bg-blue-100 text-blue-600 border-blue-200";
        }
        break;
        
      case "purchase-order":
        if (lowerStatus.includes("new")) {
          return "bg-purple-100 text-purple-600 border-purple-200";
        }
        if (lowerStatus.includes("fully invoiced")) {
          return "bg-green-100 text-green-600 border-green-200";
        }
        if (lowerStatus.includes("partially invoiced")) {
          return "bg-blue-100 text-blue-600 border-blue-200";
        }
        break;
        
      case "portal":
        if (lowerStatus.includes("approved")) {
          return "bg-green-100 text-green-600 border-green-200";
        }
        break;
        
      case "smart-connection":
        if (lowerStatus.includes("live")) {
          return "bg-green-100 text-green-600 border-green-200";
        }
        break;
    }
    
    // Default neutral state
    return "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getTooltipContent = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    switch (lowerStatus) {
      case "pending action":
        return "Invoice requires attention or action";
      case "paid":
        return "Invoice has been paid in full";
      case "settled":
        return "Payment has been settled";
      case "partially settled":
        return "Payment has been partially settled";
      case "rejected by buyer":
        return "Invoice was rejected by the buyer";
      case "rejected by monto":
        return "Invoice was rejected by Monto";
      case "approved by buyer":
        return "Invoice has been approved by the buyer";
      case "external submission":
        return "Invoice submitted through external system";
      case "rtp prepared":
        return "Real-time payment has been prepared";
      case "rtp sent":
        return "Real-time payment has been sent";
      case "awaiting sc":
        return "Awaiting smart connection";
      case "excluded":
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
              "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap border cursor-help",
              getStatusStyles(status, type),
              className
            )}
          >
            {status}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
