
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Shield, Bell, MoreHorizontal, Plus } from "lucide-react";
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

export default function Settings() {
  const [activeTab, setActiveTab] = useState("team");

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Company Information</h2>
              <p className="text-sm text-gray-600">Manage your company details and preferences.</p>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-500">Company information settings coming soon...</p>
            </div>
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
            
            <Card>
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
                              <MoreHorizontal size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border-t">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
            <div className="text-center py-12">
              <p className="text-gray-500">Notification settings coming soon...</p>
            </div>
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
      
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
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
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
