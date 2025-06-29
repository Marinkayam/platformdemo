
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MatchModalActions } from "./match-modal/MatchModalActions";
import { ConfirmationModals } from "./enhanced-match-modal/ConfirmationModals";
import { ModalContent } from "./enhanced-match-modal/ModalContent";
import { useModalState } from "./enhanced-match-modal/useModalState";
import { useModalHandlers } from "./enhanced-match-modal/useModalHandlers";
import { EnhancedMatchInvoiceModalProps } from "./enhanced-match-modal/types";

export function EnhancedMatchInvoiceModal({ 
  isOpen, 
  onClose, 
  record, 
  onMatch, 
  onIgnore,
  onMatchAndCreateRTP,
  contextSource = 'table-row'
}: EnhancedMatchInvoiceModalProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMatchConfirmModal, setShowMatchConfirmModal] = useState(false);
  const [showIgnoreModal, setShowIgnoreModal] = useState(false);

  const modalState = useModalState(record);
  
  const handlers = useModalHandlers({
    record,
    selectedInvoiceId: modalState.selectedInvoiceId,
    uploadedFile: modalState.uploadedFile,
    onMatch,
    onIgnore,
    onMatchAndCreateRTP,
    onClose,
    resetForm: modalState.resetForm,
    setShowMatchConfirmModal,
    setShowIgnoreModal,
    setShowConfirmModal,
  });

  const isCompactMode = contextSource === 'detail-page';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handlers.handleCloseAttempt}>
        <DialogContent className={`${isCompactMode ? 'max-w-4xl' : 'max-w-6xl'} max-h-[95vh] flex flex-col p-0 overflow-hidden`}>
          <DialogHeader className="border-b border-border p-4 pb-3 flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/10">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Match Portal Record
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Connect portal record {record.portalRecordId} to an existing invoice or upload a new one to create an RTP record
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            <ModalContent
              isCompactMode={isCompactMode}
              record={record}
              selectedInvoiceId={modalState.selectedInvoiceId}
              setSelectedInvoiceId={modalState.setSelectedInvoiceId}
              searchTerm={modalState.searchTerm}
              setSearchTerm={modalState.setSearchTerm}
              selectedPortal={modalState.selectedPortal}
              setSelectedPortal={modalState.setSelectedPortal}
              selectedBuyer={modalState.selectedBuyer}
              setSelectedBuyer={modalState.setSelectedBuyer}
              debouncedSearchTerm={modalState.debouncedSearchTerm}
              uploadedFile={modalState.uploadedFile}
              setUploadedFile={modalState.setUploadedFile}
              onMakePrimary={handlers.handleMakePrimary}
              onMatchAndCreateRTP={handlers.handleMatchAndCreateRTP}
            />
          </div>

          <div className="border-t border-border bg-muted/30 flex-shrink-0">
            <MatchModalActions
              activeTab="match-existing"
              selectedInvoiceId={modalState.selectedInvoiceId}
              uploadedFile={modalState.uploadedFile}
              rtpInvoiceNumber=""
              rtpInvoiceDate=""
              onClose={handlers.handleCloseAttempt}
              onIgnore={handlers.handleIgnore}
              onMatch={handlers.handleMatch}
              onMatchAndCreateRTP={handlers.handleMatchAndCreateRTP}
            />
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationModals
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        showMatchConfirmModal={showMatchConfirmModal}
        setShowMatchConfirmModal={setShowMatchConfirmModal}
        showIgnoreModal={showIgnoreModal}
        setShowIgnoreModal={setShowIgnoreModal}
        record={record}
        selectedInvoiceId={modalState.selectedInvoiceId}
        onConfirmClose={handlers.confirmClose}
        onConfirmMatch={handlers.confirmMatch}
        onIgnoreRecord={handlers.handleIgnoreRecord}
        onStopTrackingBuyer={handlers.handleStopTrackingBuyer}
      />
    </>
  );
}
