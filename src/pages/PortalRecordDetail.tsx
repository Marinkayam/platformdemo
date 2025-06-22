
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecordDetailHeader } from "@/components/portal-records/detail/PortalRecordDetailHeader";
import { PortalRecordInformation } from "@/components/portal-records/detail/PortalRecordInformation";
import { PortalRecordActivityLog } from "@/components/portal-records/detail/PortalRecordActivityLog";
import { PortalRecordPdfViewer } from "@/components/portal-records/detail/PortalRecordPdfViewer";
import { MatchInvoiceModal } from "@/components/portal-records/actions/MatchInvoiceModal";
import { ResolveConflictModal } from "@/components/portal-records/actions/ResolveConflictModal";
import { SyncRecordModal } from "@/components/portal-records/actions/SyncRecordModal";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("record-data");
  const [zoomLevel, setZoomLevel] = useState(1);
  
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

  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.1, 0.5));

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
    <div className="container mx-auto px-4 py-6">
      <PortalRecordDetailHeader portalRecord={portalRecord} actionButtons={getActionButtons()} className="mb-6" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="record-data">Record Data</TabsTrigger>
          <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
        </TabsList>

        {activeTab === "record-data" ? (
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-xl border border-[#E4E5E9]">
            <ResizablePanel defaultSize={55} className="p-6 bg-white space-y-6">
              <PortalRecordInformation portalRecord={portalRecord} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={45} className="p-6 border-l border-[#E4E5E9] bg-white">
              <PortalRecordPdfViewer
                portalRecord={portalRecord}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <TabsContent value="activity-log" className="mt-6">
            <Card className="p-6">
              <PortalRecordActivityLog portalRecord={portalRecord} />
            </Card>
          </TabsContent>
        )}
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
