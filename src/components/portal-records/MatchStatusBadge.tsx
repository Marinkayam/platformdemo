
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MatchStatusBadgeProps {
  status: string;
  className?: string;
}

export function MatchStatusBadge({ status, className }: MatchStatusBadgeProps) {
  const handleMockLink = (action: string) => {
    alert(`Mock link: ${action}`);
  };

  const getTooltipContent = (status: string) => {
    if (!status || status === "—") {
      return (
        <div className="text-center">
          <p>Match status unknown or unavailable</p>
        </div>
      );
    }
    
    switch (status.toLowerCase()) {
      case 'matched':
        return (
          <div className="space-y-2">
            <p className="font-medium">PO and Invoice successfully linked.</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">View:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMockLink("View Invoice")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔗 View Invoice
                </button>
                <button
                  onClick={() => handleMockLink("View PO")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔗 View PO
                </button>
              </div>
            </div>
          </div>
        );
      case 'unmatched':
        return (
          <div className="space-y-2">
            <p className="font-medium">No matching ERP record found for this invoice</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Actions:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMockLink("Manual Match")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔍 Manual Match
                </button>
                <button
                  onClick={() => handleMockLink("Create PO")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  ➕ Create PO
                </button>
              </div>
            </div>
          </div>
        );
      case 'conflicted':
        return (
          <div className="space-y-2">
            <p className="font-medium">Data conflict: Invoice and PO don't fully match.</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Actions:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMockLink("Review Invoice")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔍 Review Invoice
                </button>
                <button
                  onClick={() => handleMockLink("Fix Match")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🛠 Fix Match
                </button>
              </div>
            </div>
          </div>
        );
      case 'pending':
        return (
          <div className="text-center">
            <p>Match status is being processed</p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <p>Match status information</p>
          </div>
        );
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
            {getTooltipContent(status)}
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
          {getTooltipContent(status)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
