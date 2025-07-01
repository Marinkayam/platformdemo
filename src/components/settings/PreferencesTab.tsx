
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { showSuccessToast } from "@/lib/toast-helpers";

export function PreferencesTab() {
  const [theme, setTheme] = useState("light");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12");
  const [currency, setCurrency] = useState("USD");
  const [compactView, setCompactView] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  const handleSavePreferences = () => {
    showSuccessToast(
      "Preferences updated",
      "Your preferences have been saved successfully."
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Preferences</h6>
        <p className="text-base text-grey-600">
          Customize your interface and display preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the interface looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact View</Label>
              <p className="text-sm text-grey-600">Use a more compact layout for tables and lists</p>
            </div>
            <Switch
              checked={compactView}
              onCheckedChange={setCompactView}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Tooltips</Label>
              <p className="text-sm text-grey-600">Display helpful tooltips throughout the interface</p>
            </div>
            <Switch
              checked={showTooltips}
              onCheckedChange={setShowTooltips}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Format & Display</CardTitle>
          <CardDescription>
            Configure how dates, times, and currency are displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeFormat">Time Format</Label>
            <Select value={timeFormat} onValueChange={setTimeFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CAD">CAD (C$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSavePreferences} className="bg-[#7B59FF] hover:bg-[#6a4bea]">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
