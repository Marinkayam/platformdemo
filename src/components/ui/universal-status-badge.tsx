
import { cn } from "@/lib/utils";

interface UniversalStatusBadgeProps {
  status: string;
  type?: "success" | "pending" | "error" | "neutral";
  className?: string;
}

export function UniversalStatusBadge({ status, type, className }: UniversalStatusBadgeProps) {
  const getStatusType = (status: string): "success" | "pending" | "error" | "neutral" => {
    if (type) return type;
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes("approved") || lowerStatus.includes("success") || lowerStatus.includes("paid") || lowerStatus.includes("settled") || lowerStatus.includes("live") || lowerStatus.includes("connected")) {
      return "success";
    }
    if (lowerStatus.includes("pending") || lowerStatus.includes("awaiting") || lowerStatus.includes("process") || lowerStatus.includes("building") || lowerStatus.includes("validating")) {
      return "pending";
    }
    if (lowerStatus.includes("rejected") || lowerStatus.includes("error") || lowerStatus.includes("failed") || lowerStatus.includes("disconnected") || lowerStatus.includes("unavailable")) {
      return "error";
    }
    return "neutral";
  };

  const getStatusStyles = (statusType: "success" | "pending" | "error" | "neutral") => {
    switch (statusType) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "neutral":
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const statusType = getStatusType(status);

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        getStatusStyles(statusType),
        className
      )}
    >
      {status}
    </span>
  );
}
