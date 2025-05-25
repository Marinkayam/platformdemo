
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Notification, useNotifications } from '@/context/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export const NotificationsPopover: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  const handleOpenChange = (open: boolean) => {
    if (open && unreadCount > 0) {
      // Mark all as read when opening the popover
      markAllAsRead();
    }
  };

  const getNotificationTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#01173E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-auto p-0"
              onClick={clearAllNotifications}
            >
              Clear all
            </Button>
          )}
        </div>
        {notifications.length > 0 ? (
          <ScrollArea className="max-h-[60vh]">
            <div className="p-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-l-4 ${getNotificationTypeStyles(
                    notification.type
                  )} relative group`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <span className="sr-only">Dismiss</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </div>
                  {!notification.read && (
                    <Badge className="absolute top-4 right-4 bg-blue-500">New</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No notifications
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
