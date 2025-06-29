
import { PortalRecord } from "@/types/portalRecord";
import { EnhancedMatchInvoiceModal } from "../actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "../actions/EnhancedResolveConflictModal";
import { EnhancedIgnoreRecordModal } from "../actions/EnhancedIgnoreRecordModal";

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
  onStopTrackingBuyer: () => void;
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
  onStopTrackingBuyer,
  onMatchAndCreateRTP
}: PortalRecordsModalsProps) {
  console.log('PortalRecordsModals render:', { 
    selectedRecord: selectedRecord?.id, 
    ignoreModalOpen,
    matchModalOpen,
    conflictModalOpen 
  });

  if (!selectedRecord) {
    console.log('No selected record, not rendering modals');
    return null;
  }

  return (
    <>
      <EnhancedMatchInvoiceModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        record={selectedRecord}
        onMatch={onInvoiceMatched}
        onIgnore={onRecordIgnored}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
        contextSource="table-row"
      />
      
      <EnhancedResolveConflictModal
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        record={selectedRecord}
        onResolve={onConflictResolved}
        onIgnore={onRecordIgnored}
      />
      
      <EnhancedIgnoreRecordModal
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        record={selectedRecord}
        onIgnoreRecord={onRecordIgnored}
        onStopTrackingBuyer={onStopTrackingBuyer}
      />
    </>
  );
}
