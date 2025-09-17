import { PortalRecord } from "@/types/portalRecord";

interface UsePortalRecordsActionsProps {
  setSelectedRecord: (record: PortalRecord | null) => void;
  setMatchModalOpen: (open: boolean) => void;
  setConflictModalOpen: (open: boolean) => void;
  setIgnoreModalOpen: (open: boolean) => void;
}

export function usePortalRecordsActions({
  setSelectedRecord,
  setMatchModalOpen,
  setConflictModalOpen,
  setIgnoreModalOpen,
}: UsePortalRecordsActionsProps) {
  const handleMatchInvoice = (record: PortalRecord) => {
    console.log('Opening match modal for record:', record.id);
    setSelectedRecord(record);
    setMatchModalOpen(true);
  };

  const handleResolveConflict = (record: PortalRecord) => {
    console.log('Opening conflict modal for record:', record.id);
    setSelectedRecord(record);
    setConflictModalOpen(true);
  };

  const handleIgnoreRecord = (record: PortalRecord) => {
    console.log('handleIgnoreRecord called for record:', record.id);
    console.log('Setting selectedRecord and opening modal...');
    setSelectedRecord(record);
    setIgnoreModalOpen(true);
    console.log('Modal should now be open');
  };

  const onInvoiceMatched = (invoiceId: string, selectedRecord: PortalRecord | null) => {
    console.log(`Matched invoice ${invoiceId} with record ${selectedRecord?.id}`);
    setMatchModalOpen(false);
    setSelectedRecord(null);
    // TODO: Update record state in real implementation
  };

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate', selectedRecord: PortalRecord | null) => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${selectedRecord?.id}`);
    setConflictModalOpen(false);
    setSelectedRecord(null);
    // TODO: Update record state in real implementation
  };

  const onRecordIgnored = (selectedRecord: PortalRecord | null) => {
    console.log(`Ignored record ${selectedRecord?.id}`);
    setIgnoreModalOpen(false);
    setSelectedRecord(null);
    // TODO: Remove record from state in real implementation
  };

  const onStopTrackingBuyer = (selectedRecord: PortalRecord | null) => {
    console.log(`Stopped tracking buyer ${selectedRecord?.buyer}`);
    setIgnoreModalOpen(false);
    setSelectedRecord(null);
    // TODO: Remove all records from this buyer in real implementation
  };

  const onMatchAndCreateRTP = (pdfFile: File, selectedRecord: PortalRecord | null) => {
    console.log(`Creating RTP for record ${selectedRecord?.id} with PDF:`, pdfFile.name);
    setMatchModalOpen(false);
    setSelectedRecord(null);
    // TODO: Implement RTP creation logic
  };

  return {
    handleMatchInvoice,
    handleResolveConflict,
    handleIgnoreRecord,
    onInvoiceMatched,
    onConflictResolved,
    onRecordIgnored,
    onStopTrackingBuyer,
    onMatchAndCreateRTP,
  };
}