import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordsTableFooter } from "./PortalRecordsTableFooter";
import { PortalRecordsEmptyState } from "./table/PortalRecordsEmptyState";
import { PortalRecordsModals } from "./table/PortalRecordsModals";
import { usePortalRecordsTableColumns } from "./table/PortalRecordsTableColumns";
import { usePortalRecordsTable } from "./hooks/usePortalRecordsTable";
import { usePortalRecordsActions } from "./hooks/usePortalRecordsActions";
import { PortalRecordsTableContent } from "./components/PortalRecordsTableContent";
import { PortalRecordsPagination } from "./components/PortalRecordsPagination";
import { TableSkeleton } from "@/components/ui/table-skeleton";

interface PortalRecordsTableProps {
   records: PortalRecord[];
   isLoading?: boolean;
   activeTab?: string;
 }

export function PortalRecordsTable({ records, isLoading = false, activeTab }: PortalRecordsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Calculate pagination values
  const totalRecords = records.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedRecords = records.slice(startIndex, endIndex);

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
  } = usePortalRecordsTable(paginatedRecords);

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
     onIgnoreRecord: handleIgnoreRecord,
     activeTab
   });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <div className="rounded-xl border overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
                {columns.map((column, index) => (
                  <TableHead key={index} className={`h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm bg-[#F6F7F9] ${column.className || ''}`}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            
            {isLoading ? (
              <TableSkeleton rows={6} columns={columns.length} showFooter />
            ) : (
              <>
                <PortalRecordsTableContent
                   isLoading={isLoading}
                   visibleRecords={visibleRecords}
                   isLoadingMore={isLoadingMore}
                   onViewDetails={handleViewDetails}
                   onMatchInvoice={handleMatchInvoice}
                   onResolveConflict={handleResolveConflict}
                   onIgnoreRecord={handleIgnoreRecord}
                   onRowClick={handleRowClick}
                   activeTab={activeTab}
                 />
                
                {!isLoading && <PortalRecordsTableFooter records={sortedRecords} />}
              </>
            )}
          </Table>
        </div>
      </div>

      <PortalRecordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
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
