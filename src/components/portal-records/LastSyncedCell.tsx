
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LastSyncedCellProps {
  lastSynced: string;
  className?: string;
}

export function LastSyncedCell({ lastSynced, className }: LastSyncedCellProps) {
  const getTooltipContent = (lastSynced: string) => {
    if (lastSynced === "—" || lastSynced === "In Progress") {
      return "No sync data available";
    }
    
    // Convert the display format to a more detailed tooltip
    if (lastSynced.includes("Jun 15, 2025")) {
      return `Last synced from portal at: Sunday, ${lastSynced}`;
    }
    
    return `Last synced: ${lastSynced}`;
  };

  const getDisplayText = (lastSynced: string) => {
    if (lastSynced === "In Progress") {
      return "⏳ In Progress";
    }
    return lastSynced;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`text-right cursor-help ${className}`}>
            {getDisplayText(lastSynced)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent(lastSynced)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
