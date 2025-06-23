
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PortalRecord } from "@/types/portalRecord";

interface PortalStatusColumnProps {
  record: PortalRecord;
}

export function PortalStatusColumn({ record }: PortalStatusColumnProps) {
  if (record.connectionStatus === 'Disconnected') {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <StatusBadge status={record.portalStatus} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Portal Status: {record.portalStatus}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
