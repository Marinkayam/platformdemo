
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecordDetailHeader } from "@/components/portal-records/detail/PortalRecordDetailHeader";
import { PortalRecordInformation } from "@/components/portal-records/detail/PortalRecordInformation";
import { PortalRecordActivityLog } from "@/components/portal-records/detail/PortalRecordActivityLog";
import { PortalRecordTabs } from "@/components/portal-records/detail/PortalRecordTabs";
import { PortalRecordDetailBreadcrumb } from "@/components/portal-records/detail/PortalRecordDetailBreadcrumb";
import { PortalRecordDetailNotFound } from "@/components/portal-records/detail/PortalRecordDetailNotFound";
import { PortalRecordDetailModals } from "@/components/portal-records/detail/PortalRecordDetailModals";
import { PortalRecordActionInstructions } from "@/components/portal-records/detail/PortalRecordActionInstructions";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("record-data");
  
  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);

  // Find the portal record by ID
  const portalRecord = allPortalRecords.find(record => record.id === id);

  if (!portalRecord) {
    return <PortalRecordDetailNotFound />;
  }

  const onInvoiceMatched = (invoiceId: string) => {
    console.log(`Matched invoice ${invoiceId} with record ${portalRecord.id}`);
    setMatchModalOpen(false);
    // TODO: Update record state and refresh data
  };

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate') => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${portalRecord.id}`);
    setConflictModalOpen(false);
    // TODO: Update record state and refresh data
  };

  const onRecordIgnored = () => {
    console.log(`Ignored record ${portalRecord.id}`);
    setIgnoreModalOpen(false);
    // TODO: Update record state and refresh data
    navigate("/portal-records");
  };

  const onStopTrackingBuyer = () => {
    console.log(`Stopped tracking buyer ${portalRecord.buyer}`);
    setIgnoreModalOpen(false);
    // TODO: Update all records from this buyer and refresh data
    navigate("/portal-records");
  };

  const onMatchAndCreateRTP = (pdfFile: File) => {
    console.log(`Creating RTP for record ${portalRecord.id} with PDF:`, pdfFile.name);
    setMatchModalOpen(false);
    // TODO: Implement RTP creation logic
  };

  const handleIgnoreRecord = () => {
    console.log('Opening ignore modal from detail page');
    setIgnoreModalOpen(true);
  };

  const handleMatchInvoice = () => {
    console.log('Opening match modal from detail page');
    setMatchModalOpen(true);
  };

  const handleResolveConflict = () => {
    console.log('Opening conflict modal from detail page');
    setConflictModalOpen(true);
  };

  const handleSyncRecord = () => {
    console.log('Syncing record from detail page');
    toast({
      title: "Record Synced",
      description: `Portal record ${portalRecord.portalRecordId} has been synced successfully.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PortalRecordDetailBreadcrumb portalRecordId={portalRecord.invoiceNumber || portalRecord.portalRecordId} />

      <PortalRecordDetailHeader 
        portalRecord={portalRecord} 
        className="mb-6"
        onMatchInvoice={handleMatchInvoice}
        onResolveConflict={handleResolveConflict}
        onIgnoreRecord={handleIgnoreRecord}
        onSyncRecord={handleSyncRecord}
      />

      <PortalRecordActionInstructions 
        portalRecord={portalRecord}
        onMatchInvoice={handleMatchInvoice}
        onResolveConflict={handleResolveConflict}
        onIgnoreRecord={handleIgnoreRecord}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <PortalRecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <TabsContent value="record-data" className="mt-6">
          <Card className="p-6">
            <PortalRecordInformation portalRecord={portalRecord} />
          </Card>
        </TabsContent>

        <TabsContent value="activity-log" className="mt-6">
          <Card className="p-6">
            <PortalRecordActivityLog portalRecord={portalRecord} />
          </Card>
        </TabsContent>
      </Tabs>

      <PortalRecordDetailModals
        portalRecord={portalRecord}
        matchModalOpen={matchModalOpen}
        conflictModalOpen={conflictModalOpen}
        ignoreModalOpen={ignoreModalOpen}
        onCloseMatchModal={() => setMatchModalOpen(false)}
        onCloseConflictModal={() => setConflictModalOpen(false)}
        onCloseIgnoreModal={() => setIgnoreModalOpen(false)}
        onInvoiceMatched={onInvoiceMatched}
        onConflictResolved={onConflictResolved}
        onRecordIgnored={onRecordIgnored}
        onStopTrackingBuyer={onStopTrackingBuyer}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
      />
    </div>
  );
}
