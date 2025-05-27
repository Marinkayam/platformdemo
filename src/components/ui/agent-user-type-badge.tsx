
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AgentUserTypeBadgeProps {
  type: "Monto" | "External";
  className?: string;
}

export function AgentUserTypeBadge({ type, className }: AgentUserTypeBadgeProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "Monto":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "External":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getDisplayText = () => {
    switch (type) {
      case "Monto":
        return "Monto User";
      case "External":
        return "Customer User";
      default:
        return "Customer User";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full border",
        getTypeStyles(),
        className
      )}
    >
      {getDisplayText()}
    </Badge>
  );
}
