import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationsPopover } from '@/components/notifications/NotificationsPopover';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useNotifications } from '@/context/NotificationsContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function SidebarNotifications() {
  const { state: sidebarState } = useSidebar();
  const { notifications, unreadCount, addNotification, markAllAsRead, clearAllNotifications } = useNotifications();
  const isCollapsed = sidebarState === "collapsed";
  const [isOpen, setIsOpen] = useState(false);

  // Demo function to add sample notifications
  const addDemoNotifications = () => {
    const demoNotifications = [
      { title: "Invoice Approved", message: "Invoice INV-00001234 was approved by BuyerCo.", type: "success" as const },
      { title: "New Portal Connected", message: "SAP Ariba portal connection established.", type: "info" as const },
      { title: "Payment Settled", message: "Payment for INV-00003333 has been settled.", type: "success" as const },
      { title: "User Added", message: "A new user was added to your workspace.", type: "info" as const },
      { title: "Sync Complete", message: "All portals synced successfully at 12:45 PM.", type: "success" as const },
    ];

    demoNotifications.forEach(notification => {
      addNotification(notification);
    });
  };

  // Add demo notifications on component mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length === 0) {
        addDemoNotifications();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && unreadCount > 0) {
      markAllAsRead();
    }
  };

  const notificationButton = (
    <div className="relative flex items-center justify-center">
      <Bell className="h-4 w-4 text-muted-foreground" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 block w-2 h-2 rounded-full bg-[#7B59FF]" />
      )}
    </div>
  );

  const NotificationContent = ({ side = "right" }: { side?: "right" | "top" }) => (
    <PopoverContent className="w-80 p-0 ml-4" side={side} align="start">
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
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 text-sm bg-white hover:bg-[#F6F7F9] transition-colors group flex flex-col gap-1"
                tabIndex={0}
                role="listitem"
                aria-label={notification.title}
              >
                <div className="font-semibold text-gray-900 mb-0.5">{notification.title}</div>
                <div className="text-gray-700 mb-1">{notification.message}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PopoverContent>
  );

  if (isCollapsed) {
    return (
      <div className="flex justify-center">
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100">
              {notificationButton}
            </Button>
          </PopoverTrigger>
          <NotificationContent side="right" />
        </Popover>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2 h-10 hover:bg-gray-100">
          <div className="flex items-center gap-3 w-full">
            {notificationButton}
            <div className="flex-1 text-left">
              <span className="font-normal leading-5 text-[rgb(63,71,88)]">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs text-muted-foreground ml-1">({unreadCount})</span>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <NotificationContent side="right" />
    </Popover>
  );
}