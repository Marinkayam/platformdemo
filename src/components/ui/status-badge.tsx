
import React from 'react';
import { getStatusColor } from '@/lib/badge-colors';
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/invoice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = ""
}) => {
  const colors = getStatusColor(status);

  return (
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
};

export default StatusBadge;
