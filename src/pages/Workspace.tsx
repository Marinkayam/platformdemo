import { useState } from "react";
import { Building2, Users, HeartHandshake, FileLock, FolderKanban, Unplug } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { TeamTab } from "@/components/workspace/TeamTab";
import { CompanyTab } from "@/components/workspace/CompanyTab";
import { LicenseTab } from "@/components/workspace/LicenseTab";
import { DuplicationPolicyTab } from "@/components/workspace/DuplicationPolicyTab";
import { PoliciesTab } from "@/components/workspace/PoliciesTab";
import { IntegrationHub } from "@/components/workspace/integration-hub/IntegrationHub";

const headerTabs = [
  {
    id: "company",
    label: "Company Info",
    icon: <Building2 size={16} strokeWidth={1} />,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users size={16} strokeWidth={1} />,
  },
  {
    id: "license",
    label: "License",
    icon: <HeartHandshake size={16} strokeWidth={1} />,
  },
  {
    id: "integration",
    label: "Integration Hub",
    icon: <Unplug size={16} strokeWidth={1} />,
  },
];

// Placeholder component for company entities tab
function CompanyEntitiesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Company Entities</h6>
        <p className="text-base text-grey-600">
          Manage your company's legal entities and subsidiaries.
        </p>
      </div>
      <div className="text-center py-20 text-grey-500">
        Company entities management coming soon...
      </div>
    </div>
  );
}

export default function Workspace() {
  const [activeTab, setActiveTab] = useState("company");

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanyTab />;
      case "team":
        return <TeamTab />;
      case "license":
        return <LicenseTab />;
      case "integration":
        return <IntegrationHub />;
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
