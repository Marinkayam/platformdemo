
import { useState } from "react";
import { Building, Users, FileText, Settings } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { TeamTab } from "@/components/workspace/TeamTab";
import { CompanyTab } from "@/components/workspace/CompanyTab";
import { LicenseTab } from "@/components/workspace/LicenseTab";
import { DuplicationPolicyTab } from "@/components/workspace/DuplicationPolicyTab";

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
    id: "duplication-policy",
    label: "Duplication Policy",
    icon: <Settings size={16} />,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users size={16} />,
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
      case "duplication-policy":
        return <DuplicationPolicyTab />;
      case "team":
        return <TeamTab />;
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
