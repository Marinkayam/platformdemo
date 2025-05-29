
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PortalRecord } from "@/types/portalRecord";
import { formatCurrency } from "@/lib/utils";

interface PortalRecordsTableProps {
  portalRecords: PortalRecord[];
}

export function PortalRecordsTable({ portalRecords }: PortalRecordsTableProps) {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Primary":
        return "bg-green-100 text-green-800";
      case "Alternate":
        return "bg-blue-100 text-blue-800";
      case "Unmatched":
        return "bg-gray-100 text-gray-800";
      case "Conflict":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatInvoiceNumber = (invoiceNumber: string, type: string) => {
    if (type === "Unmatched") {
      return "-";
    }
    return `INV-${invoiceNumber.padStart(8, '0')}`;
  };

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto max-h-[600px]" style={{ overflow: 'auto' }}>
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-[#F6F7F9]">
              <TableHead className="text-sm font-medium text-gray-600 px-4 w-[140px]">
                Portal Record ID
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Portal
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Buyer
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Portal Status
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Invoice Number
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Type
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Total
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                PO Number
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-600 px-4">
                Supplier Name on Portal
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody className="divide-y">
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
                  <TableCell className="px-4 text-sm font-medium">
                    {record.id}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {record.portal}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {record.buyer}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-md text-sm font-medium ${getStatusBadgeColor(record.status)}`}>
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {record.type === "Unmatched" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      formatInvoiceNumber(record.invoiceNumber, record.type)
                    )}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-md text-sm font-medium ${getTypeBadgeColor(record.type)}`}>
                      {record.type}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {formatCurrency(record.total, record.currency)}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {record.poNumber}
                  </TableCell>
                  <TableCell className="px-4 text-sm">
                    {record.supplierName}
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
