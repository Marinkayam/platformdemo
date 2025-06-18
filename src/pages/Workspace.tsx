
import { useState } from "react";
import { Building, Users, Shield, Bell, FileText } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { TeamTab } from "@/components/workspace/TeamTab";
import { CompanyTab } from "@/components/workspace/CompanyTab";
import { SecurityTab } from "@/components/workspace/SecurityTab";
import { PlatformSettingsTab } from "@/components/workspace/PlatformSettingsTab";
import { LicenseTab } from "@/components/workspace/LicenseTab";

const headerTabs = [
  {
    id: "company",
    label: "Company Information",
    icon: <Building size={16} />,
  },
  {
    id: "license",
    label: "License",
    icon: <FileText size={16} />,
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
    id: "platform-settings",
    label: "Platform Settings",
    icon: <Bell size={16} />,
  },
];

export default function Workspace() {
  const [activeTab, setActiveTab] = useState("company");

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanyTab />;
      case "license":
        return <LicenseTab />;
      case "team":
        return <TeamTab />;
      case "security":
        return <SecurityTab />;
      case "platform-settings":
        return <PlatformSettingsTab />;
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
