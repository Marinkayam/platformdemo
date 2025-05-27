
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AgentStatusBadgeProps {
  status: "Connected" | "Disconnected" | "Error" | "Validating" | "Building";
  className?: string;
}

export function AgentStatusBadge({ status, className }: AgentStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Connected":
        return "bg-green-50 text-green-700 border-green-200";
      case "Disconnected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Error":
        return "bg-red-50 text-red-700 border-red-200";
      case "Validating":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Building":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
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
