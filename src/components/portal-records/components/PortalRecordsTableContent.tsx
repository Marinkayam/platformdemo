import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PortalRecord } from "@/types/portalRecord";
import { usePortalRecordsTableColumns } from "../table/PortalRecordsTableColumns";

interface PortalRecordsTableContentProps {
   isLoading: boolean;
   visibleRecords: PortalRecord[];
   isLoadingMore: boolean;
   onViewDetails: (recordId: string) => void;
   onMatchInvoice: (record: PortalRecord) => void;
   onResolveConflict: (record: PortalRecord) => void;
   onIgnoreRecord: (record: PortalRecord) => void;
   onRowClick: (record: PortalRecord) => void;
   activeTab?: string;
 }

export function PortalRecordsTableContent({
   isLoading,
   visibleRecords,
   isLoadingMore,
   onViewDetails,
   onMatchInvoice,
   onResolveConflict,
   onIgnoreRecord,
   onRowClick,
   activeTab,
 }: PortalRecordsTableContentProps) {
  const columns = usePortalRecordsTableColumns({
     onViewDetails,
     onMatchInvoice,
     onResolveConflict,
     onIgnoreRecord,
     activeTab
   });

  return (
    <TableBody className="divide-y divide-gray-100">
      {visibleRecords.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center text-sm text-gray-600 align-middle bg-white">
            No portal records found.
          </TableCell>
        </TableRow>
      ) : (
        visibleRecords.map((record, rowIndex) => (
          <TableRow
            key={record.id}
            className="h-[60px] hover:bg-gray-50 cursor-pointer transition-colors bg-white"
            onClick={(e) => {
              // Don't navigate if clicking on actions column or its children
              const target = e.target as HTMLElement;
              const isActionsClick = target.closest('[data-actions-column]') ||
                                   target.closest('button') ||
                                   target.closest('[role="menu"]');
              if (!isActionsClick) {
                onRowClick(record);
              }
            }}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={colIndex}
                className={`px-4 align-middle text-sm ${column.className || ''}`}
                data-actions-column={column.key === 'actions' ? true : undefined}
              >
                {column.render ? column.render(record) : record[column.key as keyof PortalRecord]}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
      
      {/* Loading skeleton rows */}
      {isLoadingMore && Array.from({ length: 3 }).map((_, index) => (
        <TableRow key={`loading-${index}`} className="h-[60px] animate-pulse">
          {columns.map((_, colIndex) => (
            <TableCell key={colIndex} className="px-4">
              <div className="h-4 bg-gray-200 rounded"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}