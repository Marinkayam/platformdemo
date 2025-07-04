import React from "react";
import { PortalRecord } from "@/types/portalRecord";
import { usePortalRecordsTableColumns } from "../table/PortalRecordsTableColumns";
import { TableSkeleton } from "@/components/ui/table-skeleton";

interface PortalRecordsTableContentProps {
  isLoading: boolean;
  visibleRecords: PortalRecord[];
  isLoadingMore: boolean;
  onViewDetails: (recordId: string) => void;
  onMatchInvoice: (record: PortalRecord) => void;
  onResolveConflict: (record: PortalRecord) => void;
  onIgnoreRecord: (record: PortalRecord) => void;
  onRowClick: (record: PortalRecord) => void;
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
}: PortalRecordsTableContentProps) {
  const columns = usePortalRecordsTableColumns({
    onViewDetails,
    onMatchInvoice,
    onResolveConflict,
    onIgnoreRecord
  });

  if (isLoading) {
    return <TableSkeleton rows={6} columns={columns.length} showFooter />;
  }

  return (
    <tbody className="divide-y divide-gray-100">
      {visibleRecords.map((record, rowIndex) => (
        <tr
          key={record.id}
          className="h-[60px] hover:bg-gray-50 cursor-pointer transition-colors bg-white"
          onClick={() => onRowClick(record)}
        >
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className={`px-4 align-middle text-sm ${column.className || ''}`}
            >
              {column.render ? column.render(record) : record[column.key as keyof PortalRecord]}
            </td>
          ))}
        </tr>
      ))}
      
      {/* Loading skeleton rows */}
      {isLoadingMore && Array.from({ length: 3 }).map((_, index) => (
        <tr key={`loading-${index}`} className="h-[60px] animate-pulse">
          {columns.map((_, colIndex) => (
            <td key={colIndex} className="px-4">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}