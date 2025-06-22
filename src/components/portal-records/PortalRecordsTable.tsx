import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableSystem } from "@/components/ui/TableSystem";
import { TableActions, commonActions } from "@/components/ui/table-actions";
import { ConnectionStatusBadge } from "./ConnectionStatusBadge";
import { PortalStatusBadge } from "./PortalStatusBadge";
import { MatchTypeBadge } from "./MatchTypeBadge";
import { PortalLogo } from "./PortalLogo";
import { PortalRecord } from "@/types/portalRecord";
import { PortalRecordsTableFooter } from "./PortalRecordsTableFooter";
import { EnhancedMatchInvoiceModal } from "./actions/EnhancedMatchInvoiceModal";
import { EnhancedResolveConflictModal } from "./actions/EnhancedResolveConflictModal";
import { IgnoreRecordModal } from "./actions/IgnoreRecordModal";
import { SyncRecordModal } from "./actions/SyncRecordModal";

interface PortalRecordsTableProps {
  records: PortalRecord[];
}

export function PortalRecordsTable({ records }: PortalRecordsTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  const handleMatchInvoice = (record: PortalRecord) => {
    setSelectedRecord(record);
    setMatchModalOpen(true);
  };

  const handleResolveConflict = (record: PortalRecord) => {
    setSelectedRecord(record);
    setConflictModalOpen(true);
  };

  const handleSyncRecord = (record: PortalRecord) => {
    setSelectedRecord(record);
    setSyncModalOpen(true);
  };

  const handleIgnoreRecord = (record: PortalRecord) => {
    setSelectedRecord(record);
    setIgnoreModalOpen(true);
  };

  const onInvoiceMatched = (invoiceId: string) => {
    console.log(`Matched invoice ${invoiceId} with record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onConflictResolved = (selectedRecordId: string, action: 'primary' | 'alternate') => {
    console.log(`Resolved conflict: ${selectedRecordId} set as ${action} for record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onRecordSynced = () => {
    console.log(`Synced record ${selectedRecord?.id}`);
    // TODO: Update record state in real implementation
  };

  const onRecordIgnored = () => {
    console.log(`Ignored record ${selectedRecord?.id}`);
    // TODO: Remove record from state in real implementation
  };

  const onMatchAndCreateRTP = (pdfFile: File) => {
    console.log(`Creating RTP for record ${selectedRecord?.id} with PDF:`, pdfFile.name);
    // TODO: Implement RTP creation logic
  };

  // Helper function to determine if a field should show data or "—"
  const getDisplayValue = (record: PortalRecord, field: keyof PortalRecord): string => {
    // Disconnected records show only portal name and record ID, everything else is "—"
    if (record.connectionStatus === 'Disconnected' && !['portal', 'portalRecordId'].includes(field)) {
      return "—";
    }

    const value = record[field] as string;
    
    // Return "—" if value is explicitly set to "—" or empty
    if (!value || value === "—") {
      return "—";
    }

    return value;
  };

  const formatCurrency = (amount: number, currency: string): string => {
    if (amount === 0) return "—";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const columns = [
    {
      key: "portalRecordId",
      label: "Portal Record ID",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <button
          onClick={() => handleViewDetails(record.id)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
        >
          {record.portalRecordId}
        </button>
      )
    },
    {
      key: "portal",
      label: "Portal",
      className: "w-[12%]",
      render: (record: PortalRecord) => (
        <PortalLogo portalName={record.portal} />
      )
    },
    {
      key: "buyer",
      label: "Buyer",
      className: "w-[12%]",
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
      key: "portalStatus",
      label: "Portal Status",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        if (record.connectionStatus === 'Disconnected') {
          return <span className="text-gray-400">—</span>;
        }
        return <PortalStatusBadge status={record.portalStatus} />;
      }
    },
    {
      key: "invoiceNumber",
      label: "Invoice #",
      className: "w-[10%]",
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
      key: "matchType",
      label: "Match Type",
      className: "w-[10%]",
      render: (record: PortalRecord) => {
        if (record.connectionStatus === 'Disconnected') {
          return <span className="text-gray-400">—</span>;
        }
        return <MatchTypeBadge type={record.matchType} />;
      }
    },
    {
      key: "total",
      label: "Total",
      className: "w-[10%] text-right",
      render: (record: PortalRecord) => {
        if (record.connectionStatus === 'Disconnected' || record.total === 0) {
          return <span className="text-gray-400">—</span>;
        }
        return (
          <span className="text-gray-600 font-medium">
            {formatCurrency(record.total, record.currency)}
          </span>
        );
      }
    },
    {
      key: "poNumber",
      label: "PO #",
      className: "w-[10%]",
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
      key: "supplierName",
      label: "Supplier Name",
      className: "w-[12%]",
      render: (record: PortalRecord) => {
        const value = getDisplayValue(record, 'supplierName');
        return (
          <span className={value === "—" ? "text-gray-400" : "text-gray-600"}>
            {value}
          </span>
        );
      }
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[7%] text-center",
      render: (record: PortalRecord) => {
        // Context-specific actions based on match type and connection status
        const actions = [
          commonActions.view(() => handleViewDetails(record.id))
        ];

        if (record.connectionStatus === 'Connected') {
          if (record.matchType === 'Unmatched') {
            actions.push({
              label: "Match Invoice",
              onClick: () => handleMatchInvoice(record),
              variant: "default" as const
            });
            actions.push({
              label: "Ignore Record",
              onClick: () => handleIgnoreRecord(record),
              variant: "destructive" as const
            });
          } else if (record.matchType === 'Conflict') {
            actions.push({
              label: "Resolve Conflict",
              onClick: () => handleResolveConflict(record),
              variant: "default" as const
            });
          }
          
          actions.push({
            label: "Sync Record",
            onClick: () => handleSyncRecord(record),
            variant: "default" as const
          });
        }

        return (
          <TableActions actions={actions} />
        );
      }
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
        records={records}
      />

      {/* Enhanced Action Modals */}
      {selectedRecord && (
        <>
          <EnhancedMatchInvoiceModal
            isOpen={matchModalOpen}
            onClose={() => setMatchModalOpen(false)}
            record={selectedRecord}
            onMatch={onInvoiceMatched}
            onIgnore={onRecordIgnored}
            onMatchAndCreateRTP={onMatchAndCreateRTP}
          />
          
          <EnhancedResolveConflictModal
            isOpen={conflictModalOpen}
            onClose={() => setConflictModalOpen(false)}
            record={selectedRecord}
            onResolve={onConflictResolved}
          />
          
          <IgnoreRecordModal
            isOpen={ignoreModalOpen}
            onClose={() => setIgnoreModalOpen(false)}
            record={selectedRecord}
            onIgnore={onRecordIgnored}
          />
          
          <SyncRecordModal
            isOpen={syncModalOpen}
            onClose={() => setSyncModalOpen(false)}
            record={selectedRecord}
            onSync={onRecordSynced}
          />
        </>
      )}
    </div>
  );
}
