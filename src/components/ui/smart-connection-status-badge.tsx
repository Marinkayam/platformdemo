
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SmartConnectionStatusBadgeProps {
  status: "Live" | "In Process" | "Unavailable" | "Disconnected" | "Inactive";
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
        return "bg-red-100 text-red-700 border-red-200";
      case "Disconnected":
        return "bg-red-100 text-red-700 border-red-200";
      case "Inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTooltipText = () => {
    switch (status) {
      case "Live":
        return "All agents are connected and operating smoothly. No action needed — this connection is working as expected.";
      case "In Process":
        return "This connection is still being set up. Agents are building or validating instructions in the background.";
      case "Unavailable":
        return "One or more agents are disconnected. Credentials may be outdated or missing — please review to restore connection.";
      case "Inactive":
        return "This Smart Connection was manually turned off. No activity will occur until reactivated.";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium whitespace-nowrap cursor-help border",
              getStatusStyles(),
              className
            )}
          >
            {status}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-white border shadow-lg z-50">
          <p className="text-sm">{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
