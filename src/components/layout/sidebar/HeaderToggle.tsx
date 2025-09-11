import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/context/LayoutContext';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function HeaderToggle() {
  const { headerVisible, toggleHeader } = useLayout();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";

  const toggleButton = (
    <Button 
      variant="ghost" 
      size={isCollapsed ? "icon" : "default"}
      onClick={toggleHeader}
      className={`${isCollapsed ? 'w-8 h-8' : 'w-full justify-start px-2'} hover:bg-gray-100`}
    >
       {headerVisible ? (
         <EyeOff className={`${isCollapsed ? 'h-4 w-4' : 'mr-2 h-4 w-4'}`} />
       ) : (
         <Eye className={`${isCollapsed ? 'h-4 w-4' : 'mr-2 h-4 w-4'}`} />
       )}
     </Button>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {toggleButton}
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>{headerVisible ? 'Hide Header' : 'Show Header'}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return toggleButton;
}