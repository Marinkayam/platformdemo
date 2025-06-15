
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Building, Users, Shield, Bell, MoreVertical, Plus, Upload, Camera } from "lucide-react";

const sidebarItems = [
  { id: "company", label: "Company Information", icon: <Building size={18} />, },
  { id: "team", label: "Team", icon: <Users size={18} />, },
  { id: "security", label: "Security", icon: <Shield size={18} />, },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} />, },
];

const teamMembers = [
  { email: "sarah@monto.tech", role: "Admin" },
  { email: "mike@monto.tech", role: "User" },
  { email: "lisa@monto.tech", role: "User" },
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

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Company Information</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your company details and preferences.</p>
            <Card className="shadow-none border border-[#ececec] rounded-xl">
              <CardContent className="p-10 space-y-7">
                <div className="flex items-start gap-5">
                  <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <Camera size={28} className="text-gray-400" />
                  </div>
                  <div className="flex-1 flex items-center">
                    <Button variant="outline" className="flex items-center gap-2 border-gray-300">
                      <Upload size={18} />
                      <span className="font-medium">Upload Logo</span>
                    </Button>
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
                      <SelectItem value="utc-8">UTC-8 (Pacific Standard Time)</SelectItem>
                      <SelectItem value="utc-5">UTC-5 (Eastern Standard Time)</SelectItem>
                      <SelectItem value="utc+0">UTC+0 (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-right pt-2">
                  <Button className="px-8 h-11 bg-[#7b61ff] hover:bg-[#6b53e6] text-white font-semibold">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "team":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Team</h2>
            <p className="text-sm text-gray-600 mb-6">
              Invite teammates to collaborate. Admins can manage users, connections, and settings.<br />
              Users can view and edit.
            </p>
            <Card className="shadow-none border border-[#ececec] rounded-xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {teamMembers.map((member, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-8 py-5 whitespace-nowrap text-base text-gray-900">{member.email}</td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <Badge
                              variant={member.role === "Admin" ? "default" : "secondary"}
                              className={member.role === "Admin"
                                ? "bg-[#efefff] text-[#6b53e6] font-medium"
                                : "bg-gray-100 text-gray-700"
                              }
                            >
                              {member.role}
                            </Badge>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-gray-400">
                            <button>
                              <MoreVertical size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-7 py-7 border-t">
                  <Button className="bg-[#7b61ff] hover:bg-[#634edc] text-white font-semibold h-11 px-6">
                    <Plus size={18} className="mr-2" />
                    Add New Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Security</h2>
            <p className="text-sm text-gray-600 mb-6">Manage security settings and access controls.</p>
            <Card className="shadow-none border border-[#ececec] rounded-xl">
              <CardContent className="flex items-center justify-center min-h-[180px]">
                <span className="text-gray-500 text-lg">Security settings coming soon...</span>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Notifications</h2>
            <p className="text-sm text-gray-600 mb-6">Configure your notification preferences.</p>
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
                  <Button className="h-11 px-8 bg-[#7b61ff] hover:bg-[#634edc] text-white font-semibold">
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
    <div className="px-8 py-10">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and application settings"
      />
      <div className="mt-6 rounded-2xl bg-white border border-[#ececec] flex shadow-none overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#ececec] bg-[#fafbfc] py-10 px-4">
          <nav>
            <ul className="flex flex-col gap-1">
              {sidebarItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`flex items-center gap-3 w-full px-5 py-3 rounded-lg font-medium text-base transition
                      ${activeTab === item.id
                        ? "bg-[#f5f3ff] text-[#7b61ff]"
                        : "text-gray-800 hover:bg-gray-100"
                      }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className={`transition-colors ${
                      activeTab === item.id ? "text-[#7b61ff]" : "text-gray-500"
                    }`}>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <section className="flex-1 p-12">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}
