
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectionStatusBadgeProps {
  status: string;
  className?: string;
}

export function ConnectionStatusBadge({ status, className }: ConnectionStatusBadgeProps) {
  const getTooltipContent = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return "Monto successfully syncing this portal";
      case 'disconnected':
        return "User login failed. Update credentials to resume sync.";
      case 'syncing':
        return "Currently syncing data from portal";
      case 'partial':
        return "Only some records syncing — review details";
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
          <p>{getTooltipContent(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
