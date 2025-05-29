
import { cn } from "@/lib/utils";

interface UniversalStatusBadgeProps {
  status: string;
  type?: "success" | "pending" | "error" | "neutral";
  className?: string;
}

export function UniversalStatusBadge({ status, className }: UniversalStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    // Use original specific color tokens from StatusBadge
    if (lowerStatus.includes("rtp prepared") || lowerStatus.includes("awaiting sc") || lowerStatus.includes("rtp sent")) {
      return "bg-violet-100 text-violet-600";
    }
    if (lowerStatus.includes("approved")) {
      return "bg-orange-100 text-orange-600";
    }
    if (lowerStatus.includes("rejected by monto")) {
      return "bg-purple-100 text-purple-600";
    }
    if (lowerStatus.includes("rejected by buyer") || lowerStatus.includes("pending action")) {
      return "bg-red-100 text-red-600";
    }
    if (lowerStatus.includes("paid") || lowerStatus.includes("settled")) {
      return "bg-green-100 text-green-600";
    }
    if (lowerStatus.includes("external submission")) {
      return "bg-blue-100 text-blue-600";
    }
    if (lowerStatus.includes("pending") || lowerStatus.includes("awaiting") || lowerStatus.includes("process")) {
      return "bg-yellow-100 text-yellow-600";
    }
    
    return "bg-gray-100 text-gray-600";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium whitespace-nowrap",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  );
}
