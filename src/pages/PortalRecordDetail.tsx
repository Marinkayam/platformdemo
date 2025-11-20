
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
import { ConflictResolutionInterface } from "@/components/portal-records/ConflictResolutionInterface";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { NotesThread } from "@/components/invoices/detail/NotesThread";
import { useNotes } from "@/hooks/useNotes";
import { toast } from "sonner";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("record-data");
  const { notes, addNote, removeNoteAttachment, scrollRef } = useNotes();

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

  const onMatchAndCreateRTP = (pdfFile?: File) => {
    console.log(`Creating RTP for record ${portalRecord.id}`, pdfFile ? `with PDF: ${pdfFile.name}` : '');
    setMatchModalOpen(false);

    // Show success toast and navigate back
    toast.success("RTP Record Created", {
      description: `New RTP record has been created for ${portalRecord.portalRecordId}. Returning to portal records...`,
    });

    // Navigate back to portal records table
    navigate("/portal-records");
  };

  const handleIgnoreRecord = () => {
    console.log('Opening ignore modal from detail page');
    setIgnoreModalOpen(true);
  };

  const handleMatchInvoice = (invoiceId?: string) => {
    if (invoiceId) {
      // Direct match from inline interface
      console.log(`Matched invoice ${invoiceId} with record ${portalRecord.id}`);
      toast.success("Invoice Associated", {
        description: `Portal record ${portalRecord.invoiceNumber} has been associated with invoice ${invoiceId}.`,
      });
      // Navigate back to the portal records table
      navigate("/portal-records");
    } else {
      // Fallback to modal (for other contexts)
      console.log('Opening match modal from detail page');
      setMatchModalOpen(true);
    }
  };

  const handleResolveConflict = () => {
    console.log('Opening conflict modal from detail page');
    setConflictModalOpen(true);
  };

  const handleSyncRecord = () => {
    console.log('Syncing record from detail page');
    toast.success("Record Synced", {
      description: `Portal record ${portalRecord.portalRecordId} has been synced successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <PortalRecordDetailBreadcrumb portalRecordId={portalRecord.invoiceNumber || portalRecord.portalRecordId} />

      <PortalRecordDetailHeader 
        portalRecord={portalRecord} 
        className="mb-6"
        onMatchInvoice={handleMatchInvoice}
        onResolveConflict={handleResolveConflict}
        onIgnoreRecord={handleIgnoreRecord}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <PortalRecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <TabsContent value="record-data" className="mt-6">
          <Card className="p-6">
            <PortalRecordInformation
              portalRecord={portalRecord}
              showCollapsed={
                portalRecord.matchType === 'Unmatched' ||
                portalRecord.matchType === 'Conflict' ||
                portalRecord.matchStatus === 'Unmatched' ||
                portalRecord.matchStatus === 'Conflicted'
              }
            />
          </Card>

          {/* Show Conflict Resolution Interface for conflict records */}
          {(portalRecord.matchType === 'Conflict' || portalRecord.matchStatus === 'Conflicted') && (
            <Card className="p-6 mt-6">
              <ConflictResolutionInterface
                record={portalRecord}
                onResolvePrimary={(selectedRecordId) => {
                  console.log(`Setting ${selectedRecordId} as primary for conflict ${portalRecord.id}`);
                  toast.success("Conflict Resolved", {
                    description: `Primary record selected. Conflict has been resolved for ${portalRecord.invoiceNumber}.`,
                  });
                  navigate("/portal-records");
                }}
                onDiscardRecord={() => {
                  console.log(`Discarding all records for conflict ${portalRecord.id}`);
                  toast.success("Records Discarded", {
                    description: `All conflicting records have been discarded for ${portalRecord.invoiceNumber}.`,
                  });
                  navigate("/portal-records");
                }}
              />
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="">
          <div className="bg-white rounded-lg">
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
              {/* Timeline Panel */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">Coming Soon</p>
                  </div>
                </div>
              </ResizablePanel>

              {/* Resizable Handle */}
              <ResizableHandle withHandle />

              {/* Notes Panel */}
              <ResizablePanel defaultSize={40} minSize={30}>
                <NotesThread
                  notes={notes}
                  addNote={addNote}
                  removeNoteAttachment={removeNoteAttachment}
                  scrollRef={scrollRef}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </TabsContent>
      </Tabs>

      <PortalRecordActionInstructions
        portalRecord={portalRecord}
        onMatchInvoice={handleMatchInvoice}
        onResolveConflict={handleResolveConflict}
        onIgnoreRecord={handleIgnoreRecord}
      />

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
