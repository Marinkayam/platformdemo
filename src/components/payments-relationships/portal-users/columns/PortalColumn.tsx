
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
            <div className="bg-[#F3F3F9] px-3 py-1 rounded-full border border-[#E5E7EB]">
              <span className="font-medium text-sm text-gray-700 cursor-help">{portal}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{portal}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
