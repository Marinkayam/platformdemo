import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { PortalRecord } from "@/types/portalRecord";
import { formatCurrency } from "@/lib/utils";
import { PortalRecordsPagination } from "./components/PortalRecordsPagination";

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

  return (
    <TableFooter>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9] rounded-b-xl">
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px] sticky left-0 z-10 border-r border-gray-200">
          <PortalRecordsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            onPageChange={onPageChange}
          />
        </TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="font-semibold text-gray-700 bg-[#F6F7F9] w-[200px] min-w-[200px]">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>Total:</span>
            <span className="font-bold text-gray-900 whitespace-nowrap">{formatTotalAmounts()}</span>
          </div>
        </TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
