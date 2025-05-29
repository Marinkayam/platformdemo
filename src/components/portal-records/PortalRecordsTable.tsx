
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PortalRecord } from "@/types/portalRecord";
import { formatCurrency } from "@/lib/utils";
import { UniversalStatusBadge } from "@/components/ui/universal-status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PortalRecordsTableProps {
  portalRecords: PortalRecord[];
}

export function PortalRecordsTable({ portalRecords }: PortalRecordsTableProps) {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Primary":
        return "bg-green-100 text-green-800 border-green-200";
      case "Alternate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Unmatched":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Conflict":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatInvoiceNumber = (invoiceNumber: string, type: string) => {
    if (type === "Unmatched") {
      return "-";
    }
    return `INV-${invoiceNumber.padStart(8, '0')}`;
  };

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 flex-1">
                Portal Record ID
              </TableHead>
              <TableHead className="flex-1">Portal</TableHead>
              <TableHead className="flex-1">Buyer</TableHead>
              <TableHead className="flex-1">Portal Status</TableHead>
              <TableHead className="flex-1">Invoice Number</TableHead>
              <TableHead className="flex-1">Type</TableHead>
              <TableHead className="flex-1">Total</TableHead>
              <TableHead className="flex-1">PO Number</TableHead>
              <TableHead className="flex-1">Supplier Name on Portal</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody className="divide-y divide-gray-100">
            {portalRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-sm text-gray-600 align-middle bg-white">
                  No portal records match your filters.
                </TableCell>
              </TableRow>
            ) : (
              portalRecords.map((record) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-gray-50 transition-colors bg-white"
                >
                  <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{record.id}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{record.portal}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.portal}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{record.buyer}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.buyer}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <UniversalStatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="font-medium">
                    {record.type === "Unmatched" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      formatInvoiceNumber(record.invoiceNumber, record.type)
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeBadgeColor(record.type)}`}>
                      {record.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(record.total, record.currency)}
                  </TableCell>
                  <TableCell className="truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{record.poNumber}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.poNumber}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{record.supplierName}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.supplierName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
