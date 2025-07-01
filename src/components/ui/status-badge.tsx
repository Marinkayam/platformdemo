
import React from 'react';
import { getStatusColor } from '@/lib/badge-colors';
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getRTPStatusTooltip } from "@/lib/rtp-status-tooltips";

interface StatusBadgeProps {
  status: string;
  className?: string;
  showTooltip?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
  showTooltip = false
}) => {
  const colors = getStatusColor(status);
  const tooltipText = getRTPStatusTooltip(status);

  const badgeElement = (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap min-w-0 flex-shrink-0",
        className
      )}
      style={{
        borderColor: colors.border,
        color: colors.text,
        backgroundColor: 'transparent',
        minWidth: 'fit-content'
      }}
    >
      <span className="truncate">{status}</span>
    </span>
  );

  // Only show tooltip if showTooltip is true and tooltipText is not empty
  if (showTooltip && tooltipText) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeElement}
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeElement;
};

export default StatusBadge;
