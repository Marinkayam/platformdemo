import { cn } from "@/lib/utils";

interface AgentStatusBadgeProps {
  status: "Connected" | "Disconnected" | "Error" | "Validating" | "Building";
  className?: string;
}

export function AgentStatusBadge({ status, className }: AgentStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-700 border-green-200";
      case "Disconnected":
        return "bg-red-100 text-red-700 border-red-200";
      case "Error":
        return "bg-red-100 text-red-700 border-red-200";
      case "Validating":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Building":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap border",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}
