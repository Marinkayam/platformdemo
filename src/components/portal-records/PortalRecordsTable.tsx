
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableSystem } from "@/components/ui/TableSystem";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordsTableFooter } from "./PortalRecordsTableFooter";
import { PortalRecordsEmptyState } from "./table/PortalRecordsEmptyState";
import { PortalRecordsModals } from "./table/PortalRecordsModals";
import { usePortalRecordsTableColumns } from "./table/PortalRecordsTableColumns";

interface PortalRecordsTableProps {
  records: PortalRecord[];
}

export function PortalRecordsTable({ records }: PortalRecordsTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  const handleMatchInvoice = (record: PortalRecord) => {
    setSelectedRecord(record);
    setMatchModalOpen(true);
  };

  const handleResolveConflict = (record: PortalRecord) => {
    setSelectedRecord(record);
    setConflictModalOpen(true);
  };

  const handleSyncRecord = (record: PortalRecord) => {
    setSelectedRecord(record);
    setSyncModalOpen(true);
  };

  const handleIgnoreRecord = (record: PortalRecord) => {
    setSelectedRecord(record);
    setIgnoreModalOpen(true);
  };

  const onInvoiceMatched = (invoiceId: string) => {
    console.log(`Matched invoice ${invoiceId} with record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate') => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onRecordSynced = () => {
    console.log(`Synced record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onRecordIgnored = () => {
    console.log(`Ignored record ${selectedRecord?.id}`);
    // TODO: Remove record from state in real implementation
  };

  const onMatchAndCreateRTP = (pdfFile: File) => {
    console.log(`Creating RTP for record ${selectedRecord?.id} with PDF:`, pdfFile.name);
    // TODO: Implement RTP creation logic
  };

  const columns = usePortalRecordsTableColumns({
    onViewDetails: handleViewDetails,
    onMatchInvoice: handleMatchInvoice,
    onResolveConflict: handleResolveConflict,
    onIgnoreRecord: handleIgnoreRecord
  });

  if (records.length === 0) {
    return (
      <PortalRecordsEmptyState
        columns={columns}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    );
  }

  return (
    <div className="space-y-0">
      <TableSystem 
        data={currentRecords}
        columns={columns}
        rowClassName="hover:bg-gray-50 cursor-pointer"
      />
      <PortalRecordsTableFooter 
        totalRecords={records.length}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
        records={records}
      />

      <PortalRecordsModals
        selectedRecord={selectedRecord}
        matchModalOpen={matchModalOpen}
        setMatchModalOpen={setMatchModalOpen}
        conflictModalOpen={conflictModalOpen}
        setConflictModalOpen={setConflictModalOpen}
        syncModalOpen={syncModalOpen}
        setSyncModalOpen={setSyncModalOpen}
        ignoreModalOpen={ignoreModalOpen}
        setIgnoreModalOpen={setIgnoreModalOpen}
        onInvoiceMatched={onInvoiceMatched}
        onConflictResolved={onConflictResolved}
        onRecordSynced={onRecordSynced}
        onRecordIgnored={onRecordIgnored}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
      />
    </div>
  );
}
