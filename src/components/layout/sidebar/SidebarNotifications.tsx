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
    <div className="relative flex items-center justify-center">
      <Bell className="h-4 w-4 text-muted-foreground" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 block w-2 h-2 rounded-full bg-red-500" />
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100">
            {notificationButton}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button variant="ghost" className="w-full justify-start px-2 h-10 hover:bg-gray-100">
      <div className="flex items-center gap-3 w-full">
        {notificationButton}
        <div className="flex-1 text-left">
          <span className="text-sm font-medium text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground ml-1">({unreadCount})</span>
          )}
        </div>
      </div>
    </Button>
  );
}