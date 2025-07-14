
import { TableSystem } from "@/components/ui/TableSystem";
import { PortalRecordsTableFooter } from "../PortalRecordsTableFooter";

interface PortalRecordsEmptyStateProps {
  columns: any[];
  currentPage: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
}

export function PortalRecordsEmptyState({
  columns,
  currentPage,
  recordsPerPage,
  onPageChange
}: PortalRecordsEmptyStateProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <TableSystem 
        data={[]}
        columns={columns}
      />
      <div className="h-[200px] flex flex-col items-center justify-center space-y-3">
        <div className="text-gray-400 text-lg">📁</div>
        <div>
          <p className="text-gray-600 font-medium">No portal records found</p>
          <p className="text-gray-400 text-sm">Records will appear here when portals are connected</p>
        </div>
      </div>
      <PortalRecordsTableFooter 
        records={[]}
        currentPage={currentPage}
        totalPages={1}
        recordsPerPage={recordsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
