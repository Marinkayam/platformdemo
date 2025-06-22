
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecordHeader } from "@/components/portal-records/detail/PortalRecordHeader";
import { PortalRecordTabs } from "@/components/portal-records/detail/PortalRecordTabs";
import { RecordInformationTab } from "@/components/portal-records/detail/RecordInformationTab";
import { ActivityLogTab } from "@/components/portal-records/detail/ActivityLogTab";
import { RelatedInvoicesTab } from "@/components/portal-records/detail/RelatedInvoicesTab";
import { MatchInvoiceModal } from "@/components/portal-records/actions/MatchInvoiceModal";
import { ResolveConflictModal } from "@/components/portal-records/actions/ResolveConflictModal";
import { SyncRecordModal } from "@/components/portal-records/actions/SyncRecordModal";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");
  
  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  // Find the portal record by ID
  const portalRecord = allPortalRecords.find(record => record.id === id);

  if (!portalRecord) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/portal-records")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
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

  const getActionButtons = () => {
    const buttons = [];

    if (portalRecord.connectionStatus === 'Connected') {
      if (portalRecord.matchType === 'Unmatched') {
        buttons.push(
          <Button key="match" onClick={() => setMatchModalOpen(true)}>
            Match Invoice
          </Button>
        );
      } else if (portalRecord.matchType === 'Conflict') {
        buttons.push(
          <Button key="resolve" onClick={() => setConflictModalOpen(true)}>
            Resolve Conflict
          </Button>
        );
      }
      
      buttons.push(
        <Button key="sync" variant="outline" onClick={() => setSyncModalOpen(true)}>
          Sync Record
        </Button>
      );
    }

    return buttons;
  };

  const onInvoiceMatched = (invoiceId: string) => {
    console.log(`Matched invoice ${invoiceId} with record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
  };

  const onConflictResolved = (resolution: string) => {
    console.log(`Resolved conflict with option: ${resolution} for record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
  };

  const onRecordSynced = () => {
    console.log(`Synced record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
  };

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/portal-records">Portal Records</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Records</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <PortalRecordHeader record={portalRecord} actionButtons={getActionButtons()} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <PortalRecordTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <TabsContent value="information" className="mt-6">
          <Card className="p-6 rounded-xl shadow-sm">
            <RecordInformationTab record={portalRecord} />
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="p-6 rounded-xl shadow-sm">
            <ActivityLogTab record={portalRecord} />
          </Card>
        </TabsContent>

        <TabsContent value="related" className="mt-6">
          <Card className="p-6 rounded-xl shadow-sm">
            <RelatedInvoicesTab record={portalRecord} />
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Modals */}
      <MatchInvoiceModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        record={portalRecord}
        onMatch={onInvoiceMatched}
      />
      
      <ResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        record={portalRecord}
        onResolve={onConflictResolved}
      />
      
      <SyncRecordModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        record={portalRecord}
        onSync={onRecordSynced}
      />
    </div>
  );
}
