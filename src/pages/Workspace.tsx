
import { useState } from "react";
import { Building, Users, FileText, Settings, Plug, Building2 } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { TeamTab } from "@/components/workspace/TeamTab";
import { CompanyTab } from "@/components/workspace/CompanyTab";
import { LicenseTab } from "@/components/workspace/LicenseTab";
import { DuplicationPolicyTab } from "@/components/workspace/DuplicationPolicyTab";

const headerTabs = [
  {
    id: "company",
    label: "Company Info",
    icon: <Building size={16} />,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users size={16} />,
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
    id: "connectors",
    label: "Connectors",
    icon: <Plug size={16} />,
  },
  {
    id: "company-entities",
    label: "Company Entities",
    icon: <Building2 size={16} />,
  },
];

// Placeholder components for new tabs
function ConnectorsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Connectors</h6>
        <p className="text-base text-grey-600">
          Manage your portal connections and integrations.
        </p>
      </div>
      <div className="text-center py-20 text-grey-500">
        Connectors management coming soon...
      </div>
    </div>
  );
}

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
      case "duplication-policy":
        return <DuplicationPolicyTab />;
      case "connectors":
        return <ConnectorsTab />;
      case "company-entities":
        return <CompanyEntitiesTab />;
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
