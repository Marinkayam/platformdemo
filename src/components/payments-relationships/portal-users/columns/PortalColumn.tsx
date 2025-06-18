
import React from 'react';
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
      <span className="font-medium text-sm text-gray-700">{portal}</span>
    </div>
  );
}
