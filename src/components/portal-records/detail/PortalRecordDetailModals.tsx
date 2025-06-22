
import { PortalRecord } from "@/types/portalRecord";
import { EnhancedMatchInvoiceModal } from "@/components/portal-records/actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "@/components/portal-records/actions/EnhancedResolveConflictModal";
import { IgnoreRecordModal } from "@/components/portal-records/actions/IgnoreRecordModal";
import { SyncRecordModal } from "@/components/portal-records/actions/SyncRecordModal";

interface PortalRecordDetailModalsProps {
  portalRecord: PortalRecord;
  matchModalOpen: boolean;
  conflictModalOpen: boolean;
  syncModalOpen: boolean;
  ignoreModalOpen: boolean;
  onCloseMatchModal: () => void;
  onCloseConflictModal: () => void;
  onCloseSyncModal: () => void;
  onCloseIgnoreModal: () => void;
  onInvoiceMatched: (invoiceId: string) => void;
  onConflictResolved: (selectedRecordId: string, action: 'primary' | 'alternate') => void;
  onRecordSynced: () => void;
  onRecordIgnored: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
}

export function PortalRecordDetailModals({
  portalRecord,
  matchModalOpen,
  conflictModalOpen,
  syncModalOpen,
  ignoreModalOpen,
  onCloseMatchModal,
  onCloseConflictModal,
  onCloseSyncModal,
  onCloseIgnoreModal,
  onInvoiceMatched,
  onConflictResolved,
  onRecordSynced,
  onRecordIgnored,
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
      />
      
      <EnhancedResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={onCloseConflictModal}
        record={portalRecord}
        onResolve={onConflictResolved}
      />

      <IgnoreRecordModal
        isOpen={ignoreModalOpen}
        onClose={onCloseIgnoreModal}
        record={portalRecord}
        onIgnore={onRecordIgnored}
      />
      
      <SyncRecordModal
        isOpen={syncModalOpen}
        onClose={onCloseSyncModal}
        record={portalRecord}
        onSync={onRecordSynced}
      />
    </>
  );
}
