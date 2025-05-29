
import { cn } from "@/lib/utils";

interface PortalRecordStatusBadgeProps {
  status: string;
  className?: string;
}

export function PortalRecordStatusBadge({ status, className }: PortalRecordStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes("approved")) {
      return "bg-green-100 text-green-600";
    }
    if (lowerStatus.includes("paid") || lowerStatus.includes("settled")) {
      return "bg-green-100 text-green-600";
    }
    if (lowerStatus.includes("rejected")) {
      return "bg-red-100 text-red-600";
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
