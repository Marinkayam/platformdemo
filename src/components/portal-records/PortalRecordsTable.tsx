
import { useState } from "react";
import { TableSystem } from "@/components/ui/TableSystem";
import { TableActions, commonActions } from "@/components/ui/table-actions";
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

  const handleView = (recordId: string) => {
    console.log('View record:', recordId);
  };

  const handleRetry = (recordId: string) => {
    console.log('Retry record:', recordId);
  };

  const handleEdit = (recordId: string) => {
    console.log('Edit record:', recordId);
  };

  const handleRemove = (recordId: string) => {
    console.log('Remove record:', recordId);
  };

  const columns = [
    {
      key: "portal",
      label: "Portal",
      className: "w-[15%]",
      render: (record: PortalRecord) => (
        <PortalLogo portalName={record.portal} />
      )
    },
    {
      key: "invoiceNumber",
      label: "Invoice #",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <span className="text-gray-600">{record.invoiceNumber}</span>
      )
    },
    {
      key: "poNumber",
      label: "PO #",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <span className="text-gray-600">{record.poNumber}</span>
      )
    },
    {
      key: "buyer",
      label: "Buyer",
      className: "w-[15%]",
      render: (record: PortalRecord) => (
        <span className="text-gray-600">{record.buyer}</span>
      )
    },
    {
      key: "matchStatus",
      label: "Match Status",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <MatchStatusBadge status={record.matchStatus} />
      )
    },
    {
      key: "connectionStatus",
      label: "Connection",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <ConnectionStatusBadge status={record.connectionStatus} />
      )
    },
    {
      key: "lastSynced",
      label: "Last Synced",
      className: "w-[15%] text-right",
      render: (record: PortalRecord) => (
        <LastSyncedCell lastSynced={record.lastSynced} />
      )
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[7%] text-center",
      render: (record: PortalRecord) => (
        <TableActions
          actions={[
            commonActions.view(() => handleView(record.id)),
            {
              label: "Retry",
              onClick: () => handleRetry(record.id)
            },
            commonActions.edit(() => handleEdit(record.id)),
            {
              label: "Remove",
              onClick: () => handleRemove(record.id),
              variant: "destructive" as const
            }
          ]}
        />
      )
    }
  ];

  if (records.length === 0) {
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
          totalRecords={0}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <TableSystem 
        data={currentRecords}
        columns={columns}
      />
      <PortalRecordsTableFooter 
        totalRecords={records.length}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
