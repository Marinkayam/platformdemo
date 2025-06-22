import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allPortalRecords } from "@/data/portalRecords";
import { PortalRecordDetailHeader } from "@/components/portal-records/detail/PortalRecordDetailHeader";
import { PortalRecordInformation } from "@/components/portal-records/detail/PortalRecordInformation";
import { PortalRecordActivityLog } from "@/components/portal-records/detail/PortalRecordActivityLog";
import { PortalRecordPdfViewer } from "@/components/portal-records/detail/PortalRecordPdfViewer";
import { PortalRecordTabs } from "@/components/portal-records/detail/PortalRecordTabs";
import { EnhancedMatchInvoiceModal } from "@/components/portal-records/actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "@/components/portal-records/actions/EnhancedResolveConflictModal";
import { IgnoreRecordModal } from "@/components/portal-records/actions/IgnoreRecordModal";
import { SyncRecordModal } from "@/components/portal-records/actions/SyncRecordModal";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);

  // Find the portal record by ID
  const portalRecord = allPortalRecords.find(record => record.id === id);

  if (!portalRecord) {
    return (
      <div className="container mx-auto py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 p-0"
          >
            <Home className="h-4 w-4" />
          </Button>
          <ChevronRight className="h-4 w-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/portal-records")}
            className="text-gray-600 hover:text-gray-900 p-0"
          >
            Portal Records
          </Button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Record Not Found</span>
        </div>

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
        buttons.push(
          <Button key="ignore" variant="outline" onClick={() => setIgnoreModalOpen(true)} className="text-red-600 hover:text-red-700">
            Ignore Record
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

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate') => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
  };

  const onRecordSynced = () => {
    console.log(`Synced record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
  };

  const onRecordIgnored = () => {
    console.log(`Ignored record ${portalRecord.id}`);
    // TODO: Update record state and refresh data
    navigate("/portal-records");
  };

  const onMatchAndCreateRTP = (pdfFile: File) => {
    console.log(`Creating RTP for record ${portalRecord.id} with PDF:`, pdfFile.name);
    // TODO: Implement RTP creation logic
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900 p-0"
        >
          <Home className="h-4 w-4" />
        </Button>
        <ChevronRight className="h-4 w-4" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/portal-records")}
          className="text-gray-600 hover:text-gray-900 p-0"
        >
          Portal Records
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{portalRecord.portalRecordId}</span>
      </div>

      <PortalRecordDetailHeader portalRecord={portalRecord} actionButtons={getActionButtons()} className="mb-6" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <PortalRecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

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

      {/* Enhanced Action Modals */}
      <EnhancedMatchInvoiceModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        record={portalRecord}
        onMatch={onInvoiceMatched}
        onIgnore={onRecordIgnored}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
      />
      
      <EnhancedResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        record={portalRecord}
        onResolve={onConflictResolved}
      />

      <IgnoreRecordModal
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        record={portalRecord}
        onIgnore={onRecordIgnored}
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
