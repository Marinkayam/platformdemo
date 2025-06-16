
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConnectionStatusBadge } from "./ConnectionStatusBadge";
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
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 w-1/5">Company Name</TableHead>
              <TableHead className="w-1/5">Account Name</TableHead>
              <TableHead className="w-[15%]">Record Type</TableHead>
              <TableHead className="w-[15%]">Connection Status</TableHead>
              <TableHead className="w-[15%]">Last Sync</TableHead>
              <TableHead className="w-[10%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-[200px] text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="text-gray-400 text-lg">📁</div>
                  <div>
                    <p className="text-gray-600 font-medium">No portal records found</p>
                    <p className="text-gray-400 text-sm">Add a new record to get started</p>
                  </div>
                  <Button>Add a New Record</Button>
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
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 w-1/5">Company Name</TableHead>
              <TableHead className="w-1/5">Account Name</TableHead>
              <TableHead className="w-[15%]">Record Type</TableHead>
              <TableHead className="w-[15%]">Connection Status</TableHead>
              <TableHead className="w-[15%]">Last Sync</TableHead>
              <TableHead className="w-[10%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {currentRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50 transition-colors bg-white">
                <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-medium text-gray-900 w-1/5">
                  {record.companyName}
                </TableCell>
                <TableCell className="text-gray-600 w-1/5">{record.accountName}</TableCell>
                <TableCell className="text-gray-600 w-[15%]">{record.recordType}</TableCell>
                <TableCell className="w-[15%]">
                  <ConnectionStatusBadge status={record.connectionStatus} />
                </TableCell>
                <TableCell className="text-gray-600 w-[15%]">
                  {record.lastSyncDate}
                </TableCell>
                <TableCell className="text-right w-[10%]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Record</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
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
