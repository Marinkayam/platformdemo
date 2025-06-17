
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LinkedAgentsColumnProps {
  count: number;
}

export function LinkedAgentsColumn({ count }: LinkedAgentsColumnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help text-sm">
            {count > 0 ? `${count}` : '—'}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {count > 0
              ? `This user is linked to ${count} Payments Relationship${count !== 1 ? 's' : ''}.`
              : "This user isn't linked to any Payments Relationship yet."
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
