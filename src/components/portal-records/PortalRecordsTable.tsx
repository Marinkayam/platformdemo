
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableFooter, TableRow, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);

  // Sort records to prioritize unmatched and conflict records
  const sortedRecords = [...records].sort((a, b) => {
    const priorityOrder = { 'Unmatched': 0, 'Conflict': 1, 'Primary': 2, 'Alternate': 3 };
    const aPriority = priorityOrder[a.matchType] ?? 4;
    const bPriority = priorityOrder[b.matchType] ?? 4;
    return aPriority - bPriority;
  });

  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setVisibleCount(prev => Math.min(prev + 10, sortedRecords.length));
    setIsLoading(false);
  };

  const handleViewDetails = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  const handleRowClick = (record: PortalRecord) => {
    navigate(`/portal-records/${record.id}`);
  };

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
    console.log('Opening ignore modal for record:', record.id);
    setSelectedRecord(record);
    setIgnoreModalOpen(true);
  };

  const onInvoiceMatched = (invoiceId: string) => {
    console.log(`Matched invoice ${invoiceId} with record ${selectedRecord?.id}`);
    setMatchModalOpen(false);
    setSelectedRecord(null);
    // TODO: Update record state in real implementation
  };

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate') => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${selectedRecord?.id}`);
    setConflictModalOpen(false);
    setSelectedRecord(null);
    // TODO: Update record state in real implementation
  };

  const onRecordIgnored = () => {
    console.log(`Ignored record ${selectedRecord?.id}`);
    setIgnoreModalOpen(false);
    setSelectedRecord(null);
    // TODO: Remove record from state in real implementation
  };

  const onStopTrackingBuyer = () => {
    console.log(`Stopped tracking buyer ${selectedRecord?.buyer}`);
    setIgnoreModalOpen(false);
    setSelectedRecord(null);
    // TODO: Remove all records from this buyer in real implementation
  };

  const onMatchAndCreateRTP = (pdfFile: File) => {
    console.log(`Creating RTP for record ${selectedRecord?.id} with PDF:`, pdfFile.name);
    setMatchModalOpen(false);
    setSelectedRecord(null);
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
        currentPage={1}
        recordsPerPage={10}
        onPageChange={() => {}}
      />
    );
  }

  return (
    <div className="space-y-0">
      <div className="rounded-xl border overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            
            <TableBody className="divide-y divide-gray-100">
              {visibleRecords.map((record) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                  onClick={() => handleRowClick(record)}
                >
                  {columns.map((column, index) => (
                    <TableCell key={index} className={column.className}>
                      {column.render ? column.render(record) : record[column.key as keyof PortalRecord]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              
              {/* Loading skeleton rows */}
              {isLoading && Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`loading-${index}`} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            
            <PortalRecordsTableFooter records={sortedRecords} />
          </Table>
        </div>
      </div>

      {/* Load More Section */}
      {hasMore && (
        <div className="flex justify-center py-4">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            variant="outline"
            className="animate-fade-in"
          >
            {isLoading ? 'Loading...' : `Load ${Math.min(10, sortedRecords.length - visibleCount)} more records`}
          </Button>
        </div>
      )}

      <PortalRecordsModals
        selectedRecord={selectedRecord}
        matchModalOpen={matchModalOpen}
        setMatchModalOpen={setMatchModalOpen}
        conflictModalOpen={conflictModalOpen}
        setConflictModalOpen={setConflictModalOpen}
        ignoreModalOpen={ignoreModalOpen}
        setIgnoreModalOpen={setIgnoreModalOpen}
        onInvoiceMatched={onInvoiceMatched}
        onConflictResolved={onConflictResolved}
        onRecordIgnored={onRecordIgnored}
        onStopTrackingBuyer={onStopTrackingBuyer}
        onMatchAndCreateRTP={onMatchAndCreateRTP}
      />
    </div>
  );
}
