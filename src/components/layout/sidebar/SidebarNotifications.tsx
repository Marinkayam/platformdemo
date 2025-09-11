import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationsPopover } from '@/components/notifications/NotificationsPopover';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useNotifications } from '@/context/NotificationsContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function SidebarNotifications() {
  const { state: sidebarState } = useSidebar();
  const { unreadCount } = useNotifications();
  const isCollapsed = sidebarState === "collapsed";

  const notificationButton = (
    <div className="relative">
      <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300" 
           style={{ backgroundColor: '#E6E7EB' }}>
        <NotificationsPopover />
      </div>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#FAFAFA]" />
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {notificationButton}
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button variant="ghost" className="w-full justify-start px-2 h-auto py-2 hover:bg-gray-100">
      <div className="flex items-center gap-3 w-full">
        {notificationButton}
        <div className="flex-1 text-left">
          <span className="text-sm font-medium">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground ml-1">({unreadCount} unread)</span>
          )}
        </div>
      </div>
    </Button>
  );
}