
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccessToast } from "@/lib/toast-helpers";

export function NotificationsTab() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [invoiceAlerts, setInvoiceAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const handleSaveNotifications = () => {
    showSuccessToast(
      "Notification preferences updated",
      "Your notification settings have been saved successfully."
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Notification Settings</h6>
        <p className="text-base text-grey-600">
          Manage how and when you receive notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">General Notifications</CardTitle>
          <CardDescription>
            Configure your general notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-grey-600">Receive notifications via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-grey-600">Receive browser push notifications</p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Alert Preferences</CardTitle>
          <CardDescription>
            Choose which types of alerts you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Invoice Alerts</Label>
              <p className="text-sm text-grey-600">Get notified about new invoices and updates</p>
            </div>
            <Switch
              checked={invoiceAlerts}
              onCheckedChange={setInvoiceAlerts}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Reminders</Label>
              <p className="text-sm text-grey-600">Receive reminders for upcoming payments</p>
            </div>
            <Switch
              checked={paymentReminders}
              onCheckedChange={setPaymentReminders}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Updates</Label>
              <p className="text-sm text-grey-600">Get notified about system maintenance and updates</p>
            </div>
            <Switch
              checked={systemUpdates}
              onCheckedChange={setSystemUpdates}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-grey-600">Receive weekly activity summaries</p>
            </div>
            <Switch
              checked={weeklyReports}
              onCheckedChange={setWeeklyReports}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveNotifications} className="bg-[#7B59FF] hover:bg-[#6a4bea]">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
