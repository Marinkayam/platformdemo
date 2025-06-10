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
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}
      style={{
        borderColor: colors.border,
        color: colors.text,
        backgroundColor: 'transparent'
      }}
          >
            {status}
          </span>
  );
};

export default StatusBadge;
