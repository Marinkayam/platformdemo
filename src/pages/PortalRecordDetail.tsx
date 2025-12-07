
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
import { RelatedPortalRecordsTable } from "@/components/portal-records/detail/RelatedPortalRecordsTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { NotesThread } from "@/components/invoices/detail/NotesThread";
import { FinancialData } from "@/components/invoices/detail/FinancialData";
import { PdfViewer } from "@/components/invoices/detail/PdfViewer";
import { useNotes } from "@/hooks/useNotes";
import { Invoice, LineItem } from "@/types/invoice";
import { toast } from "sonner";

export default function PortalRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("record-data");
  const [zoomLevel, setZoomLevel] = useState(1.0);
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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  // Mock invoice data derived from portal record
  const mockInvoice: Invoice = {
    id: portalRecord.id,
    number: portalRecord.invoiceNumber || 'INV-00000005',
    buyer: portalRecord.buyer,
    supplierName: portalRecord.supplierName,
    invoiceDate: portalRecord.issueDate || '2024-01-22',
    dueDate: portalRecord.dueDate || '2024-01-29',
    total: portalRecord.total,
    subtotal: portalRecord.subtotal,
    tax: portalRecord.taxTotal,
    currency: portalRecord.currency || 'USD',
    status: 'Processing',
    poNumber: portalRecord.poNumber,
    netTerms: portalRecord.netTerms || portalRecord.paymentTerms || 'Net 30',
    portal: portalRecord.portal,
  };

  // Mock line items
  const mockLineItems: LineItem[] = [
    { id: "1", description: "Software License", quantity: 5, unitPrice: 99.99, total: 499.95 },
    { id: "2", description: "Implementation Services", quantity: 10, unitPrice: 150, total: 1500 },
    { id: "3", description: "Support Package", quantity: 1, unitPrice: 350.25, total: 350.25 },
  ];

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

          {/* Related Portal Records Table - Separate Card */}
          <Card className="p-6 mt-6">
            <RelatedPortalRecordsTable
              currentRecord={portalRecord}
              onViewDetails={(recordId) => navigate(`/portal-records/${recordId}`)}
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

        <TabsContent value="invoice-data" className="mt-6">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-xl border border-[#E4E5E9]">
            <ResizablePanel defaultSize={55} className="p-6 bg-white">
              <FinancialData invoice={mockInvoice} lineItems={mockLineItems} />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={45} className="p-6 border-l border-[#E4E5E9] bg-white">
              <PdfViewer invoice={mockInvoice} lineItems={mockLineItems} zoomLevel={zoomLevel} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            </ResizablePanel>
          </ResizablePanelGroup>
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
