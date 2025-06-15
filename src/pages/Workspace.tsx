import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Building, Users, Shield, Bell, Upload, Loader2 } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { showSuccessToast } from "@/lib/toast-helpers";
import { TeamTab } from "@/components/workspace/TeamTab";

const headerTabs = [
  {
    id: "company",
    label: "Company Information",
    icon: <Building size={16} />,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users size={16} />,
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield size={16} />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={16} />,
  },
];

const notificationSettings = [
  { id: "daily_activity", title: "Daily activity", description: "Get a daily recap of workspace events", enabled: true, },
  { id: "new_invoice_uploads", title: "New invoice uploads", description: "Be notified when new invoices appear", enabled: false, },
  { id: "comments", title: "Comments", description: "Replies or mentions on shared items", enabled: true, },
  { id: "new_attachments", title: "New attachments", description: "When a file is added to a record", enabled: true, },
];

export default function Workspace() {
  const [activeTab, setActiveTab] = useState("company");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    showSuccessToast("Settings saved successfully", "Your company information has been updated.");
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    showSuccessToast("Notification settings saved", "Your preferences have been updated.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div className="space-y-6">
            <div>
              <h6 className="text-lg font-semibold text-gray-900 mb-1">Company Information</h6>
              <p className="text-base text-gray-600">
                Manage your company details and preferences.
              </p>
            </div>
            <Card className="shadow-none border border-[#ececec] rounded-xl">
              <CardContent className="p-10 space-y-7">
                <div className="flex items-start gap-5">
                  <div className="flex flex-col items-center">
                    <div 
                      className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden mb-2"
                      onClick={triggerFileUpload}
                    >
                      {logoUrl ? (
                        <img 
                          src={logoUrl} 
                          alt="Company logo" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload size={24} className="text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500 text-center px-2">Click to upload logo</span>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    {/* Empty space reserved */}
                  </div>
                </div>
                <div>
                  <label className="block text-[15px] mb-2 font-medium text-gray-800">Company Name</label>
                  <Input className="h-12 bg-white text-base font-normal" defaultValue="Monto Technologies" />
                </div>
                <div>
                  <label className="block text-[15px] mb-2 font-medium text-gray-800">Admin Email</label>
                  <Input className="h-12 bg-gray-100 text-base" value="admin@monto.tech" disabled />
                </div>
                <div>
                  <label className="block text-[15px] mb-2 font-medium text-gray-800">Timezone</label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">🇺🇸 UTC-8 (Pacific Standard Time)</SelectItem>
                      <SelectItem value="utc-5">🇺🇸 UTC-5 (Eastern Standard Time)</SelectItem>
                      <SelectItem value="utc+0">🇬🇧 UTC+0 (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    Used for syncing timestamps from your portals and documents.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Your company portal will be accessible at:</span><br />
                    <span className="font-mono text-blue-900">montotechnologies.monto.com</span>
                  </p>
                </div>

                <div className="text-right pt-2">
                  <Button 
                    size="lg"
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "team":
        return <TeamTab />;
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h6 className="text-lg font-semibold text-gray-900 mb-1">Security</h6>
              <p className="text-base text-gray-600">Manage security settings and access controls.</p>
            </div>
            <Card className="shadow-none border border-[#ececec] rounded-xl">
              <CardContent className="flex items-center justify-center min-h-[180px]">
                <span className="text-gray-500 text-lg">Security settings coming soon...</span>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h6 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h6>
              <p className="text-base text-gray-600">Configure your notification preferences.</p>
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
                    onClick={handleSaveNotifications}
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
      default:
        return null;
    }
  };

  return (
    <div className="px-8 py-10">
      <div>
        <TabsNav
          tabs={headerTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {renderContent()}
      </div>
    </div>
  );
}
