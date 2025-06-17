
import React from 'react';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

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
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onCopy(username);
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}
