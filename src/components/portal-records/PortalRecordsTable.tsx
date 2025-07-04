import React from "react";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordsTableFooter } from "./PortalRecordsTableFooter";
import { PortalRecordsEmptyState } from "./table/PortalRecordsEmptyState";
import { PortalRecordsModals } from "./table/PortalRecordsModals";
import { usePortalRecordsTableColumns } from "./table/PortalRecordsTableColumns";
import { usePortalRecordsTable } from "./hooks/usePortalRecordsTable";
import { usePortalRecordsActions } from "./hooks/usePortalRecordsActions";
import { PortalRecordsTableContent } from "./components/PortalRecordsTableContent";
import { PortalRecordsLoadMore } from "./components/PortalRecordsLoadMore";

interface PortalRecordsTableProps {
  records: PortalRecord[];
  isLoading?: boolean;
}

export function PortalRecordsTable({ records, isLoading = false }: PortalRecordsTableProps) {
  const {
    visibleRecords,
    sortedRecords,
    hasMore,
    isLoadingMore,
    visibleCount,
    matchModalOpen,
    setMatchModalOpen,
    conflictModalOpen,
    setConflictModalOpen,
    ignoreModalOpen,
    setIgnoreModalOpen,
    selectedRecord,
    setSelectedRecord,
    handleLoadMore,
    handleViewDetails,
    handleRowClick,
  } = usePortalRecordsTable(records);

  const {
    handleMatchInvoice,
    handleResolveConflict,
    handleIgnoreRecord,
    onInvoiceMatched,
    onConflictResolved,
    onRecordIgnored,
    onStopTrackingBuyer,
    onMatchAndCreateRTP,
  } = usePortalRecordsActions({
    setSelectedRecord,
    setMatchModalOpen,
    setConflictModalOpen,
    setIgnoreModalOpen,
  });

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
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-[#F6F7F9] border-b border-gray-100">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className={`h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm ${column.className || ''}`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            
            <PortalRecordsTableContent
              isLoading={isLoading}
              visibleRecords={visibleRecords}
              isLoadingMore={isLoadingMore}
              onViewDetails={handleViewDetails}
              onMatchInvoice={handleMatchInvoice}
              onResolveConflict={handleResolveConflict}
              onIgnoreRecord={handleIgnoreRecord}
              onRowClick={handleRowClick}
            />
            
            {!isLoading && <PortalRecordsTableFooter records={sortedRecords} />}
          </table>
        </div>
      </div>

      <PortalRecordsLoadMore
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        remainingCount={sortedRecords.length - visibleCount}
        onLoadMore={handleLoadMore}
      />

      <PortalRecordsModals
        selectedRecord={selectedRecord}
        matchModalOpen={matchModalOpen}
        setMatchModalOpen={setMatchModalOpen}
        conflictModalOpen={conflictModalOpen}
        setConflictModalOpen={setConflictModalOpen}
        ignoreModalOpen={ignoreModalOpen}
        setIgnoreModalOpen={setIgnoreModalOpen}
        onInvoiceMatched={(invoiceId) => onInvoiceMatched(invoiceId, selectedRecord)}
        onConflictResolved={(selectedRecordId, action) => onConflictResolved(selectedRecordId, action, selectedRecord)}
        onRecordIgnored={() => onRecordIgnored(selectedRecord)}
        onStopTrackingBuyer={() => onStopTrackingBuyer(selectedRecord)}
        onMatchAndCreateRTP={(pdfFile) => onMatchAndCreateRTP(pdfFile, selectedRecord)}
      />
    </div>
  );
}
