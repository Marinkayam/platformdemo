import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Building, Users, Shield, Bell, MoreVertical, Plus, Upload, Camera } from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  {
    id: "company",
    label: "Company Information",
    icon: Building,
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
];

const teamMembers = [
  {
    email: "sarah@monto.tech",
    role: "Admin",
  },
  {
    email: "mike@monto.tech",
    role: "User",
  },
  {
    email: "lisa@monto.tech",
    role: "User",
  },
];

const notificationSettings = [
  {
    id: "daily_activity",
    title: "Daily activity",
    description: "Get a daily recap of workspace events",
    enabled: true,
  },
  {
    id: "new_invoice_uploads",
    title: "New invoice uploads",
    description: "Be notified when new invoices appear",
    enabled: false,
  },
  {
    id: "comments",
    title: "Comments",
    description: "Replies or mentions on shared items",
    enabled: true,
  },
  {
    id: "new_attachments",
    title: "New attachments",
    description: "When a file is added to a record",
    enabled: true,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("team");
  const [notifications, setNotifications] = useState(notificationSettings);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Company Information</h2>
              <p className="text-sm text-gray-600">Manage your company details and preferences.</p>
            </div>
            
            <Card className="shadow-none">
              <CardContent className="p-6 space-y-6">
                {/* Logo Upload Section */}
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <Camera size={24} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Name</label>
                  <Input 
                    defaultValue="Monto Technologies"
                    className="bg-white"
                  />
                </div>

                {/* Admin Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Admin Email</label>
                  <Input 
                    defaultValue="admin@monto.tech"
                    className="bg-gray-100"
                    disabled
                  />
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">UTC-8 (Pacific Standard Time)</SelectItem>
                      <SelectItem value="utc-5">UTC-5 (Eastern Standard Time)</SelectItem>
                      <SelectItem value="utc+0">UTC+0 (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <Button className="bg-monto-purple hover:bg-purple-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "team":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Team</h2>
              <p className="text-sm text-gray-600">
                Invite teammates to collaborate. Admins can manage users, connections, and settings.
                <br />
                Users can view and edit.
              </p>
            </div>
            
            <Card className="shadow-none">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teamMembers.map((member, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={member.role === "Admin" ? "default" : "secondary"}
                              className={member.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}
                            >
                              {member.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border-t">
                  <Button className="bg-monto-purple hover:bg-purple-700 text-white">
                    <Plus size={16} className="mr-2" />
                    Add New Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Security</h2>
              <p className="text-sm text-gray-600">Manage security settings and access controls.</p>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-500">Security settings coming soon...</p>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Notifications</h2>
              <p className="text-sm text-gray-600">Configure your notification preferences.</p>
            </div>
            
            <Card className="shadow-none">
              <CardContent className="p-6 space-y-6">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {notification.description}
                        </p>
                      </div>
                      <Switch
                        checked={notification.enabled}
                        onCheckedChange={() => toggleNotification(notification.id)}
                        className="data-[state=checked]:bg-monto-purple"
                      />
                    </div>
                    {index < notifications.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <Button variant="outline" className="text-gray-600">
                    Dismiss All
                  </Button>
                  <Button className="bg-monto-purple hover:bg-purple-700 text-white">
                    Save Settings
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
    <div>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account preferences and application settings" 
      />
      
      <Card className="mt-6 shadow-none">
        <CardContent className="p-0">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 border-r bg-gray-50">
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors ${
                        activeTab === item.id
                          ? "bg-[#F0EDFF] text-[#7B59FF] font-semibold"
                          : "text-[#3F4758] hover:bg-[#F4F4F7]"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              {renderContent()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
