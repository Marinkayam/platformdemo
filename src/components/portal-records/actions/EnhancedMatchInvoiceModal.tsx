
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PortalRecordDetails } from "./match-modal/PortalRecordDetails";
import { MatchExistingInvoiceTab } from "./match-modal/MatchExistingInvoiceTab";
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
  const navigate = useNavigate();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState(record.portal);
  const [selectedBuyer, setSelectedBuyer] = useState(record.buyer);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMatchConfirmModal, setShowMatchConfirmModal] = useState(false);

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
    
    // Show success toast
    toast({
      title: "Invoice Successfully Matched!",
      description: `Portal record ${record.portalRecordId} has been matched with invoice ${selectedInvoiceId}.`,
      variant: "success",
    });
    
    // Navigate back to portal records table
    setTimeout(() => {
      navigate('/portal-records');
    }, 1500);
    
    onClose();
    resetForm();
    setShowMatchConfirmModal(false);
  };

  const handleIgnore = () => {
    onIgnore();
    toast({
      title: "Record Ignored",
      description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
      variant: "warning",
    });
    
    // Navigate back to portal records table
    setTimeout(() => {
      navigate('/portal-records');
    }, 1500);
    
    onClose();
    resetForm();
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
    
    toast({
      title: "RTP Record Created!",
      description: `New RTP record has been created from uploaded invoice.`,
      variant: "success",
    });
    
    // Navigate back to portal records table
    setTimeout(() => {
      navigate('/portal-records');
    }, 1500);
    
    onClose();
    resetForm();
  };

  const handleMakePrimary = () => {
    toast({
      title: "Record Made Primary",
      description: `${record.portalRecordId} has been made the primary record.`,
      variant: "success",
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedInvoiceId("");
    setSearchTerm("");
    setUploadedFile(null);
    setSelectedPortal(record.portal);
    setSelectedBuyer(record.buyer);
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
        <DialogContent className={`${isCompactMode ? 'max-w-4xl' : 'max-w-6xl'} max-h-[95vh] flex flex-col p-0 overflow-hidden`}>
          <DialogHeader className="border-b border-border p-6 pb-4 flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/10">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Match Portal Record - {record.portalRecordId}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            {isCompactMode ? (
              // Compact mode layout for detail page
              <div className="space-y-6">
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
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                  onMakePrimary={handleMakePrimary}
                  onMatchAndCreateRTP={handleMatchAndCreateRTP}
                />
              </div>
            ) : (
              // Original two-column layout with improved styling
              <div className="grid grid-cols-5 gap-8">
                {/* Portal Record Details */}
                <div className="col-span-2">
                  <PortalRecordDetails record={record} />
                </div>

                {/* Action Area */}
                <div className="col-span-3">
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
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    onMakePrimary={handleMakePrimary}
                    onMatchAndCreateRTP={handleMatchAndCreateRTP}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-muted/30 flex-shrink-0">
            <MatchModalActions
              activeTab="match-existing"
              selectedInvoiceId={selectedInvoiceId}
              uploadedFile={uploadedFile}
              rtpInvoiceNumber=""
              rtpInvoiceDate=""
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
            <DialogTitle>Discard Changes?</DialogTitle>
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
                Discard Changes
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
