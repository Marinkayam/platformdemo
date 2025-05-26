
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SmartConnectionStatusBadgeProps {
  status: "Live" | "In Process" | "Unavailable" | "Disconnected" | "Inactive";
  className?: string;
}

export function SmartConnectionStatusBadge({ status, className }: SmartConnectionStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Live":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Process":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Unavailable":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Disconnected":
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full border",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </Badge>
  );
}
