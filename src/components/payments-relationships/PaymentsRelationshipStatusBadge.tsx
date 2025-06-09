import { cn } from "@/lib/utils";

interface PaymentsRelationshipStatusBadgeProps {
  status: string;
  className?: string;
}

export function PaymentsRelationshipStatusBadge({ status, className }: PaymentsRelationshipStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes("live")) {
      return "bg-green-100 text-green-600";
    }
    if (lowerStatus.includes("unavailable")) {
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
