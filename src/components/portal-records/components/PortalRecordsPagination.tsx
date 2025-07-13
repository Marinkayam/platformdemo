import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PortalRecord } from "@/types/portalRecord";
import { formatCurrency } from "@/lib/utils";

interface PortalRecordsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
  records: PortalRecord[];
}

export function PortalRecordsPagination({
  currentPage,
  totalPages,
  totalRecords,
  recordsPerPage,
  onPageChange,
  records,
}: PortalRecordsPaginationProps) {
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  // Calculate totals by currency
  const currencyTotals = records.reduce((acc, record) => {
    if (typeof record.total === 'number' && record.total > 0 && record.connectionStatus !== 'Disconnected') {
      const currency = record.currency || "USD";
      if (!acc[currency]) {
        acc[currency] = 0;
      }
      acc[currency] += record.total;
    }
    return acc;
  }, {} as Record<string, number>);

  // Format the total amounts display
  const formatTotalAmounts = () => {
    const entries = Object.entries(currencyTotals);
    if (entries.length === 0) return formatCurrency(0, "USD");
    
    return entries
      .map(([currency, amount]) => formatCurrency(amount, currency))
      .join(" + ");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startRecord} to {endRecord} of {totalRecords} portal records
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {formatTotalAmounts()}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">First page</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
}