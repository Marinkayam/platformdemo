
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectionStatusBadgeProps {
  status: string;
  className?: string;
}

export function ConnectionStatusBadge({ status, className }: ConnectionStatusBadgeProps) {
  const handleMockLink = (action: string) => {
    alert(`Mock link: ${action}`);
  };

  const getTooltipContent = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return "Portal is connected and syncing successfully";
      case 'disconnected':
        return "Portal connection failed - check credentials";
      case 'syncing':
        return "Currently syncing data from portal";
      case 'in progress':
        return "Sync operation in progress";
      case 'partial':
        return "Only some records syncing - review needed";
      default:
        return "Connection status information";
    }
  };

  const getDisplayText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return "Connected";
      case 'disconnected':
        return "Disconnected";
      case 'syncing':
        return "Syncing";
      case 'in progress':
        return "In Progress";
      case 'partial':
        return "Partial";
      default:
        return status;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <StatusBadge status={getDisplayText(status)} className={className} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipContent(status)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
