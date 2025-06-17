
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalColumnProps {
  portal: string;
}

export function PortalColumn({ portal }: PortalColumnProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={getPortalLogoUrl(portal)} alt={`${portal} logo`} className="w-full h-full object-contain" />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-medium cursor-help truncate max-w-[120px]">{portal}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{portal}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
