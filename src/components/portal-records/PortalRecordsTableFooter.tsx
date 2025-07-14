import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PortalRecord } from "@/types/portalRecord";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PortalRecordsTableFooterProps {
  records: PortalRecord[];
  currentPage: number;
  totalPages: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
}

export function PortalRecordsTableFooter({ records, currentPage, totalPages, recordsPerPage, onPageChange }: PortalRecordsTableFooterProps) {
  const totalRecords = records.length;
  
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

  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  return (
    <TableFooter>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9] rounded-b-xl">
        <TableCell colSpan={11} className="bg-[#F6F7F9] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Totals */}
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <span>Total:</span>
              <span className="font-bold text-gray-900 whitespace-nowrap">{formatTotalAmounts()}</span>
            </div>
            
            {/* Right side - Record count and Pagination */}
            <div className="flex items-center gap-6">
              {/* Record count */}
              <div className="text-sm text-muted-foreground">
                Showing {startRecord} to {endRecord} of {totalRecords} portal records
              </div>
              
              {/* Pagination */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 rounded-lg"
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">First page</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 rounded-lg"
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
                  className="h-8 w-8 p-0 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 rounded-lg"
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
