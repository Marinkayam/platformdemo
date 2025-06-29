
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfirmMatchModal } from "../match-modal/ConfirmMatchModal";
import { EnhancedIgnoreRecordModal } from "../EnhancedIgnoreRecordModal";
import { PortalRecord } from "@/types/portalRecord";

interface ConfirmationModalsProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  showMatchConfirmModal: boolean;
  setShowMatchConfirmModal: (show: boolean) => void;
  showIgnoreModal: boolean;
  setShowIgnoreModal: (show: boolean) => void;
  record: PortalRecord;
  selectedInvoiceId: string;
  onConfirmClose: () => void;
  onConfirmMatch: () => void;
  onIgnoreRecord: () => void;
  onStopTrackingBuyer: () => void;
}

export function ConfirmationModals({
  showConfirmModal,
  setShowConfirmModal,
  showMatchConfirmModal,
  setShowMatchConfirmModal,
  showIgnoreModal,
  setShowIgnoreModal,
  record,
  selectedInvoiceId,
  onConfirmClose,
  onConfirmMatch,
  onIgnoreRecord,
  onStopTrackingBuyer,
}: ConfirmationModalsProps) {
  return (
    <>
      {/* Discard Changes Confirmation Modal */}
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
                onClick={onConfirmClose}
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
        onConfirm={onConfirmMatch}
        record={record}
        selectedInvoiceId={selectedInvoiceId}
      />

      {/* Ignore Record Modal */}
      <EnhancedIgnoreRecordModal
        isOpen={showIgnoreModal}
        onClose={() => setShowIgnoreModal(false)}
        record={record}
        onIgnoreRecord={onIgnoreRecord}
        onStopTrackingBuyer={onStopTrackingBuyer}
      />
    </>
  );
}
