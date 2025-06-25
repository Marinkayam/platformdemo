
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UsernameColumnProps {
  username: string;
  onCopy: (text: string) => void;
}

export function UsernameColumn({ username, onCopy }: UsernameColumnProps) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm truncate max-w-[160px] cursor-help">{username}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{username}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
