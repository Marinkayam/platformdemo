
import { useState } from "react";
import { Building, Users, FileText, Settings, Plug, Building2, Sparkles, Lock } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";
import { TeamTab } from "@/components/workspace/TeamTab";
import { CompanyTab } from "@/components/workspace/CompanyTab";
import { LicenseTab } from "@/components/workspace/LicenseTab";
import { DuplicationPolicyTab } from "@/components/workspace/DuplicationPolicyTab";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const premiumFeatures = [
    {
      name: "Smart Analytics",
      description: "Advanced insights and reporting",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      name: "API Access",
      description: "Full API integration capabilities",
      icon: <Plug className="h-5 w-5" />,
    },
    {
      name: "Priority Support",
      description: "24/7 dedicated support team",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="px-8 py-10">
      <div className="space-y-8">
        <TabsNav
          tabs={headerTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {renderContent()}

        {/* Basic License Information */}
        <div className="space-y-6 animate-fade-in">
          <div className="border-t border-grey-300 pt-8">
            <h3 className="text-xl font-semibold text-grey-900 mb-2">License Information</h3>
            <p className="text-grey-600 mb-6">Current plan details and usage</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-grey-300 hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-main mb-1">50</div>
                    <div className="text-sm text-grey-600">Smart Connects</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-grey-300 hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-main mb-1">15</div>
                    <div className="text-sm text-grey-600">Total Users</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-grey-300 hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-main mb-1">2,000</div>
                    <div className="text-sm text-grey-600">Invoices Tracked</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Premium Features Section */}
          <div className="bg-gradient-to-br from-primary-lighter to-primary-light/30 rounded-xl p-8 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary-main" />
                <h3 className="text-2xl font-semibold text-grey-900">Premium Features</h3>
              </div>
              <p className="text-grey-600 max-w-2xl mx-auto">
                Unlock advanced capabilities and enhanced functionality with our premium plan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/90 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-main/10 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-grey-900 mb-2">{feature.name}</h4>
                  <p className="text-sm text-grey-600 mb-4">{feature.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-primary-main hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                Upgrade to Premium
              </Button>
              <p className="text-sm text-grey-600 mt-3">
                Starting at $99/month • 14-day free trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
