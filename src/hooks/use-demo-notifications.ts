
import { useNotifications, NotificationType } from "@/context/NotificationsContext";

export function useDemoNotifications() {
  const { addNotification } = useNotifications();

  const addDemoNotification = (type: NotificationType = 'info') => {
    const notifications = {
      info: {
        title: 'Information',
        message: 'This is an information notification example.',
      },
      success: {
        title: 'Success',
        message: 'Operation completed successfully!',
      },
      warning: {
        title: 'Warning',
        message: 'This action might cause issues.',
      },
      error: {
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      },
    };
    
    addNotification({
      ...notifications[type],
      type,
    });
  };
  
  return { addDemoNotification };
}
