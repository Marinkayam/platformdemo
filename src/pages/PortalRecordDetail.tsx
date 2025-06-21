
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecordHeader } from "@/components/portal-records/detail/PortalRecordHeader";
import { PortalRecordTabs } from "@/components/portal-records/detail/PortalRecordTabs";
import { RecordInformationTab } from "@/components/portal-records/detail/RecordInformationTab";
import { ActivityLogTab } from "@/components/portal-records/detail/ActivityLogTab";
import { RelatedInvoicesTab } from "@/components/portal-records/detail/RelatedInvoicesTab";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");

  // Find the portal record by ID
  const portalRecord = allPortalRecords.find(record => record.id === id);

  if (!portalRecord) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/portal-records")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Portal Records
          </Button>
        </div>
        
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Portal Record Not Found</h2>
          <p className="text-gray-600">The portal record you're looking for doesn't exist or may have been removed.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "information", label: "Record Information" },
    { id: "activity", label: "Activity Log" },
    { id: "related", label: "Related Invoices" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return <RecordInformationTab record={portalRecord} />;
      case "activity":
        return <ActivityLogTab record={portalRecord} />;
      case "related":
        return <RelatedInvoicesTab record={portalRecord} />;
      default:
        return <RecordInformationTab record={portalRecord} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/portal-records">Portal Records</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{portalRecord.portalRecordId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/portal-records")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Portal Records
        </Button>
      </div>

      {/* Header */}
      <PortalRecordHeader record={portalRecord} />

      {/* Tabs */}
      <PortalRecordTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
