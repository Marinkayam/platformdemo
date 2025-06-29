
import { PortalRecord } from "@/types/portalRecord";
import { EnhancedMatchInvoiceModal } from "@/components/portal-records/actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "@/components/portal-records/actions/EnhancedResolveConflictModal";
import { EnhancedIgnoreRecordModal } from "@/components/portal-records/actions/EnhancedIgnoreRecordModal";

interface PortalRecordDetailModalsProps {
  portalRecord: PortalRecord;
  matchModalOpen: boolean;
  conflictModalOpen: boolean;
  ignoreModalOpen: boolean;
  onCloseMatchModal: () => void;
  onCloseConflictModal: () => void;
  onCloseIgnoreModal: () => void;
  onInvoiceMatched: (invoiceId: string) => void;
  onConflictResolved: (selectedRecordId: string, action: 'primary' | 'alternate') => void;
  onRecordIgnored: () => void;
  onStopTrackingBuyer: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
}

export function PortalRecordDetailModals({
  portalRecord,
  matchModalOpen,
  conflictModalOpen,
  ignoreModalOpen,
  onCloseMatchModal,
  onCloseConflictModal,
  onCloseIgnoreModal,
  onInvoiceMatched,
  onConflictResolved,
  onRecordIgnored,
  onStopTrackingBuyer,
  onMatchAndCreateRTP,
}: PortalRecordDetailModalsProps) {
  return (
    <>
      <EnhancedMatchInvoiceModal
        isOpen={matchModalOpen}
        onClose={onCloseMatchModal}
        record={portalRecord}
        onMatch={onInvoiceMatched}
        onIgnore={onRecordIgnored}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
        contextSource="detail-page"
      />
      
      <EnhancedResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={onCloseConflictModal}
        record={portalRecord}
        onResolve={onConflictResolved}
      />

      <EnhancedIgnoreRecordModal
        isOpen={ignoreModalOpen}
        onClose={onCloseIgnoreModal}
        record={portalRecord}
        onIgnoreRecord={onRecordIgnored}
        onStopTrackingBuyer={onStopTrackingBuyer}
      />
    </>
  );
}
