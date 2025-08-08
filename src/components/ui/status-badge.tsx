
import React from 'react';
import { getStatusColor } from '@/lib/badge-colors';
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getRtpStatusTooltip } from '@/lib/rtp-status-tooltips';

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
  const tooltipText = getRtpStatusTooltip(status);

  const badgeContent = (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border font-medium whitespace-nowrap min-w-0 flex-shrink-0",
        className
      )}
      style={{
        color: colors.text,
        backgroundColor: colors.background,
        border: '1px solid',
        borderColor: colors.border,
        minWidth: 'fit-content',
        fontSize: '12px'
      }}
    >
      <span className="truncate">{status}</span>
    </span>
  );

  if (showTooltip && tooltipText) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeContent;
};

export default StatusBadge;
