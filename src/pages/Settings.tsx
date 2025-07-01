
import { useState } from "react";
import { User, Bell, Shield, Settings as SettingsIcon } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { AccountSettingsTab } from "@/components/settings/AccountSettingsTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { SecurityTab } from "@/components/settings/SecurityTab";
import { PreferencesTab } from "@/components/settings/PreferencesTab";

const headerTabs = [
  {
    id: "account",
    label: "Account Settings",
    icon: <User size={16} />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={16} />,
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield size={16} />,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: <SettingsIcon size={16} />,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettingsTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      case "preferences":
        return <PreferencesTab />;
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
