
import { Button } from "@/components/ui/button";
import { useDemoNotifications } from "@/hooks/use-demo-notifications";

export function NotificationsTester() {
  const { addDemoNotification } = useDemoNotifications();

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold">Notification Tester</h2>
      <p className="text-muted-foreground">Click the buttons below to trigger notifications.</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addDemoNotification('info')}>Info Notification</Button>
        <Button onClick={() => addDemoNotification('success')}>Success Notification</Button>
        <Button onClick={() => addDemoNotification('warning')}>Warning Notification</Button>
        <Button onClick={() => addDemoNotification('error')}>Error Notification</Button>
      </div>
    </div>
  );
}
