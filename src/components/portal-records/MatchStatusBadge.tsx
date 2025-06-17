
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MatchStatusBadgeProps {
  status: string;
  className?: string;
}

export function MatchStatusBadge({ status, className }: MatchStatusBadgeProps) {
  const getTooltipContent = (status: string) => {
    if (!status || status === "—") return "Match status unknown or unavailable";
    
    switch (status.toLowerCase()) {
      case 'matched':
        return "Invoice successfully matched with ERP records";
      case 'unmatched':
        return "No matching ERP record found for this invoice";
      case 'conflicted':
        return "This invoice matches multiple ERP records. Review needed.";
      case 'pending':
        return "Match status is being processed";
      default:
        return "Match status information";
    }
  };

  const getDisplayText = (status: string) => {
    if (!status || status === "—") return "—";
    
    switch (status.toLowerCase()) {
      case 'matched':
        return "Matched";
      case 'unmatched':
        return "Unmatched";
      case 'conflicted':
        return "Conflicted";
      case 'pending':
        return "Pending";
      default:
        return status;
    }
  };

  const displayText = getDisplayText(status);

  // For "—" status, show as plain text instead of badge
  if (displayText === "—") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-400 cursor-help">—</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getTooltipContent(status)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <StatusBadge status={displayText} className={className} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
