
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SmartConnectionStatusBadgeProps {
  status: "Live" | "In Process" | "Unavailable" | "Disconnected";
  className?: string;
}

export function SmartConnectionStatusBadge({ status, className }: SmartConnectionStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Process":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Unavailable":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Disconnected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
