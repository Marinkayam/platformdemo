
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AgentUserTypeBadgeProps {
  type: "Monto" | "Regular";
  className?: string;
}

export function AgentUserTypeBadge({ type, className }: AgentUserTypeBadgeProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "Monto":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Regular":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getDisplayText = () => {
    switch (type) {
      case "Monto":
        return "Dedicated Monto User";
      case "Regular":
        return "Regular User";
      default:
        return "Regular User";
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
