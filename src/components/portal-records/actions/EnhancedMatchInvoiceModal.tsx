import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsNav } from "@/components/common/TabsNav";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { PortalRecordDetails } from "./match-modal/PortalRecordDetails";
import { MatchExistingInvoiceTab } from "./match-modal/MatchExistingInvoiceTab";
import { CreateRTPTab } from "./match-modal/CreateRTPTab";
import { MatchModalActions } from "./match-modal/MatchModalActions";
import { ConfirmMatchModal } from "./match-modal/ConfirmMatchModal";

interface EnhancedMatchInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onMatch: (invoiceId: string) => void;
  onIgnore: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
  contextSource?: 'detail-page' | 'table-row' | 'dashboard';
}

export function EnhancedMatchInvoiceModal({ 
  isOpen, 
  onClose, 
  record, 
  onMatch, 
  onIgnore,
  onMatchAndCreateRTP,
  contextSource = 'table-row'
}: EnhancedMatchInvoiceModalProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState(record.portal);
  const [selectedBuyer, setSelectedBuyer] = useState(record.buyer);
  const [activeTab, setActiveTab] = useState("match-existing");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMatchConfirmModal, setShowMatchConfirmModal] = useState(false);
  
  // Create RTP form fields
  const [rtpInvoiceNumber, setRtpInvoiceNumber] = useState("");
  const [rtpInvoiceDate, setRtpInvoiceDate] = useState("");
  const [rtpAmount, setRtpAmount] = useState(record.total.toString());
  const [rtpPoNumber, setRtpPoNumber] = useState(record.poNumber);

  // Enhanced search with debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleMatch = () => {
    if (!selectedInvoiceId) {
      toast({
        title: "Selection Required",
        description: "Please select an invoice to match.",
        variant: "destructive",
      });
      return;
    }
    setShowMatchConfirmModal(true);
  };

  const confirmMatch = () => {
    onMatch(selectedInvoiceId);
    onClose();
    resetForm();
    setShowMatchConfirmModal(false);
  };

  const handleIgnore = () => {
    onIgnore();
    toast({
      title: "Record Ignored",
      description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
    });
    onClose();
    resetForm();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleMatchAndCreateRTP = () => {
    if (!uploadedFile) {
      toast({
        title: "PDF Required",
        description: "Please upload an invoice PDF to create RTP.",
        variant: "destructive",
      });
      return;
    }

    onMatchAndCreateRTP(uploadedFile);
    onClose();
    resetForm();
  };

  const handleMakePrimary = () => {
    toast({
      title: "Record Made Primary",
      description: `${record.portalRecordId} has been made the primary record.`,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedInvoiceId("");
    setSearchTerm("");
    setUploadedFile(null);
    setRtpInvoiceNumber("");
    setRtpInvoiceDate("");
    setRtpAmount(record.total.toString());
    setRtpPoNumber(record.poNumber);
    setActiveTab("match-existing");
  };

  const handleCloseAttempt = () => {
    if (uploadedFile || selectedInvoiceId) {
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowConfirmModal(false);
    onClose();
    resetForm();
  };

  // Determine if we should show the compact layout
  const isCompactMode = contextSource === 'detail-page';

  const tabs = [
    { id: "match-existing", label: "Match Existing Invoice" },
    { id: "create-rtp", label: "Create RTP" }
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
        <DialogContent className={`${isCompactMode ? 'max-w-4xl' : 'max-w-6xl'} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Match Portal Record - {record.portalRecordId}
            </DialogTitle>
          </DialogHeader>
          
          {isCompactMode ? (
            // Compact mode layout for detail page
            <div className="space-y-6 p-6">
              {/* Full-width Action Area */}
              <div className="space-y-6">
                <TabsNav 
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {activeTab === "match-existing" && (
                  <MatchExistingInvoiceTab
                    record={record}
                    selectedInvoiceId={selectedInvoiceId}
                    setSelectedInvoiceId={setSelectedInvoiceId}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedPortal={selectedPortal}
                    setSelectedPortal={setSelectedPortal}
                    selectedBuyer={selectedBuyer}
                    setSelectedBuyer={setSelectedBuyer}
                    debouncedSearchTerm={debouncedSearchTerm}
                    onMakePrimary={handleMakePrimary}
                  />
                )}

                {activeTab === "create-rtp" && (
                  <CreateRTPTab
                    record={record}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    rtpInvoiceNumber={rtpInvoiceNumber}
                    setRtpInvoiceNumber={setRtpInvoiceNumber}
                    rtpInvoiceDate={rtpInvoiceDate}
                    setRtpInvoiceDate={setRtpInvoiceDate}
                    rtpAmount={rtpAmount}
                    setRtpAmount={setRtpAmount}
                    rtpPoNumber={rtpPoNumber}
                    setRtpPoNumber={setRtpPoNumber}
                    onFileUpload={handleFileUpload}
                  />
                )}
              </div>
            </div>
          ) : (
            // Original two-column layout with improved styling
            <div className="grid grid-cols-5 gap-8 p-6">
              {/* Portal Record Details - Enhanced */}
              <div className="col-span-2">
                <PortalRecordDetails record={record} />
              </div>

              {/* Action Area - Enhanced */}
              <div className="col-span-3">
                <div className="space-y-6">
                  <TabsNav 
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />

                  {activeTab === "match-existing" && (
                    <MatchExistingInvoiceTab
                      record={record}
                      selectedInvoiceId={selectedInvoiceId}
                      setSelectedInvoiceId={setSelectedInvoiceId}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedPortal={selectedPortal}
                      setSelectedPortal={setSelectedPortal}
                      selectedBuyer={selectedBuyer}
                      setSelectedBuyer={setSelectedBuyer}
                      debouncedSearchTerm={debouncedSearchTerm}
                      onMakePrimary={handleMakePrimary}
                    />
                  )}

                  {activeTab === "create-rtp" && (
                    <CreateRTPTab
                      record={record}
                      uploadedFile={uploadedFile}
                      setUploadedFile={setUploadedFile}
                      rtpInvoiceNumber={rtpInvoiceNumber}
                      setRtpInvoiceNumber={setRtpInvoiceNumber}
                      rtpInvoiceDate={rtpInvoiceDate}
                      setRtpInvoiceDate={setRtpInvoiceDate}
                      rtpAmount={rtpAmount}
                      setRtpAmount={setRtpAmount}
                      rtpPoNumber={rtpPoNumber}
                      setRtpPoNumber={setRtpPoNumber}
                      onFileUpload={handleFileUpload}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-border bg-muted/30 px-6 py-4">
            <MatchModalActions
              activeTab={activeTab}
              selectedInvoiceId={selectedInvoiceId}
              uploadedFile={uploadedFile}
              rtpInvoiceNumber={rtpInvoiceNumber}
              rtpInvoiceDate={rtpInvoiceDate}
              onClose={handleCloseAttempt}
              onIgnore={handleIgnore}
              onMatch={handleMatch}
              onMatchAndCreateRTP={handleMatchAndCreateRTP}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes. Are you sure you want to close without saving?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium"
              >
                Continue Editing
              </button>
              <button 
                onClick={confirmClose}
                className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 font-medium"
              >
                Yes, Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Match Confirmation Modal */}
      <ConfirmMatchModal
        isOpen={showMatchConfirmModal}
        onClose={() => setShowMatchConfirmModal(false)}
        onConfirm={confirmMatch}
        record={record}
        selectedInvoiceId={selectedInvoiceId}
      />
    </>
  );
}
