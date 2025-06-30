import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Notification, useNotifications } from '@/context/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell } from 'lucide-react';

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

  // Demo notifications
  const demoNotifications = [
    { title: "Invoice Approved", message: "Invoice INV-00001234 was approved by BuyerCo." },
    { title: "New Portal Connected", message: "SAP Ariba portal connection established." },
    { title: "Payment Settled", message: "Payment for INV-00003333 has been settled." },
    { title: "User Added", message: "A new user was added to your workspace." },
    { title: "Sync Complete", message: "All portals synced successfully at 12:45 PM." },
  ];

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5 text-[#7B59FF]" />
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
        <div className="divide-y divide-gray-100">
          {demoNotifications.map((n, i) => (
            <div
              key={i}
              className="p-4 text-sm bg-white rounded-lg mb-2 shadow-sm hover:bg-[#F6F7F9] transition-colors group flex flex-col gap-1"
              tabIndex={0}
              role="listitem"
              aria-label={n.title}
            >
              <div className="font-semibold text-gray-900 mb-0.5">{n.title}</div>
              <div className="text-gray-700 mb-1">{n.message}</div>
              {(n.title.includes('Invoice') || n.title.includes('Portal')) && (
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs text-[#7B59FF] hover:underline font-medium px-2 py-1 rounded transition-colors hover:bg-[#EDE9FE] focus:outline-none focus:ring-2 focus:ring-[#7B59FF]"
                    tabIndex={0}
                    aria-label={`View details for ${n.title}`}
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
