
import { PortalRecord } from "@/types/portalRecord";
import { EnhancedMatchInvoiceModal } from "../actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "../actions/EnhancedResolveConflictModal";
import { IgnoreRecordModal } from "../actions/IgnoreRecordModal";

interface PortalRecordsModalsProps {
  selectedRecord: PortalRecord | null;
  matchModalOpen: boolean;
  setMatchModalOpen: (open: boolean) => void;
  conflictModalOpen: boolean;
  setConflictModalOpen: (open: boolean) => void;
  ignoreModalOpen: boolean;
  setIgnoreModalOpen: (open: boolean) => void;
  onInvoiceMatched: (invoiceId: string) => void;
  onConflictResolved: (selectedRecordId: string, action: 'primary' | 'alternate') => void;
  onRecordIgnored: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
}

export function PortalRecordsModals({
  selectedRecord,
  matchModalOpen,
  setMatchModalOpen,
  conflictModalOpen,
  setConflictModalOpen,
  ignoreModalOpen,
  setIgnoreModalOpen,
  onInvoiceMatched,
  onConflictResolved,
  onRecordIgnored,
  onMatchAndCreateRTP
}: PortalRecordsModalsProps) {
  if (!selectedRecord) return null;

  return (
    <>
      <EnhancedMatchInvoiceModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        record={selectedRecord}
        onMatch={onInvoiceMatched}
        onIgnore={onRecordIgnored}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
      />
      
      <EnhancedResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        record={selectedRecord}
        onResolve={onConflictResolved}
      />
      
      <IgnoreRecordModal
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        record={selectedRecord}
        onIgnore={onRecordIgnored}
      />
    </>
  );
}
