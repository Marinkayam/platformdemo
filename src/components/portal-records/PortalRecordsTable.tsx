
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConnectionStatusBadge } from "./ConnectionStatusBadge";
import { MatchStatusBadge } from "./MatchStatusBadge";
import { PortalLogo } from "./PortalLogo";
import { LastSyncedCell } from "./LastSyncedCell";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordsTableFooter } from "./PortalRecordsTableFooter";

interface PortalRecordsTableProps {
  records: PortalRecord[];
}

export function PortalRecordsTable({ records }: PortalRecordsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="w-[15%]">Portal</TableHead>
              <TableHead className="w-[12%]">Invoice #</TableHead>
              <TableHead className="w-[12%]">PO #</TableHead>
              <TableHead className="w-[15%]">Buyer</TableHead>
              <TableHead className="w-[12%]">Match Status</TableHead>
              <TableHead className="w-[12%]">Connection</TableHead>
              <TableHead className="w-[15%] text-right">Last Synced</TableHead>
              <TableHead className="w-[7%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-[200px] text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="text-gray-400 text-lg">📁</div>
                  <div>
                    <p className="text-gray-600 font-medium">No portal records found</p>
                    <p className="text-gray-400 text-sm">Records will appear here when portals are connected</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <PortalRecordsTableFooter 
          totalRecords={0}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="w-[15%]">Portal</TableHead>
              <TableHead className="w-[12%]">Invoice #</TableHead>
              <TableHead className="w-[12%]">PO #</TableHead>
              <TableHead className="w-[15%]">Buyer</TableHead>
              <TableHead className="w-[12%]">Match Status</TableHead>
              <TableHead className="w-[12%]">Connection</TableHead>
              <TableHead className="w-[15%] text-right">Last Synced</TableHead>
              <TableHead className="w-[7%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {currentRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50 transition-colors bg-white">
                <TableCell className="font-medium">
                  <PortalLogo portalName={record.portal} />
                </TableCell>
                <TableCell className="text-gray-600">
                  {record.invoiceNumber}
                </TableCell>
                <TableCell className="text-gray-600">
                  {record.poNumber}
                </TableCell>
                <TableCell className="text-gray-600">
                  {record.buyer}
                </TableCell>
                <TableCell>
                  <MatchStatusBadge status={record.matchStatus} />
                </TableCell>
                <TableCell>
                  <ConnectionStatusBadge status={record.connectionStatus} />
                </TableCell>
                <TableCell className="text-right">
                  <LastSyncedCell lastSynced={record.lastSynced} />
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Retry</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PortalRecordsTableFooter 
        totalRecords={records.length}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
