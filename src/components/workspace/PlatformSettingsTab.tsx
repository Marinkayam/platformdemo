
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helpers";

const notificationSettings = [
  { id: "daily_activity", title: "Daily activity", description: "Get a daily recap of workspace events", enabled: true, },
  { id: "new_invoice_uploads", title: "New invoice uploads", description: "Be notified when new invoices appear", enabled: false, },
  { id: "comments", title: "Comments", description: "Replies or mentions on shared items", enabled: true, },
  { id: "new_attachments", title: "New attachments", description: "When a file is added to a record", enabled: true, },
];

export function PlatformSettingsTab() {
  const [notifications, setNotifications] = useState(notificationSettings);
  const [isLoading, setIsLoading] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };

  const handleSavePlatformSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    showSuccessToast("Platform settings saved", "Your preferences have been updated.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-gray-900 mb-1">Platform Settings</h6>
        <p className="text-base text-gray-600">Configure your platform settings and preferences.</p>
      </div>
      <Card className="shadow-none border border-[#ececec] rounded-xl">
        <CardContent className="p-0">
          {notifications.map((n, i) => (
            <div key={n.id}>
              <div className="flex items-center justify-between px-7 py-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-0.5">{n.title}</h3>
                  <p className="text-sm text-gray-500">{n.description}</p>
                </div>
                <Switch
                  checked={n.enabled}
                  onCheckedChange={() => toggleNotification(n.id)}
                  className="data-[state=checked]:bg-[#7b61ff] scale-110"
                />
              </div>
              {i < notifications.length - 1 && <Separator className="mx-7" />}
            </div>
          ))}
          <div className="flex justify-between items-center px-7 py-6 border-t">
            <Button variant="outline" className="border-gray-300 font-normal text-gray-800">
              Dismiss All
            </Button>
            <Button
              size="lg"
              onClick={handleSavePlatformSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
