
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

  const handleDelete = (recordId: string) => {
    console.log('Delete record:', recordId);
  };

  // Helper function to determine if a field should show data or "—"
  const getDisplayValue = (record: PortalRecord, field: string): string => {
    // Disconnected records show only portal name, everything else is "—"
    if (record.connectionStatus === 'Disconnected' && field !== 'portal') {
      return "—";
    }

    // Get the actual field value
    const value = record[field as keyof PortalRecord] as string;
    
    // Return "—" if value is explicitly set to "—" or empty
    if (!value || value === "—") {
      return "—";
    }

    return value;
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
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'invoiceNumber');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "poNumber",
      label: "PO #",
      className: "w-[12%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'poNumber');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "buyer",
      label: "Buyer",
      className: "w-[15%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'buyer');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "matchStatus",
      label: "Match Status",
      className: "w-[12%]",
      render: (record: PortalRecord) => {
        const status = getDisplayValue(record, 'matchStatus');
        return <MatchStatusBadge status={status} />;
      }
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
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'lastSynced');
        return <LastSyncedCell lastSynced={value} />;
      }
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[7%] text-center",
      render: (record: PortalRecord) => (
        <TableActions
          actions={[
            commonActions.view(() => handleView(record.id)),
            commonActions.delete(() => handleDelete(record.id))
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
